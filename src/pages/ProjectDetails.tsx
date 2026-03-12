import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProjectStepper, type Step } from "@/components/project/ProjectStepper";
import { InvoiceDialog } from "@/components/project/InvoiceDialog";
import { PaymentDialog } from "@/components/project/PaymentDialog";
import { SubmitWorkDialog } from "@/components/project/SubmitWorkDialog";
import { ApprovalDialog } from "@/components/project/ApprovalDialog";
import {
  FileText, CreditCard, Play, Send, CheckCircle, Clock,
  ArrowLeft, Shield, AlertTriangle, RotateCcw
} from "lucide-react";

const steps: Step[] = [
  { id: "invoice", label: "Fill Invoice", description: "Create project invoice", icon: <FileText /> },
  { id: "payment", label: "Payment", description: "Deposit to escrow", icon: <CreditCard /> },
  { id: "start", label: "Start Project", description: "Begin work", icon: <Play /> },
  { id: "submit", label: "Submit Work", description: "Deliver work", icon: <Send /> },
  { id: "approval", label: "Approval", description: "Client review", icon: <CheckCircle /> },
];

// Mock project data
const projectData = {
  id: "1",
  title: "SaaS Dashboard Development",
  description: "Building a modern analytics dashboard with React and TypeScript",
  client: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
  freelancer: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex" },
  budget: "1000",
  deadline: "2025-03-15",
};

