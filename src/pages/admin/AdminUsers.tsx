import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Ban, Eye, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const users = [
  { id: 1, name: "Ahmed Khaled", email: "ahmed@mail.com", avatar: "https://i.pravatar.cc/40?u=ahmed", projects: 12, earned: "18,200 TND", status: "active", joined: "Jan 2025" },
  { id: 2, name: "Sara Ben Ali", email: "sara@mail.com", avatar: "https://i.pravatar.cc/40?u=sara", projects: 8, earned: "—", status: "active", joined: "Mar 2025" },
  { id: 3, name: "Yasmine Mrad", email: "yasmine@mail.com", avatar: "https://i.pravatar.cc/40?u=yasmine", projects: 5, earned: "6,400 TND", status: "active", joined: "Jun 2025" },
  { id: 4, name: "Mohamed Trabelsi", email: "mohamed@mail.com", avatar: "https://i.pravatar.cc/40?u=moha", projects: 3, earned: "—", status: "suspended", joined: "Feb 2025" },
  { id: 5, name: "Ines Gharbi", email: "ines@mail.com", avatar: "https://i.pravatar.cc/40?u=ines", projects: 0, earned: "0 TND", status: "banned", joined: "Sep 2025" },
];

const userProjects = [
  { title: "Mobile App Design", earning: "4,500 TND", status: "completed", date: "Feb 15, 2026", role: "Freelancer" },
  { title: "E-commerce Website", earning: "8,000 TND", status: "active", date: "Feb 10, 2026", role: "Client" },
  { title: "Logo Redesign", earning: "1,200 TND", status: "completed", date: "Jan 20, 2026", role: "Freelancer" },
  { title: "SEO Optimization", earning: "2,000 TND", status: "disputed", date: "Feb 8, 2026", role: "Client" },
];

const projectStatusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success",
  active: "bg-primary/10 text-primary",
  disputed: "bg-destructive/10 text-destructive",
};

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-accent/10 text-accent-foreground",
  banned: "bg-destructive/10 text-destructive",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const navigate = useNavigate();
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{users.length} registered users</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback className="text-xs bg-secondary">{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p
                          className="text-sm font-medium cursor-pointer hover:text-primary hover:underline transition-colors"
                          onClick={() => navigate("/profile")}
                        >
                          {u.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{u.projects}</TableCell>
                  <TableCell className="text-sm font-medium">{u.earned}</TableCell>
                  <TableCell><Badge className={`text-[10px] ${statusStyles[u.status]}`}>{u.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelectedUser(u)}><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive"><Ban className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">User Details</DialogTitle>
            <DialogDescription>Projects and activity overview</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-secondary text-lg">{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p
                    className="font-heading font-bold text-lg cursor-pointer hover:text-primary hover:underline"
                    onClick={() => { setSelectedUser(null); navigate("/profile"); }}
                  >
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <Badge className={`text-[10px] mt-1 ${statusStyles[selectedUser.status]}`}>{selectedUser.status}</Badge>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Projects</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Earning</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userProjects.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm font-medium">{p.title}</TableCell>
                        <TableCell className="text-sm">{p.earning}</TableCell>
                        <TableCell><Badge className={`text-[10px] capitalize ${projectStatusStyles[p.status] || "bg-muted text-muted-foreground"}`}>{p.status}</Badge></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{p.role}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />Verify Identity</Button>
                <Button variant="destructive" size="sm" className="gap-1.5"><Ban className="h-3.5 w-3.5" />{selectedUser.status === "banned" ? "Unban" : "Ban"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
