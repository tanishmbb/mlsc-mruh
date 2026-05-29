"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    category: string;
    color: string;
  };
  index: number;
}

const colorClasses = {
  blue: {
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dot: "bg-blue-500",
    button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  },
  green: {
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
    dot: "bg-green-500",
    button:
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  },
  red: {
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
    dot: "bg-red-500",
    button: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  },
  yellow: {
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    dot: "bg-yellow-500",
    button:
      "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.08,
    },
  }),
};

const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContentVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
};

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = colorClasses[resource.color as keyof typeof colorClasses];

  return (
    <>
      {/* CARD */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
        className="cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
          <div className="relative">
            <Image
              src={resource.image || "/placeholder.svg"}
              alt={resource.title}
              width={400}
              height={240}
              className="w-full h-48 object-cover"
            />
            <span
              className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border ${colors.badge}`}
            >
              {resource.category}
            </span>
          </div>

          <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {resource.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
              {resource.description}
            </p>

            <span className="mt-auto text-sm font-medium text-primary">
              Click to explore →
            </span>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {isExpanded && (
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={resource.image || "/placeholder.svg"}
                alt={resource.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-t-2xl"
              />

              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white"
              >
                <X size={18} />
              </button>

              <span
                className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full border ${colors.badge}`}
              >
                {resource.category}
              </span>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {resource.title}
              </h2>

              <p className="text-muted-foreground text-lg mb-8">
                {resource.description}
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-4">
                Key Features
              </h3>

              <ul className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Comprehensive documentation",
                  "Hands-on tutorials",
                  "Community & expert support",
                  "Regular updates",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-3 ${colors.dot}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button
                  asChild
                  className={`bg-gradient-to-r ${colors.button} text-white flex-1`}
                >
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Explore Resource
                    <ExternalLink size={16} />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
