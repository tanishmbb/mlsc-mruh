"use client";

import type React from "react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 50,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-10 shadow-xl text-center flex flex-col items-center justify-center h-full min-h-[400px]"
      >
        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-3">
          Message Sent!
        </h3>
        <p className="text-muted-foreground text-lg">
          Thank you for reaching out. We'll get back to you soon!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-blue-500/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />

      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Send us a Message
        </h2>
        <p className="text-muted-foreground text-lg">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants}>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-6 bg-background/50 border-border/60 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            placeholder="Enter your full name"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-6 bg-background/50 border-border/60 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            placeholder="Enter your email address"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-6 bg-background/50 border-border/60 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            placeholder="What's this about?"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-4 bg-background/50 border-border/60 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all duration-200 resize-none"
            placeholder="Tell us more about your inquiry..."
          />
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
