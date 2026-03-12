import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Heart, MessageCircle, Share2, Bookmark, Send, Briefcase, Search as SearchIcon, MapPin, DollarSign, Paperclip, Image, Link2, BarChart3 } from "lucide-react";

interface Post {
  id: string;
  author: { name: string; avatar: string; role: "client" | "freelancer"; title: string };
  content: string;
  type: "hiring" | "looking";
  category: string;
  tags: string[];
  budget?: string;
  location?: string;
  timeAgo: string;
  likes: number;
  comments: { author: string; avatar: string; text: string }[];
}

const categories = ["Career Advice", "Job Search", "Freelancing", "Portfolio & Resume Help"];

const mockPosts: Post[] = [
  {
    id: "1",
    author: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", role: "client", title: "CEO at TechStart" },
    content: "Looking for a senior React developer to help build our new SaaS dashboard. Must have experience with TypeScript, Tailwind CSS, and data visualization. 3-month contract with possibility of extension.",
    type: "hiring", category: "Job Search",
    tags: ["React", "TypeScript", "Tailwind"], budget: "$80-120/hr", location: "Remote", timeAgo: "2h ago", likes: 24,
    comments: [
      { author: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex", text: "Interested! I have 5+ years of React experience. Check my profile." },
      { author: "Mia Johnson", avatar: "https://i.pravatar.cc/150?u=mia", text: "This sounds great! I'd love to discuss further." },
    ],
  },
  {
    id: "2",
    author: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex", role: "freelancer", title: "Full Stack Developer" },
    content: "Available for new projects! Specialized in building modern web applications with React, Node.js, and PostgreSQL. Open to full-time contracts or part-time collaborations.",
    type: "looking", category: "Freelancing",
    tags: ["React", "Node.js", "PostgreSQL"], location: "New York, US", timeAgo: "5h ago", likes: 18, comments: [],
  },
  {
    id: "3",
    author: { name: "Emily Watts", avatar: "https://i.pravatar.cc/150?u=emily", role: "client", title: "Product Manager" },
    content: "We need a UI/UX designer to redesign our mobile app. Looking for someone with strong portfolio in fintech. Fixed price project.",
    type: "hiring", category: "Job Search",
    tags: ["UI/UX", "Mobile", "Fintech"], budget: "$5,000 - $8,000", location: "Remote", timeAgo: "8h ago", likes: 31,
    comments: [{ author: "Jordan Lee", avatar: "https://i.pravatar.cc/150?u=jordan", text: "I've designed 3 fintech apps. Would love to chat!" }],
  },
];

function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="feed-card">
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="h-11 w-11 ring-2 ring-border">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-heading font-semibold text-sm cursor-pointer hover:text-primary hover:underline transition-colors"
              onClick={() => navigate("/profile")}
            >
              {post.author.name}
            </span>
            <Badge
              variant={post.author.role === "client" ? "default" : "secondary"}
              className={post.author.role === "client" ? "bg-primary text-primary-foreground text-[10px]" : "bg-accent text-accent-foreground text-[10px]"}
            >
              {post.author.role === "client" ? "Client" : "Freelancer"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{post.author.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[11px] text-muted-foreground/60">{post.timeAgo}</p>
            <Badge variant="outline" className="text-[9px] px-1.5 py-0">{post.category}</Badge>
          </div>
        </div>
        <Badge
          variant="outline"
          className={post.type === "hiring" ? "border-accent text-accent text-[10px] gap-1" : "border-success text-success text-[10px] gap-1"}
        >
          {post.type === "hiring" ? <Briefcase className="h-3 w-3" /> : <SearchIcon className="h-3 w-3" />}
          {post.type === "hiring" ? "Hiring" : "Looking for Work"}
        </Badge>
      </div>

      <p className="text-sm leading-relaxed mb-3">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span key={tag} className="profile-badge bg-secondary text-secondary-foreground">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        {post.budget && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {post.budget}</span>}
        {post.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {post.location}</span>}
      </div>

      <div className="flex items-center gap-1 border-t border-border pt-3">
        <Button variant="ghost" size="sm" className={`gap-1.5 text-xs ${liked ? "text-destructive" : "text-muted-foreground"}`} onClick={() => setLiked(!liked)}>
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} /> {post.likes + (liked ? 1 : 0)}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" onClick={() => setShowComments(!showComments)}>
          <MessageCircle className="h-4 w-4" /> {post.comments.length}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground"><Share2 className="h-4 w-4" /></Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className={`text-xs ${saved ? "text-accent" : "text-muted-foreground"}`} onClick={() => setSaved(!saved)}>
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </Button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-3 space-y-3 border-t border-border pt-3">
              {post.comments.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <Avatar className="h-7 w-7"><AvatarImage src={c.avatar} /><AvatarFallback>{c.author[0]}</AvatarFallback></Avatar>
                  <div className="flex-1 bg-secondary rounded-lg p-2.5">
                    <p className="text-xs font-semibold">{c.author}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 items-end">
                <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="min-h-[36px] text-xs resize-none" rows={1} />
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 w-9 p-0"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Feed() {
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState<"hiring" | "looking">("hiring");
  const [postCategory, setPostCategory] = useState("");
  const [showRules, setShowRules] = useState(false);

  const handlePost = () => {
    if (!postContent.trim()) return;
    setShowRules(true);
  };

  const confirmPost = () => {
    setShowRules(false);
    setPostContent("");
    setPostCategory("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-heading text-2xl font-bold mb-1">Feed</h1>
        <p className="text-sm text-muted-foreground">Discover opportunities and talent</p>
      </motion.div>

      {/* Create Post */}
      <div className="feed-card">
        <div className="flex gap-2 mb-3 flex-wrap">
          <Button size="sm" variant={postType === "hiring" ? "default" : "outline"} className={postType === "hiring" ? "bg-primary text-primary-foreground text-xs" : "text-xs"} onClick={() => setPostType("hiring")}>
            <Briefcase className="h-3.5 w-3.5 mr-1.5" /> I'm Hiring
          </Button>
          <Button size="sm" variant={postType === "looking" ? "default" : "outline"} className={postType === "looking" ? "bg-accent text-accent-foreground text-xs" : "text-xs"} onClick={() => setPostType("looking")}>
            <SearchIcon className="h-3.5 w-3.5 mr-1.5" /> Looking for Work
          </Button>
          <Select value={postCategory} onValueChange={setPostCategory}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-xs">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder={postType === "hiring" ? "Describe the role you're looking to fill..." : "Tell clients about your skills and availability..."}
          className="min-h-[80px] text-sm resize-none mb-3"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"><Paperclip className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"><Image className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"><Link2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"><BarChart3 className="h-4 w-4" /></Button>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handlePost}>
            <Send className="h-4 w-4 mr-2" /> Post
          </Button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {mockPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      {/* Rules Dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Community Guidelines</DialogTitle>
            <DialogDescription>Please review before posting</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-accent font-bold">1.</span><p>Keep all communication and payments on the platform.</p></div>
            <div className="flex items-start gap-2"><span className="text-accent font-bold">2.</span><p>Do not share personal contact information (phone, WhatsApp, email).</p></div>
            <div className="flex items-start gap-2"><span className="text-accent font-bold">3.</span><p>Be respectful and professional in all interactions.</p></div>
            <div className="flex items-start gap-2"><span className="text-accent font-bold">4.</span><p>Do not post misleading or false information about your skills or projects.</p></div>
            <div className="flex items-start gap-2"><span className="text-accent font-bold">5.</span><p>Spam, duplicate posts, or irrelevant content will be removed.</p></div>
            <div className="flex items-start gap-2"><span className="text-accent font-bold">6.</span><p>Violating these rules may result in account suspension or ban.</p></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRules(false)}>Cancel</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={confirmPost}>I Agree & Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
