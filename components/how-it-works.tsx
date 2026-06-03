"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Database, Search, Sparkles, Zap } from "lucide-react";

const teacherSteps = [
  {
    icon: Search,
    label: "KB Lookup",
    description: "Searches knowledge base",
  },
  {
    icon: Database,
    label: "Research Adapters",
    description: "Parallel data retrieval",
  },
  {
    icon: Sparkles,
    label: "Synthesis",
    description: "Generates study guide",
  },
  {
    icon: BookOpen,
    label: "Save to KB",
    description: "Persists for future use",
  },
];

const implementerSteps = [
  {
    icon: BookOpen,
    label: "Read Topic",
    description: "Loads from knowledge base",
  },
  {
    icon: Code2,
    label: "Scaffold Skill",
    description: "Generates Python code",
  },
  {
    icon: Zap,
    label: "Register",
    description: "Adds to skill registry",
  },
  {
    icon: Sparkles,
    label: "Test Live",
    description: "Runs against real data",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ModeCard({
  title,
  command,
  description,
  example,
  steps,
  isTeacher,
}: {
  title: string;
  command: string;
  description: string;
  example: string;
  steps: typeof teacherSteps;
  isTeacher: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative bg-card rounded-2xl p-8 lg:p-10 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isTeacher
              ? "bg-accent text-accent-foreground"
              : "bg-foreground text-background"
          }`}
        >
          {command}
        </span>
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <div className="mb-8 p-4 bg-secondary/50 rounded-xl border border-border">
        <p className="text-sm text-muted-foreground mb-1">Example prompt:</p>
        <p className="text-foreground font-medium">{`"${example}"`}</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Process Flow
        </p>
        <div className="grid grid-cols-2 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  isTeacher ? "bg-accent/20" : "bg-foreground/10"
                }`}
              >
                <step.icon
                  className={`w-4 h-4 ${
                    isTeacher ? "text-accent-foreground" : "text-foreground"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flow indicator */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
        <span
          className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
            isTeacher ? "bg-accent" : "bg-foreground text-background"
          }`}
        >
          {isTeacher ? "Learn" : "Build"}
        </span>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            Two Modes, One System
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            How QuantBot Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A dictionary-style knowledge base paired with research adapters and
            a Python runtime. Choose your mode based on your goal.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-6"
        >
          <ModeCard
            title="Teacher Mode"
            command="quant-teacher"
            description="Ask QuantBot to explain any quantitative finance concept. It synthesizes a comprehensive study guide from multiple sources."
            example="Explain Black-Scholes and its assumptions"
            steps={teacherSteps}
            isTeacher={true}
          />
          <ModeCard
            title="Implementer Mode"
            command="quant-implementer"
            description="Ask QuantBot to build something. It scaffolds the code, registers it as a reusable skill, and tests against live data."
            example="Build a momentum backtester for equities"
            steps={implementerSteps}
            isTeacher={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
