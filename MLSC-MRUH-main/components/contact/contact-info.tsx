"use client"

import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin } from "lucide-react"

const contacts = [
  {
    role: "President",
    name: "Arjun Sharma",
    email: "president@mlscmruh.org",
    phone: "+91 98765 43210",
    icon: User,
    color: "blue",
  },
  {
    role: "General Secretary",
    name: "Rahul Kumar",
    email: "secretary@mlscmruh.org",
    phone: "+91 98765 43211",
    icon: User,
    color: "green",
  },
]

export default function ContactInfo() {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.role}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`bg-card rounded-2xl p-6 shadow-lg border-l-4 ${
              contact.color === "blue" ? "border-blue-500" : "border-green-500"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  contact.color === "blue" ? "bg-blue-100" : "bg-green-100"
                }`}
              >
                <contact.icon className={`w-6 h-6 ${contact.color === "blue" ? "text-blue-600" : "text-green-600"}`} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{contact.role}</h3>
                <p className="text-foreground font-semibold mb-3">{contact.name}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors duration-200">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600 transition-colors duration-200">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* University Address */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-lg border-l-4 border-red-500"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Our Location</h3>
              <p className="text-gray-600 leading-relaxed">
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
      </div>
    </motion.div>
  )
}
