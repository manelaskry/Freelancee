import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertTriangle } from "lucide-react";
import { useState } from "react";

const allMessages = [
  { id: 1, from: "Sarah Chen", to: "Alex Rivera", message: "Hi Alex! I saw your comment on my post about the React developer position.", time: "Feb 19, 10:30", flagged: false },
  { id: 2, from: "Alex Rivera", to: "Sarah Chen", message: "Hey Sarah! Yes, I'm very interested.", time: "Feb 19, 10:32", flagged: false },
  { id: 3, from: "Mohamed T.", to: "Ahmed Khaled", message: "Can you send me your WhatsApp number?", time: "Feb 18, 14:30", flagged: true, flag: "external contact" },
  { id: 4, from: "Emily Watts", to: "Jordan Lee", message: "Can you share your portfolio?", time: "Feb 18, 11:00", flagged: false },
  { id: 5, from: "Ines Gharbi", to: "Sara Ben Ali", message: "Pay me directly to my bank account, skip the platform", time: "Feb 17, 09:15", flagged: true, flag: "payment bypass" },
  { id: 6, from: "Jordan Lee", to: "Emily Watts", message: "I've designed 3 fintech apps. Would love to chat!", time: "Feb 17, 08:30", flagged: false },
  { id: 7, from: "Unknown User", to: "Yasmine Mrad", message: "I can pay you more if you work off-platform", time: "Feb 16, 22:40", flagged: true, flag: "payment bypass" },
  { id: 8, from: "Mia Johnson", to: "Sarah Chen", message: "This sounds great! I'd love to discuss further.", time: "Feb 16, 15:00", flagged: false },
];

const flagStyles: Record<string, string> = {
  "external contact": "bg-accent/10 text-accent-foreground",
  "payment bypass": "bg-destructive/10 text-destructive",
};

function MessageTable({ messages }: { messages: typeof allMessages }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Flag</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((m) => (
          <TableRow key={m.id}>
            <TableCell className="text-sm font-medium">{m.from}</TableCell>
            <TableCell className="text-sm">{m.to}</TableCell>
            <TableCell className="text-sm max-w-xs truncate">{m.message}</TableCell>
            <TableCell>
              {m.flagged && m.flag ? (
                <Badge className={`text-[10px] capitalize ${flagStyles[m.flag]}`}>{m.flag}</Badge>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{m.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AdminMessages() {
  const [search, setSearch] = useState("");
  const flaggedMessages = allMessages.filter(m => m.flagged);

  const filteredAll = allMessages.filter((m) => m.message.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()));
  const filteredFlagged = flaggedMessages.filter((m) => m.message.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-accent" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Message Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">{allMessages.length} messages · {flaggedMessages.length} flagged</p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="flagged" className="gap-1.5">
            Flagged
            {flaggedMessages.length > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-[9px] h-4 min-w-[16px] px-1">{flaggedMessages.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <MessageTable messages={filteredAll} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search flagged messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <MessageTable messages={filteredFlagged} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
