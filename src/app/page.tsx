'use client';

import React, {useState, useEffect} from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader, // Import SidebarHeader
} from '@/components/ui/sidebar';
import {Home, MessageSquare, User, ImagePlus, Settings} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import Link from 'next/link';
import {generateAiImage} from '@/ai/flows/generate-ai-image';

interface IdeaPost {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
}

interface Message {
  sender: string;
  content: string;
}

export default function HomePage() {
  const [idea, setIdea] = useState('');
  const [posts, setPosts] = useState<IdeaPost[]>([
    {
      id: '1',
      author: 'Debjoy',
      content: 'AI-powered personalized education: Imagine an AI that adapts to each student learning style and pace, providing customized lessons and feedback, ensuring every learner reaches their full potential. This system would dynamically adjust the curriculum based on real-time performance and comprehension, offering tailored support and challenges.',
      imageUrl: 'https://picsum.photos/id/1/512/256',
    },
    {
      id: '2',
      author: 'Sutirtha',
      content: 'AI-driven healthcare diagnostics: Developing an AI that can analyze medical images and patient data to detect diseases at an early stage with high accuracy, transforming preventative care. This AI could sift through complex datasets, identifying subtle patterns that human doctors might miss, leading to earlier interventions and improved patient outcomes.',
      imageUrl: 'https://picsum.photos/id/2/512/256',
    },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'Saptarshi',
      content: 'Hey! Just wanted to connect and discuss some AI ideas.',
    },
  ]);
  const [userPosts, setUserPosts] = useState<IdeaPost[]>([]);
  const {toast} = useToast();

  const handleShareIdea = async () => {
    if (!idea.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter your AI idea.',
      });
      return;
    }

    try {
      const aiImageResult = await generateAiImage({postContent: idea});

      const newPost: IdeaPost = {
        id: Date.now().toString(),
        author: 'You',
        content: idea,
        imageUrl: aiImageResult.imageUrl,
      };

      setUserPosts(prevPosts => [newPost, ...prevPosts]);
      setPosts(prevPosts => [newPost, ...prevPosts]); // Add to main posts as well
      setIdea('');

      toast({
        title: 'Success',
        description: 'Your AI idea has been shared!',
      });
    } catch (error: any) {
      console.error('Error sharing idea:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to share AI idea.',
      });
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h2 className="font-semibold text-lg">AetherAI</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/messages" className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages ({messages.length})</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/profile" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="justify-start">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    <span>Generate AI Image</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="md:hidden p-4">
          <SidebarTrigger />
        </div>
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Share your AI Idea</CardTitle>
              <CardDescription>Write your idea and share it with the world.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Textarea
                  placeholder="Write your AI idea here."
                  value={idea}
                  onChange={e => setIdea(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleShareIdea}>Post</Button>
            </CardFooter>
          </Card>
          <div className="mt-4">
            {posts.map(post => (
              <Card key={post.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{post.author}</CardTitle>
                  <CardDescription>Shared just now</CardDescription>
                </CardHeader>
                <CardContent>
                  {post.imageUrl && (
                    <div className="mb-4">
                      <img src={post.imageUrl} alt="AI Generated Image" className="rounded-md" />
                    </div>
                  )}
                  <p>{post.content}</p>
                  {post.author === 'You' && <p className="text-sm mt-2">Sutirtha commented: Wow!</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
