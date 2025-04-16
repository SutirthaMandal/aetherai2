'use server';
/**
 * @fileOverview Decides whether an image should be generated based on the textual content of a post.
 *
 * - decideIfImageShouldBeGenerated - A function that determines if an image should be generated.
 * - DecideIfImageShouldBeGeneratedInput - The input type for the decideIfImageShouldBeGenerated function.
 * - DecideIfImageShouldBeGeneratedOutput - The return type for the decideIfImageShouldBeGenerated function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DecideIfImageShouldBeGeneratedInputSchema = z.object({
  postContent: z.string().describe('The textual content of the post.'),
});
export type DecideIfImageShouldBeGeneratedInput = z.infer<
  typeof DecideIfImageShouldBeGeneratedInputSchema
>;

const DecideIfImageShouldBeGeneratedOutputSchema = z.object({
  shouldGenerateImage: z
    .boolean()
    .describe(
      'Whether or not an image should be generated based on the post content.'
    ),
  reason: z
    .string()
    .describe(
      'The reasoning behind the decision to generate or not generate an image.'
    ),
});
export type DecideIfImageShouldBeGeneratedOutput = z.infer<
  typeof DecideIfImageShouldBeGeneratedOutputSchema
>;

export async function decideIfImageShouldBeGenerated(
  input: DecideIfImageShouldBeGeneratedInput
): Promise<DecideIfImageShouldBeGeneratedOutput> {
  return decideIfImageShouldBeGeneratedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'decideIfImageShouldBeGeneratedPrompt',
  input: {
    schema: z.object({
      postContent: z.string().describe('The textual content of the post.'),
    }),
  },
  output: {
    schema: z.object({
      shouldGenerateImage:
        z.boolean().describe('Whether or not an image should be generated.'),
      reason: z.string().describe('The reasoning behind the decision.'),
    }),
  },
  prompt: `You are an AI assistant that decides whether an image should be generated based on the content of a post.\n\nAnalyze the following post content and determine if generating an image is appropriate. Consider factors such as the presence of descriptive elements, the likelihood of generating a meaningful image, and the overall suitability for image generation.\n\nPost Content: {{{postContent}}}\n\nBased on your analysis, set the 'shouldGenerateImage' field to true if an image should be generated, and false otherwise. Provide a brief explanation for your decision in the 'reason' field. For example, if the post describes a scene or object, set 'shouldGenerateImage' to true. If the post is abstract or contains sensitive content, set it to false.\n\nOutput:
`,
});

const decideIfImageShouldBeGeneratedFlow = ai.defineFlow<
  typeof DecideIfImageShouldBeGeneratedInputSchema,
  typeof DecideIfImageShouldBeGeneratedOutputSchema
>(
  {
    name: 'decideIfImageShouldBeGeneratedFlow',
    inputSchema: DecideIfImageShouldBeGeneratedInputSchema,
    outputSchema: DecideIfImageShouldBeGeneratedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
