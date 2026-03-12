import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload, FileUp, X, Send } from "lucide-react";

interface SubmitWorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function SubmitWorkDialog({ open, onOpenChange, onSubmit }: SubmitWorkDialogProps) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  const addFile = () => {
    const fakeNames = ["design_final_v3.zip", "documentation.pdf", "screenshots.zip", "source_code.zip"];
    const next = fakeNames[files.length % fakeNames.length];
    setFiles((prev) => [...prev, next]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Send className="h-5 w-5 text-accent" />
            Submit Work for Approval
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Upload Files</Label>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
              onClick={addFile}
            >
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload files</p>
              <p className="text-xs text-muted-foreground mt-1">ZIP, PDF, Images (Max 50MB)</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FileUp className="h-4 w-4 text-accent" />
                    <span className="text-sm">{file}</span>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message to Client</Label>
            <Textarea
              id="message"
              placeholder="Describe the work you've completed..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
            onClick={onSubmit}
            disabled={!message || files.length === 0}
          >
            <Send className="h-4 w-4" />
            Submit Work
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
