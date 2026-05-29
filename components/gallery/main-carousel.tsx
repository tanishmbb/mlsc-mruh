"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainCarouselProps {
  images: {
    src: string;
    title: string;
    description: string;
  }[];
  autoPlayInterval?: number;
}

export default function MainCarousel({
  images,
  autoPlayInterval = 5000,
}: MainCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const total = images.length;

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex((index + total) % total);
    },
    [total],
  );

  const goToPrevious = () => goToIndex(currentIndex - 1);
  const goToNext = () => goToIndex(currentIndex + 1);

  /* Auto play (pause on hover) */
  useEffect(() => {
    if (isHovering || total <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovering, total, autoPlayInterval]);

  /* Keyboard support */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  if (total === 0) return null;

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].title}
            fill
            priority
            className="object-cover"
          />

          {/* Improved Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

          {/* Text Content */}
          <div className="absolute bottom-12 left-6 md:left-12 max-w-2xl text-white">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg"
            >
              {images[currentIndex].title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-white/90 text-sm md:text-lg font-medium leading-relaxed max-w-lg drop-shadow-md"
            >
              {images[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Visible on Hover */}
      {total > 1 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavButton side="left" label="Previous slide" onClick={goToPrevious}>
            <ChevronLeft size={28} />
          </NavButton>

          <NavButton side="right" label="Next slide" onClick={goToNext}>
            <ChevronRight size={28} />
          </NavButton>
        </div>
      )}

      {/* Modern Indicators */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => {
            const active = index === currentIndex;
            return (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  active ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────── Reusable Nav Button ───────── */
function NavButton({
  side,
  onClick,
  label,
  children,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-6" : "right-6"
      } w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-colors z-20`}
    >
      {children}
    </motion.button>
  );
}
