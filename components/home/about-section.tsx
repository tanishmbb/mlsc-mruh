"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Users, Rocket, Brain, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about-section"
      ref={ref}
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-96 w-[80%] -translate-x-1/2 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-purple-600/5 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left Content */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
                <Brain className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-semibold text-violet-600/90 dark:text-violet-300">
                  AI & ML Department
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  MLSC MRUH
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                A vibrant community of innovators, developers, and future
                leaders at Malla Reddy University — driven by curiosity,
                collaboration, and cutting-edge technology.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation First",
                  desc: "Encouraging creative thinking and problem-solving.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  desc: "Collaboration, mentorship, and shared growth.",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: Rocket,
                  title: "Future Ready",
                  desc: "Preparing students for modern tech careers.",
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex gap-5 group p-4 rounded-2xl hover:bg-card/50 transition-colors"
                  >
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-7 w-7 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Stats & Visuals */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-[3rem] blur-2xl -z-10" />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border/50 p-8 rounded-3xl shadow-lg shadow-blue-500/5 text-center"
                >
                  <h3 className="text-4xl font-extrabold text-blue-500 mb-2">
                    5+
                  </h3>
                  <p className="font-medium text-muted-foreground">
                    Months Active
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border/50 p-8 rounded-3xl shadow-lg shadow-violet-500/5 text-center"
                >
                  <h3 className="text-4xl font-extrabold text-violet-500 mb-2">
                    15+
                  </h3>
                  <p className="font-medium text-muted-foreground">
                    Core Members
                  </p>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border/50 p-8 rounded-3xl shadow-lg shadow-emerald-500/5 text-center"
                >
                  <h3 className="text-4xl font-extrabold text-emerald-500 mb-2">
                    3+
                  </h3>
                  <p className="font-medium text-muted-foreground">Workshops</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border/50 p-8 rounded-3xl shadow-lg shadow-amber-500/5 text-center"
                >
                  <h3 className="text-4xl font-extrabold text-amber-500 mb-2">
                    2+
                  </h3>
                  <p className="font-medium text-muted-foreground">
                    Partnerships
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Mission Statement Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-10 -left-10 right-10 bg-background/80 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <p className="text-sm font-medium text-foreground/80">
                  "We are committed to fostering a culture of continuous
                  learning and technical excellence."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
