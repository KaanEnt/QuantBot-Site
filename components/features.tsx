"use client";

import { motion } from "framer-motion";
import { Brain, Code, Database, LineChart, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Intelligent KB",
    description:
      "Dictionary-style knowledge base that grows with every interaction. Your learnings persist and compound.",
    tags: ["persistent", "searchable"],
  },
  {
    icon: Database,
    title: "Research Adapters",
    description:
      "Parallel data retrieval from multiple sources. Real-time market data, academic papers, and documentation.",
    tags: ["real-time", "multi-source"],
  },
  {
    icon: Code,
    title: "Python Runtime",
    description:
      "Execute and test code against live data. Build backtests, analyze portfolios, and validate strategies.",
    tags: ["execution", "live data"],
  },
  {
    icon: LineChart,
    title: "Skill Registry",
    description:
      "Every implementation becomes a reusable skill. Build once, use everywhere across your workflow.",
    tags: ["reusable", "composable"],
  },
  {
    icon: Sparkles,
    title: "Study Synthesis",
    description:
      "Comprehensive study guides generated from multiple perspectives. Learn concepts deeply, not superficially.",
    tags: ["comprehensive", "multi-angle"],
  },
  {
    icon: Zap,
    title: "Live Testing",
    description:
      "Test your implementations against real market conditions. Validate before you deploy.",
    tags: ["validation", "confidence"],
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

export function Features() {
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border mb-6">
            Core Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete system for learning and implementing quantitative
            finance. From concepts to code, all in one place.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
