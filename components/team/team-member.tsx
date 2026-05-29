"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    designation: string;
    image: string;
    linkedin: string;
    instagram: string;
    category: string;
    priority?: number;
  };
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
};

const socialOverlayVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const detailsVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

export default function TeamMember({ member, index }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core":
        return {
          bg: "from-blue-500 to-purple-600",
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          hover: "hover:shadow-blue-200/50",
        };
      case "department":
        return {
          bg: "from-emerald-500 to-teal-600",
          badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
          hover: "hover:shadow-emerald-200/50",
        };
      default:
        return {
          bg: "from-slate-500 to-slate-600",
          badge: "bg-slate-100 text-slate-700 border-slate-200",
          hover: "hover:shadow-slate-200/50",
        };
    }
  };

  const colors = getCategoryColor(member.category);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className={`bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 ${colors.hover} relative`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Social Media Overlay */}
          <motion.div
            variants={socialOverlayVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center space-x-4"
          >
            <motion.a
              href={member.linkedin}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg hover-glow"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href={member.instagram}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover-glow"
            >
              <Instagram size={20} />
            </motion.a>
          </motion.div>

          {/* Category Badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full border backdrop-blur-sm`}
          >
            {member.category.toUpperCase()}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 font-display">
            {member.name}
          </h3>
          <p className="text-blue-600 font-semibold mb-1 font-body">
            {member.role}
          </p>
          <p className="text-slate-500 text-sm mb-4 font-body">
            {member.designation}
          </p>

          {/* Gradient line */}
          <div
            className={`h-1 bg-gradient-to-r ${colors.bg} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
          ></div>
        </div>

        {/* Hover Details */}
        <motion.div
          variants={detailsVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4 overflow-hidden"
        >
          <div className="text-center">
            <p className="text-sm text-slate-600 font-body">
              Connect with me on social media
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