export default function ProjectDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "client"; // "client" or "freelancer"

  const [currentStep, setCurrentStep] = useState(0);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitWorkOpen, setSubmitWorkOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [escrowFunded, setEscrowFunded] = useState(false);
  const [workSubmitted, setWorkSubmitted] = useState(false);
  const [projectStatus, setProjectStatus] = useState<
    "invoice" | "payment" | "started" | "in_progress" | "submitted" | "revision" | "approved" | "disputed"
  >("invoice");

  const handleInvoiceSubmit = () => {
    setInvoiceOpen(false);
    setCurrentStep(1);
    setProjectStatus("payment");
  };

  const handlePaymentSubmit = () => {
    setPaymentOpen(false);
    setEscrowFunded(true);
    setCurrentStep(2);
    setProjectStatus("started");
  };

  const handleStartProject = () => {
    setCurrentStep(3);
    setProjectStatus("in_progress");
  };

  const handleSubmitWork = () => {
    setSubmitWorkOpen(false);
    setWorkSubmitted(true);
    setCurrentStep(4);
    setProjectStatus("submitted");
  };

  const handleApprove = () => {
    setApprovalOpen(false);
    setCurrentStep(5);
    setProjectStatus("approved");
  };

  const handleRequestRevision = () => {
    setApprovalOpen(false);
    setCurrentStep(3);
    setProjectStatus("revision");
    setWorkSubmitted(false);
  };

  const handleDispute = () => {
    setApprovalOpen(false);
    setProjectStatus("disputed");
  };

  const isClient = role === "client";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <Button variant="ghost" size="sm" className="gap-1.5 -ml-2" onClick={() => navigate("/my-work")}>
          <ArrowLeft className="h-4 w-4" /> Back to My Work
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-heading text-2xl font-bold">{projectData.title}</h1>
              <Badge
                variant="outline"
                className={
                  projectStatus === "approved" ? "bg-success/10 text-success border-success/30" :
                  projectStatus === "disputed" ? "bg-destructive/10 text-destructive border-destructive/30" :
                  projectStatus === "submitted" ? "bg-accent/10 text-accent border-accent/30" :
                  "bg-primary/10 text-primary border-primary/30"
                }
              >
                {projectStatus === "invoice" && "Pending Invoice"}
                {projectStatus === "payment" && "Awaiting Payment"}
                {projectStatus === "started" && "Ready to Start"}
                {projectStatus === "in_progress" && "In Progress"}
                {projectStatus === "submitted" && "Awaiting Approval"}
                {projectStatus === "revision" && "Revision Requested"}
                {projectStatus === "approved" && "Completed"}
                {projectStatus === "disputed" && "Disputed"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{projectData.description}</p>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={projectData.client.avatar} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[10px] text-muted-foreground">Client</p>
              <p className="text-xs font-medium">{projectData.client.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={projectData.freelancer.avatar} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[10px] text-muted-foreground">Freelancer</p>
              <p className="text-xs font-medium">{projectData.freelancer.name}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stepper */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <ProjectStepper steps={steps} currentStep={currentStep} />
        </CardContent>
      </Card>

      {/* Escrow status */}
      {escrowFunded && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 rounded-lg bg-success/10 border border-success/30 p-4">
            <Shield className="h-5 w-5 text-success shrink-0" />
            <div>
              <p className="text-sm font-medium text-success">Escrow Funded — {projectData.budget} TND</p>
              <p className="text-xs text-muted-foreground">Funds are securely held until project completion</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Disputed status */}
      {projectStatus === "disputed" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-4">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Dispute Opened</p>
              <p className="text-xs text-muted-foreground">Escrow is frozen. Admin will review and decide within 5 business days.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Completed status */}
      {projectStatus === "approved" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-success/30 bg-success/5">
            <CardContent className="p-6 text-center space-y-3">
              <CheckCircle className="h-12 w-12 text-success mx-auto" />
              <h3 className="font-heading text-lg font-bold">Project Completed!</h3>
              <p className="text-sm text-muted-foreground">
                Payment of <span className="font-semibold">{(parseFloat(projectData.budget) * 0.9).toFixed(2)} TND</span> has been released to {projectData.freelancer.name}'s wallet.
              </p>
              <p className="text-xs text-muted-foreground">Platform commission: {(parseFloat(projectData.budget) * 0.1).toFixed(2)} TND</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step-specific action cards */}
      {projectStatus !== "approved" && projectStatus !== "disputed" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={projectStatus}>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <h3 className="font-heading font-semibold">
                {projectStatus === "invoice" && "Step 1 — Create Invoice"}
                {projectStatus === "payment" && "Step 2 — Deposit to Escrow"}
                {projectStatus === "started" && "Step 3 — Start Project"}
                {projectStatus === "in_progress" && "Step 4 — Work In Progress"}
                {projectStatus === "submitted" && "Step 5 — Review Submission"}
                {projectStatus === "revision" && "Step 4 — Revision Requested"}
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* INVOICE */}
              {projectStatus === "invoice" && (
                isClient ? (
                  <>
                    <p className="text-sm text-muted-foreground">Create an invoice with the project budget, scope, and deadline before proceeding to payment.</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setInvoiceOpen(true)}>
                      <FileText className="h-4 w-4" /> Fill Invoice
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Waiting for client to create invoice...
                  </div>
                )
              )}

              {/* PAYMENT */}
              {projectStatus === "payment" && (
                isClient ? (
                  <>
                    <p className="text-sm text-muted-foreground">Deposit the project budget into escrow. The money will be held securely until you approve the work.</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setPaymentOpen(true)}>
                      <CreditCard className="h-4 w-4" /> Proceed to Payment
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Waiting for client to fund escrow...
                  </div>
                )
              )}

              {/* START */}
              {projectStatus === "started" && (
                isClient ? (
                  <>
                    <p className="text-sm text-muted-foreground">Escrow is funded. Click "Start Project" to notify the freelancer to begin.</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={handleStartProject}>
                      <Play className="h-4 w-4" /> Start Project
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Waiting for client to start the project...
                  </div>
                )
              )}

              {/* IN PROGRESS */}
              {projectStatus === "in_progress" && (
                isClient ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Freelancer is working on the project. You'll be notified when work is submitted.
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Complete the work and submit it for client review. Upload your deliverables and write a summary.</p>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setSubmitWorkOpen(true)}>
                      <Send className="h-4 w-4" /> Submit Work for Approval
                    </Button>
                  </>
                )
              )}

              {/* REVISION */}
              {projectStatus === "revision" && (
                isClient ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RotateCcw className="h-4 w-4" />
                    Waiting for freelancer to resubmit revised work...
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 p-3 mb-2">
                      <RotateCcw className="h-4 w-4 text-accent shrink-0" />
                      <p className="text-xs text-accent">The client has requested changes. Please revise and resubmit.</p>
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setSubmitWorkOpen(true)}>
                      <Send className="h-4 w-4" /> Resubmit Work
                    </Button>
                  </>
                )
              )}

              {/* SUBMITTED */}
              {projectStatus === "submitted" && (
                isClient ? (
                  <>
                    <p className="text-sm text-muted-foreground">The freelancer has submitted their work. Review the deliverables and decide.</p>
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 p-3 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4 text-accent shrink-0" />
                      Auto-release in 14 days if no action is taken.
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5" onClick={() => setApprovalOpen(true)}>
                      <CheckCircle className="h-4 w-4" /> Review Submission
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Work submitted! Waiting for client approval. Auto-release in 14 days.
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Role switcher for demo */}
      <Card className="border-dashed border-border">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2 font-heading font-semibold">Demo: Switch View</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={isClient ? "default" : "outline"}
              className="text-xs"
              onClick={() => navigate(`/project/1?role=client`)}
            >
              Client View
            </Button>
            <Button
              size="sm"
              variant={!isClient ? "default" : "outline"}
              className="text-xs"
              onClick={() => navigate(`/project/1?role=freelancer`)}
            >
              Freelancer View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <InvoiceDialog
        open={invoiceOpen}
        onOpenChange={setInvoiceOpen}
        onSubmit={handleInvoiceSubmit}
        projectTitle={projectData.title}
        freelancerName={projectData.freelancer.name}
      />
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        onSubmit={handlePaymentSubmit}
        amount={projectData.budget}
        projectTitle={projectData.title}
      />
      <SubmitWorkDialog
        open={submitWorkOpen}
        onOpenChange={setSubmitWorkOpen}
        onSubmit={handleSubmitWork}
      />
      <ApprovalDialog
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        onApprove={handleApprove}
        onRequestRevision={handleRequestRevision}
        onDispute={handleDispute}
        freelancerName={projectData.freelancer.name}
        amount={projectData.budget}
        submittedFiles={["design_final_v3.zip", "documentation.pdf"]}
        submittedMessage="All deliverables are complete. The dashboard includes analytics charts, user management, and responsive design."
      />
    </div>
  );
}
