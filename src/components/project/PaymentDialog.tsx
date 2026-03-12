import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CreditCard, Shield, Lock, CheckCircle } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  amount: string;
  projectTitle: string;
}

export function PaymentDialog({ open, onOpenChange, onSubmit, amount, projectTitle }: PaymentDialogProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-accent" />
            Escrow Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center space-y-1">
            <p className="text-xs text-muted-foreground">Amount to Deposit in Escrow</p>
            <p className="font-heading text-3xl font-bold">{numericAmount.toFixed(2)} TND</p>
            <p className="text-xs text-muted-foreground">{projectTitle}</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-success/10 border border-success/30 p-3">
            <Shield className="h-4 w-4 text-success shrink-0" />
            <p className="text-xs text-success">
              Your money is held securely in escrow. It will only be released to the freelancer after you approve the work.
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <div className="relative">
                <Input
                  id="card"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Escrow Deposit</span>
              <span>{numericAmount.toFixed(2)} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing Fee</span>
              <span>0.00 TND</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{numericAmount.toFixed(2)} TND</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
            onClick={onSubmit}
            disabled={!cardNumber || !expiry || !cvc}
          >
            <Lock className="h-4 w-4" />
            Deposit to Escrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
