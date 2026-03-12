import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, Trash2 } from "lucide-react";

const myPosts = [
  {
    id: "1", content: "Available for new projects! Specialized in React, Node.js, and PostgreSQL.", category: "Freelancing",
    timeAgo: "5h ago", likes: 18, comments: 3,
  },
  {
    id: "2", content: "Just completed a fintech dashboard project. Check out my updated portfolio!", category: "Portfolio & Resume Help",
    timeAgo: "2d ago", likes: 42, comments: 7,
  },
];

const savedPosts = [
  {
    id: "3", author: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    content: "Looking for a senior React developer to help build our new SaaS dashboard.", category: "Job Search",
    timeAgo: "2h ago", likes: 24, comments: 2,
  },
  {
    id: "4", author: { name: "Emily Watts", avatar: "https://i.pravatar.cc/150?u=emily" },
    content: "We need a UI/UX designer to redesign our mobile app.", category: "Job Search",
    timeAgo: "8h ago", likes: 31, comments: 1,
  },
];

export default function Posts() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-heading text-2xl font-bold mb-1">My Posts</h1>
        <p className="text-sm text-muted-foreground">Manage your posts and saved content</p>
      </motion.div>

      <Tabs defaultValue="my-posts">
        <TabsList>
          <TabsTrigger value="my-posts">My Posts ({myPosts.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved Posts ({savedPosts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my-posts" className="space-y-4 mt-4">
          {myPosts.map((post) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-muted-foreground">{post.timeAgo}</span>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{post.content}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-4">
          {savedPosts.map((post) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{post.author.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-muted-foreground">{post.timeAgo}</span>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-accent"><Bookmark className="h-3.5 w-3.5 fill-current" /></Button>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] mt-0.5">{post.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{post.content}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
