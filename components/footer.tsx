"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Instagram, Linkedin, Youtube, MapPin, Mail } from "lucide-react";
import { useTheme } from "next-themes";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mlsc_mruh?igsh=YXVtMXNpanIwYmF1",
    icon: Instagram,
    hover: "group-hover:text-pink-500 group-hover:border-pink-500",
    bg: "group-hover:bg-pink-500/10",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mlsc-mru",
    icon: Linkedin,
    hover: "group-hover:text-blue-600 group-hover:border-blue-600",
    bg: "group-hover:bg-blue-600/10",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@mlsc_mruh",
    icon: Youtube,
    hover: "group-hover:text-red-600 group-hover:border-red-600",
    bg: "group-hover:bg-red-600/10",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const logoSrc =
    currentTheme === "dark"
      ? "/images/logo-dark.png"
      : "/images/logo-light.png";

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-80 w-[90%] -translate-x-1/2 bg-gradient-to-t from-blue-600/5 via-violet-600/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <div className="mb-6 p-1 w-fit rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-sm">
              <Image
                src={logoSrc}
                alt="MLSC MRUH"
                width={160}
                height={80}
                priority
                className="rounded-lg p-2 bg-card/50"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Microsoft Learn Student Chapter at Malla Reddy University —
              empowering students through technology, innovation, and community.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-bold mb-6 text-foreground flex items-center gap-2">
              Quick Links
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-bold mb-6 text-foreground flex items-center gap-2">
              Contact
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground group">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-500" />
                </div>
                <span>
                  Malla Reddy University,
                  <br />
                  Maisammaguda, Hyderabad
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground group">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-violet-500" />
                </div>
                <span>mlsc.mruh@outlook.com</span>
              </div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-bold mb-6 text-foreground flex items-center gap-2">
              Follow Us
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-amber-500 to-red-500" />
            </h3>

            <div className="flex items-center gap-4 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group h-11 w-11 rounded-full bg-card border border-border flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg ${social.bg}`}
                  >
                    <Icon
                      className={`h-5 w-5 text-muted-foreground transition-colors ${social.hover}`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="h-32 w-full overflow-hidden rounded-xl border border-border/50 shadow-inner bg-card/50">
              <iframe
                className="h-full w-full grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Malla%20Reddy%20University&output=embed"
                title="Map location"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Microsoft Learn Student Chapter – MRUH.
            All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
