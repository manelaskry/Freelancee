import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Wallet as WalletIcon, TrendingUp, ArrowDownRight, ArrowUpRight, CreditCard, Clock } from "lucide-react";

const transactions = [
  { id: 1, type: "earning", description: "Logo Redesign — Payment received", amount: "+1,080 TND", date: "Jan 29, 2026" },
  { id: 2, type: "withdrawal", description: "Withdrawal to STB — **** 4521", amount: "-2,400 TND", date: "Jan 25, 2026" },
  { id: 3, type: "earning", description: "Content Writing — Payment received", amount: "+540 TND", date: "Jan 15, 2026" },
  { id: 4, type: "earning", description: "API Integration — Payment received", amount: "+3,780 TND", date: "Dec 20, 2025" },
  { id: 5, type: "withdrawal", description: "Withdrawal to STB — **** 4521", amount: "-3,200 TND", date: "Dec 15, 2025" },
];

export default function Wallet() {
  const [withdrawDialog, setWithdrawDialog] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-heading text-2xl font-bold mb-1">My Wallet</h1>
        <p className="text-sm text-muted-foreground">Track your earnings and withdrawals</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10"><WalletIcon className="h-5 w-5 text-primary" /></div>
              <p className="text-xs text-muted-foreground">Available Balance</p>
            </div>
            <p className="font-heading text-2xl font-bold text-primary">2,800 TND</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-success/10"><TrendingUp className="h-5 w-5 text-success" /></div>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </div>
            <p className="font-heading text-2xl font-bold text-success">18,200 TND</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10"><Clock className="h-5 w-5 text-accent" /></div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <p className="font-heading text-2xl font-bold text-accent">4,500 TND</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setWithdrawDialog(true)}>
          <CreditCard className="h-4 w-4" /> Request Withdrawal
        </Button>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Transaction History</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className={`p-2 rounded-lg ${t.type === "earning" ? "bg-success/10" : "bg-destructive/10"}`}>
                {t.type === "earning" ? <ArrowDownRight className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
              <p className={`text-sm font-heading font-bold ${t.type === "earning" ? "text-success" : "text-destructive"}`}>{t.amount}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Withdrawal Dialog */}
      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Request Withdrawal</DialogTitle>
            <DialogDescription>Enter your bank details and amount</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-xs">Amount (TND)</Label><Input type="number" placeholder="0.00" className="mt-1" /></div>
            <div><Label className="text-xs">Bank Name</Label><Input placeholder="e.g., STB, BIAT, BNA" className="mt-1" /></div>
            <div><Label className="text-xs">IBAN</Label><Input placeholder="TN59 XXXX XXXX XXXX XXXX XX" className="mt-1" /></div>
            <div><Label className="text-xs">SWIFT/BIC</Label><Input placeholder="e.g., STBKTNTT" className="mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialog(false)}>Cancel</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setWithdrawDialog(false)}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
