"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase/client";
import ThemeToggle from "@/components/theme/theme-toggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Resources", href: "/resources" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const menuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", user.email)
        .maybeSingle();

      setIsAdmin(!!data);
    };

    checkAdmin();
  }, [user]);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-[140px] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-light.png"
                alt="MLSC MRUH"
                fill
                priority
                className="object-contain dark:hidden"
              />
              <Image
                src="/images/logo-dark.png"
                alt="MLSC MRUH"
                fill
                priority
                className="object-contain hidden dark:block"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {!loading && user && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/admin")}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    Admin
                  </Button>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {!loading &&
              (user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => supabase.auth.signOut()}
                  className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  Login
                </Button>
              ))}

            <button
              className="lg:hidden p-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden rounded-b-2xl border-t border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-foreground/80 hover:text-primary hover:pl-2 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}

                {!loading && user && (
                  <>
                    <div className="h-px bg-border/50 my-2" />
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-semibold text-primary"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-semibold text-primary"
                      >
                        Admin Panle
                      </Link>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
