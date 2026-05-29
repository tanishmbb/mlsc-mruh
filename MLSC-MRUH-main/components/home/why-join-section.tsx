"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Users, Crown, Building } from "lucide-react"

const pillars = [
  {
    icon: BookOpen,
    title: "Cutting-edge Learning",
    description:
      "Access to the latest Microsoft technologies, tools, and learning resources. Stay ahead with hands-on workshops and expert-led sessions.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Connect with like-minded peers, build lasting relationships, and collaborate on exciting projects that make a real impact.",
    color: "green",
  },
  {
    icon: Crown,
    title: "Leadership Opportunities",
    description:
      "Develop leadership skills by organizing events, mentoring juniors, and taking on responsibilities that shape your future.",
    color: "red",
  },
  {
    icon: Building,
    title: "Industry Exposure",
    description:
      "Get direct access to industry professionals, internship opportunities, and insights into the latest tech trends and career paths.",
    color: "yellow",
  },
]

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-500 to-red-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-200",
    gradient: "from-yellow-500 to-yellow-600",
  },
}

export default function WhyJoinSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Join <span className="text-green-600">MLSC?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the four pillars that make MLSC MRUH the perfect place to grow, learn, and excel in your tech
            journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            const colors = colorClasses[pillar.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div
                  className={`bg-card rounded-2xl p-8 shadow-lg border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}
                >
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-foreground transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">{pillar.description}</p>

                  <div
                    className={`h-1 bg-gradient-to-r ${colors.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  ></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
