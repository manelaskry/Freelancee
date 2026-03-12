import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Scale, CheckCircle2, RotateCcw, Split, Eye, FileText, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const disputes = [
  {
    id: "DSP-001", project: "Mobile App Design (#1042)", client: "Sara Ben Ali", freelancer: "Ahmed Khaled",
    amount: "4,500 TND", reason: "Work quality does not match requirements. Missing 3 screens from the agreed scope.",
    status: "open", opened: "Feb 18, 2026",
    files: ["design-v3-final.zip", "original-scope.pdf", "chat-screenshot.png"],
  },
  {
    id: "DSP-002", project: "Content Writing (#1035)", client: "Mohamed T.", freelancer: "Yasmine Mrad",
    amount: "600 TND", reason: "Client has not responded for 12 days after work submission.",
    status: "open", opened: "Feb 14, 2026",
    files: ["articles-batch-1.zip"],
  },
  {
    id: "DSP-003", project: "Logo Redesign (#1038)", client: "Sara Ben Ali", freelancer: "Ines Gharbi",
    amount: "1,200 TND", reason: "Resolved — partial refund agreed.",
    status: "resolved", opened: "Feb 5, 2026",
    files: [],
  },
];

const statusStyles: Record<string, string> = {
  open: "bg-destructive/10 text-destructive",
  resolved: "bg-success/10 text-success",
  reviewing: "bg-accent/10 text-accent-foreground",
};

export default function AdminDisputes() {
  const [selected, setSelected] = useState<typeof disputes[0] | null>(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <Scale className="h-6 w-6 text-destructive" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Dispute Center</h1>
          <p className="text-sm text-muted-foreground mt-1">{disputes.filter(d => d.status === "open").length} open disputes</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="text-xs text-muted-foreground">{d.id}</TableCell>
                  <TableCell className="text-sm font-medium">{d.project}</TableCell>
                  <TableCell className="text-sm">{d.client}</TableCell>
                  <TableCell className="text-sm">{d.freelancer}</TableCell>
                  <TableCell className="text-sm font-medium">{d.amount}</TableCell>
                  <TableCell><Badge className={`text-[10px] capitalize ${statusStyles[d.status]}`}>{d.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.opened}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelected(d)}><Eye className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <Scale className="h-5 w-5 text-destructive" />Dispute {selected?.id}
            </DialogTitle>
            <DialogDescription>{selected?.project}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Client</p><p className="text-sm font-medium">{selected.client}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Freelancer</p><p className="text-sm font-medium">{selected.freelancer}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Disputed Amount</p><p className="font-heading font-bold text-destructive">{selected.amount}</p></div>
                <div className="p-3 rounded-lg bg-secondary/50"><p className="text-xs text-muted-foreground">Status</p><Badge className={`text-[10px] capitalize ${statusStyles[selected.status]}`}>{selected.status}</Badge></div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Reason</p>
                <p className="text-sm text-foreground bg-secondary/50 p-3 rounded-lg">{selected.reason}</p>
              </div>

              {/* View Conversation Button */}
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => { setSelected(null); navigate("/admin/messages"); }}
              >
                <MessageSquare className="h-4 w-4" />
                View Their Conversation
              </Button>

              {selected.files.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><FileText className="h-3 w-3" />Submitted Files</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.files.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs px-3 py-1.5 gap-1.5 cursor-pointer hover:bg-secondary"><FileText className="h-3 w-3" />{f}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selected.status === "open" && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Admin Decision</p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground"><CheckCircle2 className="h-3.5 w-3.5" />Pay Freelancer (Full)</Button>
                      <Button size="sm" variant="outline" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" />Refund Client (Full)</Button>
                      <Button size="sm" variant="secondary" className="gap-1.5"><Split className="h-3.5 w-3.5" />Split Payment (50/50)</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
