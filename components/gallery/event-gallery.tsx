"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface EventGalleryProps {
  gallery: {
    id: number;
    title: string;
    date: string;
    images: string[];
  };
  index: number;
  onImageClick: (
    src: string,
    title: string,
    images: string[],
    currentIndex: number,
  ) => void;
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

export default function EventGallery({
  gallery,
  index,
  onImageClick,
}: EventGalleryProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-black dark:text-white">
          {gallery.title}
        </h3>
        <p className="text-sm text-black/70 dark:text-white/70">
          {gallery.date}
        </p>
      </motion.div>

      {/* Images */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {gallery.images.map((image, imageIndex) => (
          <motion.div
            key={imageIndex}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer group"
            onClick={() =>
              onImageClick(image, gallery.title, gallery.images, imageIndex)
            }
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-transparent dark:border-white/10 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-white/5">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${gallery.title} ${imageIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Premium Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
