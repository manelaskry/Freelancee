import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle2, XCircle, CreditCard, Wallet, TrendingUp, Clock, DollarSign } from "lucide-react";

const completedPayments = [
  { id: "PAY-003", project: "Logo Redesign", to: "Ahmed Khaled", amount: "1,080 TND", commission: "120 TND", date: "Jan 29, 2026" },
  { id: "PAY-005", project: "Content Writing", to: "Yasmine Mrad", amount: "540 TND", commission: "60 TND", date: "Jan 15, 2026" },
];

const withdrawals = [
  { id: "WD-001", user: "Ahmed Khaled", amount: "2,400 TND", bank: "STB — **** 4521", iban: "TN59 1000 1234 5678 9012 34", status: "pending", requested: "Feb 18, 2026" },
  { id: "WD-002", user: "Yasmine Mrad", amount: "1,800 TND", bank: "BIAT — **** 7832", iban: "TN59 2000 9876 5432 1098 76", status: "pending", requested: "Feb 17, 2026" },
  { id: "WD-003", user: "Ahmed Khaled", amount: "3,200 TND", bank: "STB — **** 4521", iban: "TN59 1000 1234 5678 9012 34", status: "approved", requested: "Feb 10, 2026" },
];

const escrowFunds = [
  { id: "ESC-001", project: "Mobile App Design", client: "Sara Ben Ali", freelancer: "Ahmed Khaled", amount: "4,500 TND", status: "disputed", date: "Feb 15, 2026" },
  { id: "ESC-002", project: "E-commerce Website", client: "Mohamed T.", freelancer: "Yasmine Mrad", amount: "8,000 TND", status: "active", date: "Feb 10, 2026" },
  { id: "ESC-003", project: "SEO Optimization", client: "Mohamed T.", freelancer: "Ines Gharbi", amount: "2,000 TND", status: "waiting_approval", date: "Feb 8, 2026" },
];

const wdStatusStyles: Record<string, string> = {
  pending: "bg-accent/10 text-accent-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

const escrowStatusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  disputed: "bg-destructive/10 text-destructive",
  waiting_approval: "bg-accent/10 text-accent-foreground",
};

const pendingWithdrawalsCount = withdrawals.filter(w => w.status === "pending").length;

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [paymentDialog, setPaymentDialog] = useState<typeof withdrawals[0] | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Payments & Commissions</h1>
        <p className="text-sm text-muted-foreground mt-1">Track all financial activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Processed", value: "245,800 TND", icon: CreditCard },
          { label: "Commission Earned", value: "24,580 TND", icon: TrendingUp },
          { label: "In Escrow", value: "14,500 TND", icon: Clock },
          { label: "Pending Withdrawals", value: "4,200 TND", icon: Wallet },
          { label: "Pending Requests", value: String(pendingWithdrawalsCount), icon: DollarSign },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary"><s.icon className="h-4 w-4 text-muted-foreground" /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="font-heading font-bold text-lg">{s.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="withdrawals" className="gap-1.5">
            Withdrawals
            {pendingWithdrawalsCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-[9px] h-4 min-w-[16px] px-1">{pendingWithdrawalsCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Paid To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPayments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-xs text-muted-foreground">{p.id}</TableCell>
                      <TableCell className="text-sm font-medium">{p.project}</TableCell>
                      <TableCell className="text-sm">{p.to}</TableCell>
                      <TableCell className="text-sm font-medium">{p.amount}</TableCell>
                      <TableCell className="text-sm text-accent font-medium">{p.commission}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
          <Card>
            <CardContent className="p-0 pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell className="text-xs text-muted-foreground">{w.id}</TableCell>
                      <TableCell className="text-sm font-medium">{w.user}</TableCell>
                      <TableCell className="text-sm font-medium">{w.amount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{w.bank}</TableCell>
                      <TableCell><Badge className={`text-[10px] capitalize ${wdStatusStyles[w.status]}`}>{w.status}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{w.requested}</TableCell>
                      <TableCell className="text-right">
                        {w.status === "pending" && (
                          <div className="flex justify-end gap-1">
                            <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => setPaymentDialog(w)}>
                              <CreditCard className="h-3 w-3" />Proceed to Payment
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-destructive"><XCircle className="h-3 w-3" />Reject</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escrow">
          <Card>
            <CardContent className="p-0 pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Freelancer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escrowFunds.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="text-xs text-muted-foreground">{e.id}</TableCell>
                      <TableCell className="text-sm font-medium">{e.project}</TableCell>
                      <TableCell className="text-sm">{e.client}</TableCell>
                      <TableCell className="text-sm">{e.freelancer}</TableCell>
                      <TableCell className="text-sm font-medium">{e.amount}</TableCell>
                      <TableCell><Badge className={`text-[10px] capitalize ${escrowStatusStyles[e.status]}`}>{e.status.replace("_", " ")}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{e.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={!!paymentDialog} onOpenChange={() => setPaymentDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Process Payment</DialogTitle>
            <DialogDescription>Confirm withdrawal payment to freelancer</DialogDescription>
          </DialogHeader>
          {paymentDialog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Freelancer</p><p className="text-sm font-medium">{paymentDialog.user}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Amount</p><p className="font-heading font-bold">{paymentDialog.amount}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50 col-span-2"><p className="text-xs text-muted-foreground">Bank</p><p className="text-sm font-medium">{paymentDialog.bank}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50 col-span-2"><p className="text-xs text-muted-foreground">IBAN</p><p className="text-sm font-mono">{paymentDialog.iban}</p></div>
              </div>
              <div>
                <Label className="text-xs">Transaction Reference</Label>
                <Input placeholder="Enter bank reference number..." className="mt-1" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialog(null)}>Cancel</Button>
            <Button className="bg-success text-success-foreground hover:bg-success/90 gap-1.5" onClick={() => setPaymentDialog(null)}>
              <CheckCircle2 className="h-4 w-4" /> Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
