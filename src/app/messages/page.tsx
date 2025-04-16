'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
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

interface Message {
  sender: string;
  content: string;
}

const messages: Message[] = [
  {
    sender: 'Saptarshi',
    content: 'Hey! Just wanted to connect and discuss some AI ideas.',
  },
  {
    sender: 'Subrah',
    content: 'Hey! Have you checked out the latest AI research paper?',
  },
  {
    sender: 'Sarthaki',
    content: 'Hey! What are your thoughts on AI ethics?',
  },
];

const MessagesPage = () => {
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
                <a href="/" className="justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/messages" className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages ({messages.length})</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/profile" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
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
              <CardTitle>Messages</CardTitle>
              <CardDescription>Your conversations</CardDescription>
            </CardHeader>
            <CardContent>
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </>
  );
};

export default MessagesPage;
