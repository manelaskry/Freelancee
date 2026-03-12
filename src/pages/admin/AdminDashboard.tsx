import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, CreditCard, Scale, TrendingUp, Wallet, Clock, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,247", icon: Users, change: "+12%", color: "text-primary" },
  { label: "Active Projects", value: "89", icon: Briefcase, change: "+5%", color: "text-accent" },
  { label: "Completed Projects", value: "342", icon: CheckCircle2, change: "+18%", color: "text-success" },
  { label: "Money Processed", value: "245,800 TND", icon: CreditCard, change: "+22%", color: "text-primary" },
  { label: "Commission Earned", value: "24,580 TND", icon: TrendingUp, change: "+22%", color: "text-accent" },
  { label: "Pending Withdrawals", value: "12,400 TND", icon: Wallet, change: "8 requests", color: "text-muted-foreground" },
  { label: "Open Disputes", value: "3", icon: Scale, change: "urgent", color: "text-destructive" },
  { label: "Escrow Balance", value: "67,200 TND", icon: Clock, change: "23 projects", color: "text-primary" },
];

const recentActivity = [
  { action: "New dispute opened", detail: "Project #1042 — Client vs. Ahmed K.", time: "12 min ago", type: "dispute" },
  { action: "Withdrawal approved", detail: "Sami B. — 2,400 TND", time: "1h ago", type: "payment" },
  { action: "Project completed", detail: "E-commerce redesign — 4,500 TND", time: "2h ago", type: "project" },
  { action: "New user registered", detail: "Freelancer — Yasmine M.", time: "3h ago", type: "user" },
  { action: "Payment received", detail: "Client deposit — 8,000 TND into escrow", time: "4h ago", type: "payment" },
  { action: "Dispute resolved", detail: "Project #1038 — Partial refund 50%", time: "5h ago", type: "dispute" },
];

const typeColors: Record<string, string> = {
  dispute: "bg-destructive/10 text-destructive",
  payment: "bg-accent/10 text-accent-foreground",
  project: "bg-success/10 text-success",
  user: "bg-primary/10 text-primary",
};

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className={`text-2xl font-heading font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Badge className={`text-[10px] shrink-0 ${typeColors[a.type]}`}>{a.type}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "This Month", amount: "4,200 TND", projects: 14 },
              { label: "Last Month", amount: "3,800 TND", projects: 12 },
              { label: "2 Months Ago", amount: "3,100 TND", projects: 9 },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.projects} completed projects</p>
                </div>
                <p className="font-heading font-bold text-accent">{r.amount}</p>
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-foreground">Total (3 months)</span>
                <span className="font-heading font-bold text-primary">11,100 TND</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
