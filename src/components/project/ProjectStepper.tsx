import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface ProjectStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProjectStepper({ steps, currentStep }: ProjectStepperProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative flex items-center justify-between mb-8">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        {/* Filled line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min((currentStep / (steps.length - 1)) * 100, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  isCompleted && "bg-accent border-accent text-accent-foreground",
                  isCurrent && "bg-card border-accent text-accent shadow-md",
                  !isCompleted && !isCurrent && "bg-card border-border text-muted-foreground"
                )}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-heading font-bold">{index + 1}</span>
                )}
              </motion.div>
              <p className={cn(
                "text-xs mt-2 font-medium text-center max-w-[80px]",
                (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
