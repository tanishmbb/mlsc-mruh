"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

interface ImageViewerProps {
  image: {
    src: string;
    title: string;
    images: string[];
    currentIndex: number;
  };
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function ImageViewer({
  image,
  onClose,
  onNavigate,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(image.currentIndex);

  useEffect(() => {
    setCurrentIndex(image.currentIndex);
  }, [image.currentIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex]);

  const prev = () => {
    const i = (currentIndex - 1 + image.images.length) % image.images.length;
    setCurrentIndex(i);
    onNavigate(i);
  };

  const next = () => {
    const i = (currentIndex + 1) % image.images.length;
    setCurrentIndex(i);
    onNavigate(i);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center px-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.images[currentIndex]}
            alt={image.title}
            width={1600}
            height={900}
            className="max-h-[85vh] w-auto object-contain rounded-md shadow-2xl"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-all z-50"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          {image.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all group"
              >
                <ChevronLeft
                  size={32}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all group"
              >
                <ChevronRight
                  size={32}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </>
          )}

          {/* Bottom Info Bar */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-6 pointer-events-auto border border-white/10 text-white shadow-xl">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-white/90">
                  {image.title}
                </h3>
                <p className="text-xs text-white/60">
                  {currentIndex + 1} / {image.images.length}
                </p>
              </div>

              <div className="h-8 w-[1px] bg-white/20" />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = image.images[currentIndex];
                    a.download = "image";
                    a.click();
                  }}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  title="Download"
                >
                  <Download size={18} />
                </button>

                <button
                  onClick={() =>
                    navigator.share?.({
                      title: image.title,
                      url: image.images[currentIndex],
                    })
                  }
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  title="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
