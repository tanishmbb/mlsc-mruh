"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Zap, Heart, TrendingUp, ArrowRight } from "lucide-react";

const visionPoints = [
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Fostering a culture of creativity and breakthrough thinking that drives real-world technological impact.",
    gradient: "from-blue-500 to-violet-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
  },
  {
    icon: Heart,
    title: "Collaboration",
    description:
      "Connecting students, mentors, and industry leaders to build meaningful and lasting partnerships.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description:
      "Encouraging lifelong learning and adaptability in an ever-evolving tech landscape.",
    gradient: "from-amber-500 to-pink-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500",
  },
];

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

export default function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  return (
    <section ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[32rem] w-[90%] -translate-x-1/2 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-purple-600/5 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 bg-emerald-500/5 blur-3xl opacity-40" />
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
            className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Vision
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed"
          >
            We envision a future where technology empowers people, and students
            are at the forefront of meaningful innovation.
          </motion.p>
        </motion.div>

        {/* Vision cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
        >
          {visionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`}
                />

                <div
                  className={`relative h-full rounded-3xl bg-card/40 backdrop-blur-sm border ${point.border} p-8 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-transparent group-hover:ring-1 group-hover:ring-white/20 dark:group-hover:ring-white/10`}
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${point.bg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-8 w-8 ${point.text}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {point.title}
                  </h3>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="relative max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-card to-background border border-border p-12 md:p-20 shadow-2xl overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5" />
              <div className="absolute top-0 right-0 h-64 w-64 bg-blue-500/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 bg-emerald-500/10 blur-[100px]" />
            </div>

            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8 leading-tight">
              Join Us in Shaping the Future
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
              Be part of a community that doesn’t just learn technology — but
              builds with it, leads with it, and shapes what comes next.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact")}
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-xl transition-all gap-2"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
