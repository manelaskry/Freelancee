import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CheckCircle, RotateCcw, AlertTriangle, FileUp, Download } from "lucide-react";

type Action = "approve" | "revision" | "dispute" | null;

interface ApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onRequestRevision: () => void;
  onDispute: () => void;
  freelancerName: string;
  amount: string;
  submittedFiles?: string[];
  submittedMessage?: string;
}

export function ApprovalDialog({
  open, onOpenChange, onApprove, onRequestRevision, onDispute,
  freelancerName, amount, submittedFiles = [], submittedMessage = ""
}: ApprovalDialogProps) {
  const [action, setAction] = useState<Action>(null);
  const [reason, setReason] = useState("");

  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const commission = numericAmount * 0.1;
  const freelancerPay = numericAmount * 0.9;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Review Submitted Work</DialogTitle>
          <DialogDescription>Review the work submitted by {freelancerName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Submitted files */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Submitted Files</Label>
            {submittedFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                <div className="flex items-center gap-2">
                  <FileUp className="h-4 w-4 text-accent" />
                  <span className="text-sm">{file}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>

          {submittedMessage && (
            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <Label className="text-xs text-muted-foreground">Freelancer's Message</Label>
              <p className="text-sm mt-1">{submittedMessage}</p>
            </div>
          )}

          <Separator />

          {/* Payment breakdown */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <h4 className="font-heading text-sm font-semibold">Payment Release</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Escrow Amount</span>
              <span>{numericAmount.toFixed(2)} TND</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Commission (10%)</span>
              <span className="text-destructive">-{commission.toFixed(2)} TND</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm font-semibold">
              <span>Freelancer Receives</span>
              <span className="text-success">{freelancerPay.toFixed(2)} TND</span>
            </div>
          </div>

          {/* Action buttons */}
          {!action && (
            <div className="grid grid-cols-3 gap-2">
              <Button
                className="bg-success text-success-foreground hover:bg-success/90 gap-1.5 text-xs"
                onClick={() => setAction("approve")}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>
              <Button
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => setAction("revision")}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Request Changes
              </Button>
              <Button
                variant="outline"
                className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5 text-xs"
                onClick={() => setAction("dispute")}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Dispute
              </Button>
            </div>
          )}

          {action && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>
                  {action === "approve" ? "Confirmation Note (optional)" :
                   action === "revision" ? "What changes are needed?" :
                   "Describe the dispute reason"}
                </Label>
                <Textarea
                  placeholder={
                    action === "approve" ? "Great work! Everything looks perfect." :
                    action === "revision" ? "Please fix..." :
                    "Explain the issue..."
                  }
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {action ? (
            <>
              <Button variant="outline" onClick={() => setAction(null)}>Back</Button>
              <Button
                className={
                  action === "approve" ? "bg-success text-success-foreground hover:bg-success/90" :
                  action === "dispute" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" :
                  "bg-accent text-accent-foreground hover:bg-accent/90"
                }
                onClick={() => {
                  if (action === "approve") onApprove();
                  else if (action === "revision") onRequestRevision();
                  else onDispute();
                }}
              >
                {action === "approve" ? "Confirm & Release Payment" :
                 action === "revision" ? "Send Revision Request" :
                 "Open Dispute"}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
