import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye } from "lucide-react";
import { useState } from "react";

const invoices = [
  { id: "INV-2026-001", project: "Mobile App Design", client: "Sara Ben Ali", amount: "4,500 TND", commission: "450 TND", status: "paid", date: "Feb 15, 2026" },
  { id: "INV-2026-002", project: "E-commerce Website", client: "Mohamed T.", amount: "8,000 TND", commission: "800 TND", status: "paid", date: "Feb 10, 2026" },
  { id: "INV-2026-003", project: "Logo Redesign", client: "Sara Ben Ali", amount: "1,200 TND", commission: "120 TND", status: "refunded", date: "Jan 20, 2026" },
  { id: "INV-2026-004", project: "SEO Optimization", client: "Mohamed T.", amount: "2,000 TND", commission: "200 TND", status: "pending", date: "Feb 8, 2026" },
];

const statusStyles: Record<string, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-accent/10 text-accent-foreground",
  refunded: "bg-destructive/10 text-destructive",
};

export default function AdminInvoices() {
  const [search, setSearch] = useState("");
  const filtered = invoices.filter((i) => i.id.toLowerCase().includes(search.toLowerCase()) || i.project.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Invoice Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{invoices.length} invoices</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-sm font-medium text-primary">{inv.id}</TableCell>
                  <TableCell className="text-sm">{inv.project}</TableCell>
                  <TableCell className="text-sm">{inv.client}</TableCell>
                  <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                  <TableCell className="text-sm text-accent font-medium">{inv.commission}</TableCell>
                  <TableCell><Badge className={`text-[10px] capitalize ${statusStyles[inv.status]}`}>{inv.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
