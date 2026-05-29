"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const logoVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const progressVariants: Variants = {
  initial: { width: 0 },
  animate: {
    width: "100%",
    transition: { duration: 2, delay: 0.5 },
  },
};

export default function LoadingScreen() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoSrc =
    theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-background flex items-center justify-center z-50 flex-col"
    >
      <div className="text-center w-full max-w-md px-6">
        {/* Logo */}
        <motion.div variants={logoVariants} className="mb-10">
          <div className="relative h-24 w-64 mx-auto">
            <Image
              src={logoSrc}
              alt="MLSC MRUH Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Loader bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full max-w-xs mx-auto">
          <motion.div
            variants={progressVariants}
            initial="initial"
            animate="animate"
            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 rounded-full"
          />
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-6 text-sm text-muted-foreground/80 font-medium tracking-wide"
        >
          PREPARING YOUR EXPERIENCE...
        </motion.p>
      </div>
    </motion.div>
  );
}
