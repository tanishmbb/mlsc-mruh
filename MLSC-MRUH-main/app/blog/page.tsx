"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Clock, Sparkles } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-card">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                MLSC <span className="text-purple-600">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stay tuned for insights, tutorials, and stories from our vibrant tech community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl border border-purple-100"
            >
              <div className="mb-8">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Coming Soon!</h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We're working hard to bring you amazing content including tech tutorials, event highlights, student
                  spotlights, and industry insights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tech Tutorials</h3>
                  <p className="text-sm text-gray-600">Step-by-step guides and coding tutorials</p>
                </div>

                <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                  <Clock className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Event Stories</h3>
                  <p className="text-sm text-gray-600">Behind-the-scenes from our events</p>
                </div>

                <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                  <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Student Spotlights</h3>
                  <p className="text-sm text-gray-600">Featuring our amazing community members</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">Want to be notified?</h3>
                <p className="text-gray-600 mb-4">Follow us on social media to get updates when we launch our blog!</p>
                <div className="flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>


    </div>
  )
}
