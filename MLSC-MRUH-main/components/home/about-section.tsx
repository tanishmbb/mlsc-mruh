"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Users, Rocket, Brain } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about-section" ref={ref} className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            About <span className="text-blue-600">MLSC MRUH</span>
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-6 h-6 text-purple-600 mr-2" />
            <span className="text-lg font-semibold text-slate-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
              AI & ML Department
            </span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are a vibrant community of tech enthusiasts, innovators, and future leaders at Malla Reddy University,
            dedicated to fostering learning, collaboration, and growth in the world of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-6 font-display">Our Mission</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              To empower students with cutting-edge technology skills, foster innovation, and build a strong community
              of learners who will shape the future of technology. We believe in learning by doing, sharing knowledge,
              and growing together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2 font-display">Innovation First</h4>
                  <p className="text-slate-600">
                    We encourage creative thinking and innovative solutions to real-world problems.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors duration-300">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2 font-display">Community Driven</h4>
                  <p className="text-slate-600">
                    Building strong connections and fostering collaboration among students.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors duration-300">
                  <Rocket className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2 font-display">Future Ready</h4>
                  <p className="text-slate-600">
                    Preparing students for the challenges and opportunities of tomorrow's tech landscape.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-blue-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600 font-display">5+</span>
                  </div>
                  <p className="font-semibold text-slate-900">Months Active</p>
                </div>

                <div className="text-center p-4 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-600 font-display">15+</span>
                  </div>
                  <p className="font-semibold text-slate-900">Core Members</p>
                </div>

                <div className="text-center p-4 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-emerald-600 font-display">3+</span>
                  </div>
                  <p className="font-semibold text-slate-900">Workshops</p>
                </div>

                <div className="text-center p-4 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-amber-600 font-display">2+</span>
                  </div>
                  <p className="font-semibold text-slate-900">Partnerships</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
