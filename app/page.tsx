"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/loading-screen";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import WhyJoinSection from "@/components/home/why-join-section";
import VisionSection from "@/components/home/vision-section";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.main
          key="home"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-screen bg-background text-foreground overflow-hidden"
        >
          {/* Global background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-[-10%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-600/20 via-violet-600/20 to-purple-600/20 blur-3xl" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-blue-600/15 to-violet-600/15 blur-3xl" />
          </div>

          {/* Sections */}
          {/* Sections with alternating backgrounds */}

          <div className="relative">
            <HeroSection />
            {/* Gradient fade at bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
          </div>

          <div className="relative z-10 bg-secondary/30 dark:bg-white/5 backdrop-blur-sm">
            <AboutSection />
          </div>

          <div className="relative z-10">
            <WhyJoinSection />
          </div>

          <div className="relative z-10 bg-secondary/30 dark:bg-white/5 backdrop-blur-sm">
            <VisionSection />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
