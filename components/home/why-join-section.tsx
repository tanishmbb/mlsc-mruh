"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Crown, Building, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Cutting-edge Learning",
    description:
      "Access the latest Microsoft technologies with hands-on workshops, labs, and expert-led sessions.",
    accent: "blue",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Collaborate with like-minded peers, build strong connections, and grow together through teamwork.",
    accent: "emerald",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Crown,
    title: "Leadership Opportunities",
    description:
      "Develop leadership skills by organizing events, mentoring juniors, and driving initiatives.",
    accent: "violet",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Building,
    title: "Industry Exposure",
    description:
      "Gain insights from industry professionals, internships, and real-world tech experiences.",
    accent: "amber",
    color: "from-amber-500 to-amber-600",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function WhyJoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-background overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 h-[28rem] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-purple-600/5 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
          >
            Why Join{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              MLSC?
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed"
          >
            Four strong pillars that make MLSC MRUH the perfect place to learn,
            grow, and lead in tech.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full"
              >
                <div className="relative h-full rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Top shimmer border */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-${pillar.accent}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-${pillar.accent}-500/10 group-hover:bg-${pillar.accent}-500/20 transition-colors duration-300`}
                  >
                    <Icon className={`h-7 w-7 text-${pillar.accent}-500`} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
