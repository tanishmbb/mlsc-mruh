"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import EventQRCode from "@/components/qr/EventQRCode";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  User,
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  Edit,
  ShieldCheck,
  Mail,
  Hash,
  BookOpen,
  Phone as PhoneIcon,
} from "lucide-react";

type Profile = {
  full_name: string;
  email: string;
  roll_number: string;
  year: string;
  department: string;
  phone: string;
};

type Membership = {
  status: "pending" | "approved" | "rejected";
};

type RSVPEvent = {
  id: string;
  event_id: string;
  event: {
    title: string;
    event_date: string;
    venue: string;
  };
};

// Typed Variants
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
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [upcoming, setUpcoming] = useState<RSVPEvent[]>([]);
  const [past, setPast] = useState<RSVPEvent[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      /* ───── PROFILE (INDEPENDENT) ───── */
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email, roll_number, year, department, phone")
        .eq("user_id", user.id)
        .maybeSingle();

      setProfile(profileData ?? null);

      /* ───── LATEST MEMBERSHIP APPLICATION ONLY ───── */
      const { data: membershipData } = await supabase
        .from("membership_applications")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setMembership(membershipData ?? null);

      /* ───── RSVPs ───── */
      const { data: rsvps } = await supabase
        .from("event_rsvps")
        .select(
          `
          id,
          event_id,
          event:events (
            title,
            event_date,
            venue
          )
        `,
        )
        .eq("user_id", user.id);

      const now = new Date();

      // Transform data to match RSVPEvent type (handle array returned by join)
      const safe = (rsvps || [])
        .map((r: any) => ({
          ...r,
          event: Array.isArray(r.event) ? r.event[0] : r.event,
        }))
        .filter((r: any) => r.event) as RSVPEvent[];

      setUpcoming(safe.filter((r) => new Date(r.event.event_date) >= now));

      setPast(safe.filter((r) => new Date(r.event.event_date) < now));

      setDataLoading(false);
    };

    load();
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-10 pt-24">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 space-y-8"
      >
        {/* GREETING */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Welcome back, {profile?.full_name?.split(" ")[0] || "Student"}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your account.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/events">
              <Button variant="outline" className="rounded-full shadow-sm">
                Browse Events
              </Button>
            </Link>
            {profile && (
              <Link href="/profile/edit">
                <Button
                  variant="default"
                  className="rounded-full shadow-lg shadow-primary/20"
                >
                  <Edit size={16} className="mr-2" /> Edit Profile
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - PROFILE & MEMBERSHIP */}
          <div className="space-y-8 lg:col-span-1">
            {/* PROFILE CARD */}
            <motion.section
              variants={itemVariants}
              className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <User size={100} />
              </div>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <User size={18} />
                </span>
                Profile Details
              </h2>

              {!profile ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center text-muted-foreground">
                    <User size={32} />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Your profile is incomplete.
                  </p>
                  <Link href="/complete-profile">
                    <Button className="w-full">Complete Profile</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={12} /> Email
                    </p>
                    <p
                      className="text-sm font-medium truncate"
                      title={profile.email}
                    >
                      {profile.email}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
                        <Hash size={12} /> ID
                      </p>
                      <p className="text-sm font-medium">
                        {profile.roll_number}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} /> Year
                      </p>
                      <p className="text-sm font-medium">{profile.year}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen size={12} /> Department
                    </p>
                    <p className="text-sm font-medium truncate">
                      {profile.department}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <PhoneIcon size={12} /> Phone
                    </p>
                    <p className="text-sm font-medium">{profile.phone}</p>
                  </div>
                </div>
              )}
            </motion.section>

            {/* MEMBERSHIP CARD */}
            <motion.section
              variants={itemVariants}
              className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard size={100} />
              </div>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <ShieldCheck size={18} />
                </span>
                Membership
              </h2>

              {!membership && (
                <div className="bg-muted/30 rounded-2xl p-6 text-center space-y-3 border border-dashed border-border text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Not a member yet?
                  </p>
                  <Link href="/membership" className="block">
                    <Button variant="secondary" className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              )}

              {membership && (
                <div className="bg-background/40 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">
                      Status
                    </span>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        membership.status === "approved"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : membership.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {membership.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {membership.status === "approved" &&
                      "You have full access to all MLSC resources and events."}
                    {membership.status === "pending" &&
                      "Your application is under review by the core team."}
                    {membership.status === "rejected" &&
                      "Please update your application or contact support."}
                  </p>

                  {membership.status === "rejected" && (
                    <Link href="/membership" className="block mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        Reapply
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </motion.section>
          </div>

          {/* RIGHT COLUMN - RSVPS */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              variants={itemVariants}
              className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl min-h-[500px]"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <Calendar size={18} />
                </span>
                Your Events
              </h2>

              <div className="space-y-8">
                {/* UPCOMING */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Upcoming
                  </h3>
                  {upcoming.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-2xl border-border/50 bg-muted/20">
                      <p className="text-muted-foreground text-sm">
                        No upcoming events found.
                      </p>
                      <Link
                        href="/events"
                        className="text-primary text-sm font-medium hover:underline mt-1 inline-block"
                      >
                        Explore Events
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {upcoming.map((r) => (
                        <div
                          key={r.id}
                          className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-background/40 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold text-lg text-foreground">
                              {r.event!.title}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-primary" />{" "}
                                {new Date(
                                  r.event!.event_date,
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={14} className="text-primary" />{" "}
                                {new Date(
                                  r.event!.event_date,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-primary" />{" "}
                                {r.event!.venue}
                              </span>
                            </div>
                          </div>
                          {/* ATTENDANCE QR */}
                          <div className="flex justify-center md:justify-end shrink-0">
                            <div className="bg-white p-2 rounded-xl shadow-sm w-fit">
                              <EventQRCode
                                eventId={r.event_id}
                                userId={user.id}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PAST */}
                {past.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pt-4 border-t border-border/40">
                      Past Events
                    </h3>
                    <div className="space-y-3">
                      {past.map((r) => (
                        <div
                          key={r.id}
                          className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                        >
                          <div>
                            <p className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                              {r.event!.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                r.event!.event_date,
                              ).toLocaleDateString()}{" "}
                              · {r.event!.venue}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
