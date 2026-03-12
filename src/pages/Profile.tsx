import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Calendar, ExternalLink, Mail, Briefcase, Award, Github, FileText, Image as ImageIcon } from "lucide-react";

const skills = ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "GraphQL", "AWS", "Docker"];

const portfolio = [
  { title: "E-Commerce Dashboard", desc: "Full-stack admin panel for online retail", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" },
  { title: "FinTech Mobile App", desc: "Banking app UI with real-time charts", img: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=250&fit=crop" },
  { title: "Social Platform", desc: "Community platform with messaging", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop" },
];

const reviews = [
  { name: "Sarah Chen", rating: 5, text: "Excellent work! Delivered ahead of schedule with great quality.", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { name: "Mark Thompson", rating: 5, text: "Very professional and communicative. Would hire again.", avatar: "https://i.pravatar.cc/150?u=mark" },
  { name: "Lisa Park", rating: 4, text: "Great developer, solid understanding of modern web tech.", avatar: "https://i.pravatar.cc/150?u=lisa" },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="feed-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row gap-5 items-start">
          <Avatar className="h-24 w-24 ring-4 ring-accent/20">
            <AvatarImage src="https://i.pravatar.cc/150?u=alex" />
            <AvatarFallback className="text-xl">AR</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="font-heading text-2xl font-bold">Alex Rivera</h1>
              <Badge className="bg-accent text-accent-foreground text-[10px]">Freelancer</Badge>
              <Badge variant="outline" className="border-success text-success text-[10px] gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" /> Available
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Full Stack Developer</p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> New York, US</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> 47 Projects</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3 text-accent fill-accent" /> 4.9 (32 reviews)</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined 2022</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              Passionate full-stack developer with 5+ years of experience building scalable web applications.
              I specialize in React, TypeScript, and Node.js ecosystems.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate("/messages")}>
                <Mail className="h-4 w-4 mr-2" /> Send Message
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5"><MapPin className="h-3.5 w-3.5" /> Location</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Github className="h-3.5 w-3.5" /> GitHub</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><ImageIcon className="h-3.5 w-3.5" /> Photos</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><FileText className="h-3.5 w-3.5" /> Resume</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><ExternalLink className="h-3.5 w-3.5" /> Portfolio</Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" /> Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="profile-badge bg-secondary text-secondary-foreground">{skill}</span>
          ))}
        </div>
      </motion.div>

      {/* Portfolio */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-heading text-lg font-semibold mb-3">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {portfolio.map((item) => (
            <Card key={item.title} className="overflow-hidden group cursor-pointer border-border hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Reviews */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="font-heading text-lg font-semibold mb-3">Reviews</h2>
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.name} className="feed-card">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-8 w-8"><AvatarImage src={review.avatar} /><AvatarFallback>{review.name[0]}</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-accent fill-accent" : "text-border"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
