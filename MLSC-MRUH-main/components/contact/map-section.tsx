"use client"

import { motion } from "framer-motion"

export default function MapSection() {
  return (
    <section className="py-20 bg-gray-50">
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
          className="bg-card rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5234567890123!2d78.4567890123456!3d17.5234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMalla%20Reddy%20University!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 text-sm">
                  Maisammaguda, Dhulapally
                  <br />
                  Hyderabad, Telangana 500100
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Campus Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 2:00 PM
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Getting Here</h3>
                <p className="text-gray-600 text-sm">
                  Accessible by bus and metro
                  <br />
                  Parking available on campus
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
