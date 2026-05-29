"use client"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact/contact-form"
import { MapPin, Mail, Phone, User, Instagram, Linkedin, Youtube, UserPlus, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

const leadershipContacts = [
  {
    role: "President",
    name: "P. Charitha Reddy",
    email: "charithareddy1074@gmail.com",
    phone: "+91 80990 63869",
    linkedin: "https://www.linkedin.com/in/pebbeti-charitha-reddy-839257286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    color: "blue",
  },
  {
    role: "Vice President",
    name: "Tadakamalla Sai Pranay",
    email: "pranaytadakamalla@outlook.com",
    phone: "+91 86881 83168",
    linkedin: "https://www.linkedin.com/in/sai-pranay-tadakamalla-7570bb1a6/",
    color: "purple",
  },
  {
    role: "General Secretary",
    name: "P. Vishnu Vardhan Reddy",
    email: "vishnuvardhanreddypadala@gmail.com",
    phone: "+91 98486 07865",
    linkedin: "https://www.linkedin.com/in/vishnu-vardhan-reddy-padala-a3a13330b",
    color: "green",
  },
]

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mlsc_mruh?igsh=YXVtMXNpanIwYmF1",
    icon: Instagram,
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    description: "Check out our event photos and stories",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mlsc-mru",
    icon: Linkedin,
    color: "hover:bg-blue-700",
    description: "Connect with us professionally",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@mlsc_mruh",
    icon: Youtube,
    color: "hover:bg-red-600",
    description: "Watch our workshops and event recordings",
  },
]

export default function ContactPage() {
  const handleRegistration = () => {
    // Scroll to contact form
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-card">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Get In <span className="text-green-600">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Have questions about MLSC MRUH? Want to join our community? We'd love to hear from you!
              </p>
              {/* Registration CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button
                  onClick={handleRegistration}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <UserPlus className="mr-2" size={20} />
                  Register to Join MLSC MRUH
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Contacts */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Contacts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get in touch with our student leaders for specific inquiries and collaboration opportunities.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipContacts.map((contact, index) => (
                <motion.div
                  key={contact.role}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className={`bg-card rounded-2xl p-6 shadow-lg border-l-4 ${
                    contact.color === "blue"
                      ? "border-blue-500 hover:border-blue-600"
                      : contact.color === "purple"
                        ? "border-purple-500 hover:border-purple-600"
                        : "border-green-500 hover:border-green-600"
                  } hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        contact.color === "blue"
                          ? "bg-blue-100 group-hover:bg-blue-200"
                          : contact.color === "purple"
                            ? "bg-purple-100 group-hover:bg-purple-200"
                            : "bg-green-100 group-hover:bg-green-200"
                      } transition-colors duration-300`}
                    >
                      <User
                        className={`w-6 h-6 ${
                          contact.color === "blue"
                            ? "text-blue-600 group-hover:text-blue-700"
                            : contact.color === "purple"
                              ? "text-purple-600 group-hover:text-purple-700"
                              : "text-green-600 group-hover:text-green-700"
                        } transition-colors duration-300`}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                        {contact.role}
                      </h3>
                      <p className="text-foreground font-semibold mb-3 group-hover:text-gray-600 transition-colors duration-300">
                        {contact.name}
                      </p>
                      <div className="space-y-2">
                        <motion.div
                          className="flex items-center text-gray-600"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail size={16} className="mr-2" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-blue-600 transition-colors duration-200"
                          >
                            {contact.email}
                          </a>
                        </motion.div>
                        <motion.div
                          className="flex items-center text-gray-600"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Phone size={16} className="mr-2" />
                          <a
                            href={`tel:${contact.phone}`}
                            className="hover:text-blue-600 transition-colors duration-200"
                          >
                            {contact.phone}
                          </a>
                        </motion.div>
                        <div className="flex items-center space-x-2 mt-3">
                          <motion.a
                            href={contact.linkedin}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                          >
                            <Linkedin size={16} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* University Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* University Details */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">University Information</h2>
                <div className="space-y-6">
                  <motion.div
                    className="bg-card rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:border-red-600 transition-all duration-300 cursor-pointer group"
                    whileHover={{
                      x: 8,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <MapPin className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                          Our Location
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          Malla Reddy University
                          <br />
                          Maisammaguda, Dhulapally
                          <br />
                          Hyderabad, Telangana 500100
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-card rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:border-blue-600 transition-all duration-300 cursor-pointer group"
                    whileHover={{
                      x: 8,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Clock className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                          Campus Hours
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-card rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:border-green-600 transition-all duration-300 cursor-pointer group"
                    whileHover={{
                      x: 8,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Navigation className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                          Getting Here
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                          Accessible by bus and metro
                          <br />
                          Parking available on campus
                          <br />
                          Near Kompally Metro Station
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div id="contact-form">
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Connect With Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow us on social media to stay updated with the latest events, announcements, and community
                highlights.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.08,
                      y: -10,
                      rotateY: 5,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center space-y-4 p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group ${social.color} text-center cursor-pointer border border-border100 hover:border-border200`}
                  >
                    <motion.div
                      className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-card transition-all duration-300 shadow-md group-hover:shadow-lg"
                      whileHover={{
                        scale: 1.1,
                        rotate: 10,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Icon className="w-10 h-10 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <motion.h3
                        className="font-bold text-xl text-gray-900 group-hover:text-white transition-colors duration-300 mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {social.name}
                      </motion.h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                        {social.description}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Visit us at Malla Reddy University campus in Hyderabad
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-96 w-full">
                <iframe title="viewport"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5234567890123!2d78.4567890123456!3d17.5234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMalla%20Reddy%20University!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-2xl"
                />
              </div>
              <motion.div
                className="p-6 bg-gradient-to-r from-blue-50 to-green-50"
                whileHover={{
                  background: "linear-gradient(to right, rgb(239 246 255), rgb(240 253 244))",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
                    <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600 text-sm">
                      Maisammaguda, Dhulapally
                      <br />
                      Hyderabad, Telangana 500100
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
                    <h3 className="font-bold text-gray-900 mb-2">Campus Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
                    <h3 className="font-bold text-gray-900 mb-2">Getting Here</h3>
                    <p className="text-gray-600 text-sm">
                      Accessible by bus and metro
                      <br />
                      Parking available on campus
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  )
}
