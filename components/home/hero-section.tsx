"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Code, ChevronDown } from "lucide-react";

const heroVariants: Variants = {
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

const blobVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 90, 0],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Animated Ambient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[100px]"
        />
        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{
            duration: 12,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 right-1/4 h-[25rem] w-[25rem] rounded-full bg-violet-600/20 blur-[100px]"
        />
        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{
            duration: 15,
            delay: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/3 right-1/3 h-[20rem] w-[20rem] rounded-full bg-emerald-600/20 blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-sm font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md">
              The Future of Tech is Here
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-8 tracking-tight leading-tight"
          >
            Welcome to <br />
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-x">
              MLSC MRUH
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Microsoft Learn Student Chapter at Malla Reddy University
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Where innovation meets collaboration — empowering students to become
            tomorrow’s tech leaders through hands-on learning and community.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 w-full sm:w-auto"
          >
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="w-full sm:w-auto rounded-full px-10 py-7 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-xl hover:shadow-2xl shadow-blue-500/20 transition-all transform hover:-translate-y-1"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto rounded-full px-10 py-7 text-lg border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:border-violet-500/50 transition-all font-semibold"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto"
          >
            {[
              {
                icon: Users,
                value: "200+",
                label: "Active Members",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
              {
                icon: Code,
                value: "50+",
                label: "Tech Events",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                icon: Users,
                value: "#1",
                label: "Club in MRUH",
                color: "text-violet-500",
                bg: "bg-violet-500/10",
                border: "border-violet-500/20",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl bg-card/50 backdrop-blur-sm border ${stat.border} p-6 shadow-lg hover:shadow-xl transition-all group`}
                >
                  <div
                    className={`mx-auto mb-4 h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        onClick={() =>
          document
            .getElementById("about-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
