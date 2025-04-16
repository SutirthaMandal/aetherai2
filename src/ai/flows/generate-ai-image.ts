'use server';
/**
 * @fileOverview An AI image generator based on post content.
 *
 * - generateAiImage - A function that generates an AI image based on post content.
 * - GenerateAiImageInput - The input type for the generateAiImage function.
 * - GenerateAiImageOutput - The return type for the generateAiImage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateAiImageInputSchema = z.object({
  postContent: z.string().describe('The text content of the post.'),
});
export type GenerateAiImageInput = z.infer<typeof GenerateAiImageInputSchema>;

const GenerateAiImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated AI image, if generated.'),
  shouldGenerateImage: z.boolean().describe('Whether the image should be generated or not.'),
});
export type GenerateAiImageOutput = z.infer<typeof GenerateAiImageOutputSchema>;

export async function generateAiImage(input: GenerateAiImageInput): Promise<GenerateAiImageOutput> {
  return generateAiImageFlow(input);
}

const shouldGenerateImageTool = ai.defineTool({
    name: 'shouldGenerateImage',
    description: 'Determines if an image should be generated based on the post content. It checks for descriptive keywords and suitability for image generation.',
    inputSchema: z.object({
      postContent: z.string().describe('The content of the post.'),
    }),
    outputSchema: z.boolean().describe('Whether an image should be generated or not.'),
  },
  async input => {
    const keywords = ['scene', 'landscape', 'portrait', 'object', 'view', 'illustration', 'drawing'];
    const lowerCaseContent = input.postContent.toLowerCase();
    const hasDescriptiveKeyword = keywords.some(keyword => lowerCaseContent.includes(keyword));

    // Check if the content is not overly abstract or potentially sensitive.
    const isAppropriate = !lowerCaseContent.includes('abstract') && !lowerCaseContent.includes('sensitive');

    return hasDescriptiveKeyword && isAppropriate;
  }
);

const generateImagePrompt = ai.definePrompt({
  name: 'generateImagePrompt',
  tools: [shouldGenerateImageTool],
  input: {
    schema: z.object({
      postContent: z.string().describe('The text content of the post.'),
    }),
  },
  output: {
    schema: z.object({
        url: z.string().describe('A URL to an image that represents the content.'),
    }),
  },
  prompt: `Based on the post content, generate a URL for an image that represents the content. If the shouldGenerateImage tool returns false, return null. The URL should point to a visually appealing image that captures the essence of the idea.\n\nPost Content: {{{postContent}}}`,
});

const generateAiImageFlow = ai.defineFlow<
  typeof GenerateAiImageInputSchema,
  typeof GenerateAiImageOutputSchema
>(
  {
    name: 'generateAiImageFlow',
    inputSchema: GenerateAiImageInputSchema,
    outputSchema: GenerateAiImageOutputSchema,
  },
  async input => {
    const shouldGenerate = await shouldGenerateImageTool(input);

    if (!shouldGenerate) {
      return {
        imageUrl: '',
        shouldGenerateImage: false,
      };
    }

    const {output} = await generateImagePrompt(input);

    return {
      imageUrl: output?.url ?? 'https://picsum.photos/512/256',
      shouldGenerateImage: true,
    };
  }
);
