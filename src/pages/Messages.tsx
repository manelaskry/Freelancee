import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Paperclip, Image, Link2 } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", lastMessage: "Sounds great! Let's set up a call.", time: "2m", unread: 2, online: true },
  { id: "2", name: "Emily Watts", avatar: "https://i.pravatar.cc/150?u=emily", lastMessage: "Can you share your portfolio?", time: "1h", unread: 0, online: true },
  { id: "3", name: "Jordan Lee", avatar: "https://i.pravatar.cc/150?u=jordan", lastMessage: "Thanks for the update!", time: "3h", unread: 0, online: false },
  { id: "4", name: "Mia Johnson", avatar: "https://i.pravatar.cc/150?u=mia", lastMessage: "I'll review the proposal today.", time: "1d", unread: 0, online: false },
];

const messages: Message[] = [
  { id: "1", sender: "them", text: "Hi Alex! I saw your comment on my post about the React developer position.", time: "10:30 AM" },
  { id: "2", sender: "me", text: "Hey Sarah! Yes, I'm very interested. I have 5+ years of experience with React and TypeScript.", time: "10:32 AM" },
  { id: "3", sender: "them", text: "That's great! Can you tell me more about your experience with data visualization?", time: "10:35 AM" },
  { id: "4", sender: "me", text: "Absolutely! I've worked with Recharts and D3.js on several dashboard projects. I can share my portfolio if you'd like.", time: "10:38 AM" },
  { id: "5", sender: "them", text: "Sounds great! Let's set up a call.", time: "10:40 AM" },
];

export default function Messages() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Conversation List */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-heading text-lg font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9 text-sm h-9" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo)}
              className={`w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors text-left ${selectedConvo.id === convo.id ? "bg-secondary" : ""}`}
            >
              <div className="relative">
                <Avatar className="h-10 w-10"><AvatarImage src={convo.avatar} /><AvatarFallback>{convo.name[0]}</AvatarFallback></Avatar>
                {convo.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold truncate">{convo.name}</p>
                  <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="h-5 min-w-[20px] rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center px-1.5">{convo.unread}</span>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-border flex items-center gap-3 px-4 bg-card">
          <Avatar className="h-9 w-9"><AvatarImage src={selectedConvo.avatar} /><AvatarFallback>{selectedConvo.name[0]}</AvatarFallback></Avatar>
          <div>
            <p className="text-sm font-semibold">{selectedConvo.name}</p>
            <p className="text-[11px] text-muted-foreground">{selectedConvo.online ? "Online" : "Offline"}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.sender === "me" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Input with attachments */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground"><Paperclip className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground"><Image className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground"><Link2 className="h-4 w-4" /></Button>
            </div>
            <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1" />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-10 w-10 p-0"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
