import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FileText, CheckCircle } from "lucide-react";

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  projectTitle: string;
  freelancerName: string;
}

export function InvoiceDialog({ open, onOpenChange, onSubmit, projectTitle, freelancerName }: InvoiceDialogProps) {
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const commission = budget ? (parseFloat(budget) * 0.1).toFixed(2) : "0.00";
  const freelancerAmount = budget ? (parseFloat(budget) * 0.9).toFixed(2) : "0.00";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Create Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Project</span>
              <span className="font-medium">{projectTitle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Freelancer</span>
              <span className="font-medium">{freelancerName}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (TND)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g. 1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Work Description</Label>
            <Input
              id="description"
              placeholder="Describe the scope of work..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {budget && parseFloat(budget) > 0 && (
            <>
              <Separator />
              <div className="rounded-lg border border-border bg-card p-4 space-y-2">
                <h4 className="font-heading text-sm font-semibold">Payment Breakdown</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">{parseFloat(budget).toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee (10%)</span>
                  <span className="text-destructive font-medium">-{commission} TND</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Freelancer Receives</span>
                  <span className="text-success">{freelancerAmount} TND</span>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
            onClick={onSubmit}
            disabled={!budget || !description || !deadline}
          >
            <CheckCircle className="h-4 w-4" />
            Create Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
