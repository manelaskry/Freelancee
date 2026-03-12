import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const loginHistory = [
  { user: "Ahmed Khaled", ip: "197.15.xx.xx", location: "Tunis, TN", device: "Chrome / macOS", time: "Feb 18, 15:30", suspicious: false },
  { user: "Unknown", ip: "185.220.xx.xx", location: "Unknown VPN", device: "Tor Browser", time: "Feb 18, 03:12", suspicious: true },
  { user: "Sara Ben Ali", ip: "41.230.xx.xx", location: "Sousse, TN", device: "Safari / iOS", time: "Feb 17, 20:45", suspicious: false },
  { user: "Ines Gharbi", ip: "102.156.xx.xx", location: "Lagos, NG", device: "Firefox / Windows", time: "Feb 17, 14:00", suspicious: true },
];

const reportedAccounts = [
  { user: "Ines Gharbi", reason: "Submitted plagiarized work", reports: 3, status: "under review" },
  { user: "Unknown User", reason: "Spam messages to multiple freelancers", reports: 5, status: "banned" },
];

export default function AdminSecurity() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Security Controls</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor login activity and reported accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Login History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Flag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((l, i) => (
                <TableRow key={i} className={l.suspicious ? "bg-destructive/5" : ""}>
                  <TableCell className="text-sm font-medium">{l.user}</TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">{l.ip}</TableCell>
                  <TableCell className="text-sm">{l.location}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.device}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.time}</TableCell>
                  <TableCell>{l.suspicious && <Badge className="bg-destructive/10 text-destructive text-[10px] gap-1"><AlertTriangle className="h-2.5 w-2.5" />Suspicious</Badge>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Reported Accounts</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportedAccounts.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm font-medium">{r.user}</TableCell>
                  <TableCell className="text-sm">{r.reason}</TableCell>
                  <TableCell className="text-sm font-medium text-destructive">{r.reports}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px] capitalize">{r.status}</Badge></TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
