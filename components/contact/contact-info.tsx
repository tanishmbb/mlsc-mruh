"use client";

import { motion, Variants } from "framer-motion";
import { User, Mail, Phone, MapPin } from "lucide-react";

const contacts = [
  {
    role: "President",
    name: "Arjun Sharma",
    email: "president@mlscmruh.org",
    phone: "+91 98765 43210",
    icon: User,
    color: "blue",
    border: "border-blue-500/50",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  {
    role: "General Secretary",
    name: "Rahul Kumar",
    email: "secretary@mlscmruh.org",
    phone: "+91 98765 43211",
    icon: User,
    color: "emerald",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 50,
      staggerChildren: 0.15,
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

export default function ContactInfo() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-center"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Contact Information
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Reach out to our core team for specific inquiries or collaborations.
        </p>
      </motion.div>

      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.role}
            variants={itemVariants}
            className={`bg-card/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border ${contact.border} hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-start space-x-5">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${contact.bg}`}
              >
                <contact.icon className={`w-7 h-7 ${contact.text}`} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {contact.role}
                </h3>
                <p className="text-muted-foreground font-medium mb-3 text-base">
                  {contact.name}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail size={16} className="mr-3 shrink-0" />
                    <a href={`mailto:${contact.email}`} className="truncate">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone size={16} className="mr-3 shrink-0" />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* University Address */}
        <motion.div
          variants={itemVariants}
          className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-red-500/30 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start space-x-5">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 text-red-500" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Our Location
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Malla Reddy University
                <br />
                Maisammaguda, Dhulapally,
                <br />
                Hyderabad, Telangana 500100
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
