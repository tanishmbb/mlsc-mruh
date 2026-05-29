"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Zap, Heart, TrendingUp } from "lucide-react"

const visionPoints = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Fostering a culture of creativity and breakthrough thinking that drives technological advancement.",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: Heart,
    title: "Collaboration",
    description: "Building bridges between students, faculty, and industry to create meaningful partnerships.",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description: "Embracing lifelong learning and staying at the forefront of technological evolution.",
    color: "from-red-500 to-pink-600",
  },
]

export default function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const router = useRouter()

  const handleStartJourney = () => {
    router.push("/contact")
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Vision</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We envision a future where technology serves humanity, and every student has the opportunity to be a part of
            that transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {visionPoints.map((point, index) => {
            const Icon = point.icon

            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="group"
              >
                <div className="bg-card/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-card/20 transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${point.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {point.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-card/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Join Us in Shaping the Future</h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Be part of a community that's not just learning about technology, but actively shaping its future.
              Together, we'll build solutions that matter, create innovations that inspire, and develop skills that last
              a lifetime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartJourney}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
