import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Star, CheckCircle, Clock, UserPlus, DollarSign, ArrowRight, AlertCircle, Search, Send, Eye } from "lucide-react";

type ViewRole = "client" | "freelancer";

interface Project {
  id: string;
  title: string;
  client: { name: string; avatar: string };
  freelancer?: { name: string; avatar: string };
  status: "invitation_sent" | "invitation_received" | "active" | "payment" | "completed";
  budget: string;
  description: string;
  date: string;
  feedback?: { rating: number; comment: string };
}

const freelancerDirectory = [
  { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex", skill: "Full-Stack Developer", rating: 4.9 },
  { name: "Maria Santos", avatar: "https://i.pravatar.cc/150?u=maria", skill: "UI/UX Designer", rating: 4.8 },
  { name: "James Wilson", avatar: "https://i.pravatar.cc/150?u=james", skill: "Mobile Developer", rating: 4.7 },
  { name: "Sophie Martin", avatar: "https://i.pravatar.cc/150?u=sophie", skill: "Backend Engineer", rating: 4.9 },
];

const clientProjects: Project[] = [
  {
    id: "1", title: "SaaS Dashboard Development",
    client: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=currentuser" },
    freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
    status: "active", budget: "$12,000", description: "Building a modern analytics dashboard with React and TypeScript", date: "Started Jan 15",
  },
  {
    id: "2", title: "Mobile App Redesign",
    client: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=currentuser" },
    freelancer: { name: "Maria Santos", avatar: "https://i.pravatar.cc/150?u=maria" },
    status: "invitation_sent", budget: "$6,500", description: "Complete redesign of the fintech mobile application", date: "Invited Feb 20",
  },
  {
    id: "4", title: "E-Commerce Platform",
    client: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=currentuser" },
    freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
    status: "completed", budget: "$8,800", description: "Full-stack e-commerce with inventory management", date: "Completed Dec 2024",
    feedback: { rating: 5, comment: "Excellent work! Delivered on time with great quality." },
  },
];

const freelancerProjects: Project[] = [
  {
    id: "1", title: "SaaS Dashboard Development",
    client: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
    status: "active", budget: "$12,000", description: "Building a modern analytics dashboard", date: "Started Jan 15",
  },
  {
    id: "5", title: "API Integration",
    client: { name: "Emily Watts", avatar: "https://i.pravatar.cc/150?u=emily" },
    freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
    status: "invitation_received", budget: "$4,200", description: "Integrate third-party APIs", date: "Received Feb 22",
  },
  {
    id: "4", title: "E-Commerce Platform",
    client: { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?u=lisa" },
    freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
    status: "completed", budget: "$8,800", description: "Full-stack e-commerce with inventory management", date: "Completed Dec 2024",
    feedback: { rating: 5, comment: "Excellent work! Delivered on time with great quality." },
  },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  invitation_sent: { label: "Sent", icon: Send, color: "bg-accent/10 text-accent border-accent/30" },
  invitation_received: { label: "Received", icon: UserPlus, color: "bg-accent/10 text-accent border-accent/30" },
  active: { label: "In Progress", icon: Clock, color: "bg-primary/10 text-primary border-primary/30" },
  payment: { label: "Awaiting Payment", icon: DollarSign, color: "bg-destructive/10 text-destructive border-destructive/30" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-success/10 text-success border-success/30" },
};

function ProjectCard({ project, viewRole }: { project: Project; viewRole: ViewRole }) {
  const navigate = useNavigate();
  const config = statusConfig[project.status];
  const StatusIcon = config.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-base">{project.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
            </div>
            <Badge variant="outline" className={`${config.color} text-[10px] gap-1 shrink-0`}>
              <StatusIcon className="h-3 w-3" /> {config.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7"><AvatarImage src={project.client.avatar} /><AvatarFallback>{project.client.name[0]}</AvatarFallback></Avatar>
                <div><p className="text-[10px] text-muted-foreground">Client</p><p className="text-xs font-medium">{project.client.name}</p></div>
              </div>
              {project.freelancer && (
                <>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7"><AvatarImage src={project.freelancer.avatar} /><AvatarFallback>{project.freelancer.name[0]}</AvatarFallback></Avatar>
                    <div><p className="text-[10px] text-muted-foreground">Freelancer</p><p className="text-xs font-medium">{project.freelancer.name}</p></div>
                  </div>
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-heading font-bold">{project.budget}</p>
              <p className="text-[10px] text-muted-foreground">{project.date}</p>
            </div>
          </div>

          {/* Feedback for completed */}
          {project.status === "completed" && project.feedback && (
            <div className="mt-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < project.feedback!.rating ? "text-accent fill-accent" : "text-border"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{project.feedback.comment}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            {project.status === "invitation_received" && viewRole === "freelancer" && (
              <>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs">Accept</Button>
                <Button size="sm" variant="outline" className="text-xs">Decline</Button>
              </>
            )}
            {project.status === "active" && (
              <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => navigate(`/project/${project.id}?role=${viewRole}`)}>
                <Eye className="h-3.5 w-3.5" /> View Details
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MyWork() {
  const [viewRole, setViewRole] = useState<ViewRole>("client");
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<typeof freelancerDirectory[0] | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");

  const projects = viewRole === "client" ? clientProjects : freelancerProjects;

  const filteredFreelancers = freelancerDirectory.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const invitations = projects.filter(p =>
    viewRole === "client"
      ? (p.status === "invitation_sent" || p.status === "completed")
      : (p.status === "invitation_received" || p.status === "completed")
  );

  const clientInvitationsSent = projects.filter(p => p.status === "invitation_sent");
  const clientInvitationsAccepted = projects.filter(p => p.status === "active" || p.status === "completed");
  const freelancerInvitationsReceived = projects.filter(p => p.status === "invitation_received");
  const freelancerInvitationsAccepted = projects.filter(p => p.status === "active" || p.status === "completed");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold mb-1">My Work</h1>
            <p className="text-sm text-muted-foreground">Manage your projects and contracts</p>
          </div>
          {viewRole === "client" && (
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setInviteDialogOpen(true)}>
              <UserPlus className="h-4 w-4" /> Invite Freelancer
            </Button>
          )}
        </div>
      </motion.div>

      {/* Role Switch */}
      <div className="flex gap-2">
        <Button size="sm" variant={viewRole === "client" ? "default" : "outline"} className={viewRole === "client" ? "bg-primary text-primary-foreground" : ""} onClick={() => setViewRole("client")}>
          Client View
        </Button>
        <Button size="sm" variant={viewRole === "freelancer" ? "default" : "outline"} className={viewRole === "freelancer" ? "bg-accent text-accent-foreground" : ""} onClick={() => setViewRole("freelancer")}>
          Freelancer View
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active", value: String(projects.filter(p => p.status === "active").length), icon: Clock, accent: "text-primary" },
          { label: "Invitations", value: String(projects.filter(p => p.status === "invitation_sent" || p.status === "invitation_received").length), icon: UserPlus, accent: "text-accent" },
          { label: "Pending Pay", value: String(projects.filter(p => p.status === "payment").length), icon: AlertCircle, accent: "text-destructive" },
          { label: "Completed", value: String(projects.filter(p => p.status === "completed").length), icon: CheckCircle, accent: "text-success" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.accent}`} />
              <div><p className="font-heading text-xl font-bold">{stat.value}</p><p className="text-[11px] text-muted-foreground">{stat.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {projects.filter(p => p.status === "active").map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4 mt-4">
          {viewRole === "client" ? (
            <>
              {clientInvitationsSent.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Sent Invitations</h3>
                  <div className="space-y-3">{clientInvitationsSent.map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}</div>
                </div>
              )}
              {clientInvitationsAccepted.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Accepted</h3>
                  <div className="space-y-3">{clientInvitationsAccepted.map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}</div>
                </div>
              )}
            </>
          ) : (
            <>
              {freelancerInvitationsReceived.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Received Invitations</h3>
                  <div className="space-y-3">{freelancerInvitationsReceived.map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}</div>
                </div>
              )}
              {freelancerInvitationsAccepted.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Accepted</h3>
                  <div className="space-y-3">{freelancerInvitationsAccepted.map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}</div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-4">
          {projects.filter(p => p.status === "completed").map((p) => <ProjectCard key={p.id} project={p} viewRole={viewRole} />)}
        </TabsContent>
      </Tabs>

      {/* Invite Freelancer Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2"><UserPlus className="h-5 w-5 text-accent" />Invite Freelancer</DialogTitle>
            <DialogDescription>Search for a freelancer by name or skill</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search freelancers..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredFreelancers.map((f) => (
                <div
                  key={f.name}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${selectedFreelancer?.name === f.name ? "border-accent bg-accent/5" : "border-border hover:bg-muted/50"}`}
                  onClick={() => setSelectedFreelancer(f)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={f.avatar} /><AvatarFallback>{f.name[0]}</AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-muted-foreground">{f.skill}</p></div>
                  </div>
                  <Badge variant="outline" className="text-xs">⭐ {f.rating}</Badge>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" disabled={!selectedFreelancer} onClick={() => setInviteDialogOpen(false)}>
              <Send className="h-4 w-4" /> Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
