import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const projects = [
  {
    id: 1042, title: "Mobile App Design", client: "Sara Ben Ali", freelancer: "Ahmed Khaled",
    budget: "4,500 TND", escrow: "4,500 TND", status: "disputed", created: "Feb 15, 2026",
    timeline: [
      { date: "Feb 15", event: "Project created" },
      { date: "Feb 15", event: "Client paid 4,500 TND into escrow" },
      { date: "Feb 16", event: "Freelancer accepted project" },
      { date: "Feb 18", event: "Freelancer submitted work" },
      { date: "Feb 19", event: "Client opened dispute" },
    ],
  },
  {
    id: 1041, title: "E-commerce Website", client: "Mohamed T.", freelancer: "Yasmine Mrad",
    budget: "8,000 TND", escrow: "8,000 TND", status: "active", created: "Feb 10, 2026",
    timeline: [
      { date: "Feb 10", event: "Project created" },
      { date: "Feb 10", event: "Client paid 8,000 TND into escrow" },
      { date: "Feb 11", event: "Freelancer accepted project" },
    ],
  },
  {
    id: 1040, title: "Logo Redesign", client: "Sara Ben Ali", freelancer: "Ahmed Khaled",
    budget: "1,200 TND", escrow: "0 TND", status: "completed", created: "Jan 20, 2026",
    timeline: [
      { date: "Jan 20", event: "Project created" },
      { date: "Jan 20", event: "Client paid 1,200 TND into escrow" },
      { date: "Jan 21", event: "Freelancer accepted project" },
      { date: "Jan 28", event: "Freelancer submitted work" },
      { date: "Jan 29", event: "Client approved — 1,080 TND released to freelancer" },
    ],
  },
  {
    id: 1039, title: "SEO Optimization", client: "Mohamed T.", freelancer: "Ines Gharbi",
    budget: "2,000 TND", escrow: "2,000 TND", status: "waiting_approval", created: "Feb 8, 2026",
    timeline: [
      { date: "Feb 8", event: "Project created" },
      { date: "Feb 8", event: "Client paid 2,000 TND into escrow" },
      { date: "Feb 9", event: "Freelancer accepted project" },
      { date: "Feb 14", event: "Freelancer submitted work" },
    ],
  },
  {
    id: 1038, title: "Content Writing", client: "Sara Ben Ali", freelancer: "Yasmine Mrad",
    budget: "600 TND", escrow: "0 TND", status: "cancelled", created: "Jan 5, 2026",
    timeline: [
      { date: "Jan 5", event: "Project created" },
      { date: "Jan 7", event: "Project cancelled by client" },
    ],
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  completed: "bg-primary/10 text-primary",
  disputed: "bg-destructive/10 text-destructive",
  waiting_approval: "bg-accent/10 text-accent-foreground",
  cancelled: "bg-muted text-muted-foreground",
};

export default function AdminProjects() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Project Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{projects.length} total projects</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        {["all", "active", "waiting_approval", "completed", "disputed", "cancelled"].map((s) => (
          <Badge key={s} variant="outline" className="cursor-pointer capitalize text-xs px-3 py-1 hover:bg-secondary">{s.replace("_", " ")}</Badge>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Escrow</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs text-muted-foreground">#{p.id}</TableCell>
                  <TableCell className="font-medium text-sm">{p.title}</TableCell>
                  <TableCell className="text-sm">{p.client}</TableCell>
                  <TableCell className="text-sm">{p.freelancer}</TableCell>
                  <TableCell className="text-sm font-medium">{p.budget}</TableCell>
                  <TableCell className="text-sm">{p.escrow}</TableCell>
                  <TableCell><Badge className={`text-[10px] capitalize ${statusStyles[p.status]}`}>{p.status.replace("_", " ")}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelected(p)}><Eye className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Project #{selected?.id}</DialogTitle>
            <DialogDescription>{selected?.title}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Client</p><p className="text-sm font-medium">{selected.client}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Freelancer</p><p className="text-sm font-medium">{selected.freelancer}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Budget</p><p className="font-heading font-bold">{selected.budget}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Escrow</p><p className="font-heading font-bold">{selected.escrow}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Status</p><Badge className={`text-[10px] capitalize ${statusStyles[selected.status]}`}>{selected.status.replace("_", " ")}</Badge></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Created</p><p className="text-sm font-medium">{selected.created}</p></div>
              </div>

              {/* Activity Timeline */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Activity Timeline</p>
                <div className="relative pl-6 space-y-3">
                  <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
                  {selected.timeline.map((t, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      <div className="absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
                      <div>
                        <p className="text-sm text-foreground">{t.event}</p>
                        <p className="text-[10px] text-muted-foreground">{t.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-1.5"><CreditCard className="h-3.5 w-3.5" />Release Payment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
