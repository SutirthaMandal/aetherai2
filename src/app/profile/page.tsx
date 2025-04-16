'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Home, MessageSquare, User, ImagePlus, Settings} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

interface IdeaPost {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
}

const userPosts: IdeaPost[] = [
  {
    id: '3',
    author: 'You',
    content: 'AI-driven personal assistant for household chores: Imagine an AI that manages and optimizes household tasks, making life easier by automating everything from meal planning to cleaning schedules, all tailored to your preferences and lifestyle.',
    imageUrl: 'https://picsum.photos/id/3/512/256',
  },
  {
    id: '4',
    author: 'You',
    content: 'AI-powered fitness coaching: Developing an AI that creates personalized workout plans and provides real-time feedback to help users achieve their fitness goals, adapting to their progress and ensuring optimal results through data-driven insights.',
    imageUrl: 'https://picsum.photos/id/4/512/256',
  },
];

const ProfilePage = () => {
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
                  <span>Messages</span>
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
              <CardTitle>Uttiya</CardTitle>
              <CardDescription>My Profile</CardDescription>
            </CardHeader>
            <CardContent>
            <Avatar className="mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              <div>
                {userPosts.map(post => (
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
                      <p className="text-sm mt-2">Sutirtha commented: Wow!</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </>
  );
};

export default ProfilePage;
