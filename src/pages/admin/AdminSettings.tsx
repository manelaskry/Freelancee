import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-muted-foreground" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure platform-wide parameters</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Commission & Fees</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Commission Rate (%)</Label>
            <Input type="number" defaultValue="10" className="max-w-[200px]" />
            <p className="text-xs text-muted-foreground">Percentage deducted from each completed project</p>
          </div>
          <div className="space-y-2">
            <Label>Minimum Withdrawal (TND)</Label>
            <Input type="number" defaultValue="100" className="max-w-[200px]" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Input defaultValue="TND" className="max-w-[200px]" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Escrow Rules</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Auto-release after (days)</Label>
            <Input type="number" defaultValue="14" className="max-w-[200px]" />
            <p className="text-xs text-muted-foreground">If client doesn't respond, funds auto-release to freelancer</p>
          </div>
          <div className="space-y-2">
            <Label>Max revision requests</Label>
            <Input type="number" defaultValue="3" className="max-w-[200px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-heading text-lg">Feature Toggles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Enable user registration", desc: "Allow new users to sign up", checked: true },
            { label: "Enable escrow payments", desc: "Require escrow for all projects", checked: true },
            { label: "Enable dispute system", desc: "Allow users to open disputes", checked: true },
            { label: "Enable message monitoring", desc: "Auto-flag suspicious messages", checked: false },
            { label: "Maintenance mode", desc: "Show maintenance page to all users", checked: false },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <div><p className="text-sm font-medium">{f.label}</p><p className="text-xs text-muted-foreground">{f.desc}</p></div>
              <Switch defaultChecked={f.checked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="gap-2"><Save className="h-4 w-4" />Save Settings</Button>
    </div>
  );
}
