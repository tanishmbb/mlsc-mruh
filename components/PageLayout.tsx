"use client";

import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="
        min-h-screen
        bg-background
        text-foreground
        relative
        overflow-x-hidden
      "
    >
      {/* Light mode ambient blur */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-50 dark:hidden" />

      {/* Dark mode ambient gradients */}
      <div
        aria-hidden
        className="
          pointer-events-none
          fixed inset-0
          -z-10
          hidden dark:block
          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_40%)]
        "
      />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Content */}
      <div className="relative">{children}</div>
    </motion.main>
  );
}
