import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

const monthlyRevenue = [
  { month: "Oct 2025", revenue: "2,800 TND", projects: 8 },
  { month: "Nov 2025", revenue: "3,100 TND", projects: 9 },
  { month: "Dec 2025", revenue: "3,500 TND", projects: 11 },
  { month: "Jan 2026", revenue: "3,800 TND", projects: 12 },
  { month: "Feb 2026", revenue: "4,200 TND", projects: 14 },
];

const topFreelancers = [
  { name: "Ahmed Khaled", projects: 12, earned: "18,200 TND", rating: 4.9 },
  { name: "Yasmine Mrad", projects: 5, earned: "6,400 TND", rating: 4.7 },
  { name: "Ines Gharbi", projects: 3, earned: "2,100 TND", rating: 4.5 },
];

const topClients = [
  { name: "Sara Ben Ali", projects: 8, spent: "14,200 TND" },
  { name: "Mohamed Trabelsi", projects: 3, spent: "10,000 TND" },
];

export default function AdminAnalytics() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-accent" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Platform performance insights</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg flex items-center gap-2"><TrendingUp className="h-4 w-4" />Monthly Revenue</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20">{m.month}</span>
                <div className="flex-1 bg-secondary rounded-full h-6 overflow-hidden">
                  <div className="bg-accent h-full rounded-full flex items-center px-3" style={{ width: `${(parseInt(m.revenue.replace(/,/g, "")) / 5000) * 100}%` }}>
                    <span className="text-[10px] font-bold text-accent-foreground">{m.revenue}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{m.projects} projects</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="font-heading text-lg flex items-center gap-2"><Star className="h-4 w-4" />Top Freelancers</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topFreelancers.map((f, i) => (
              <div key={f.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <span className="text-lg font-heading font-bold text-accent w-6">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.projects} projects · ⭐ {f.rating}</p>
                </div>
                <span className="font-heading font-bold text-sm">{f.earned}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-heading text-lg flex items-center gap-2"><Users className="h-4 w-4" />Top Clients</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topClients.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <span className="text-lg font-heading font-bold text-primary w-6">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.projects} projects</p>
                </div>
                <span className="font-heading font-bold text-sm">{c.spent}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
