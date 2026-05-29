"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceCardProps {
  resource: {
    id: number
    title: string
    description: string
    image: string
    link: string
    category: string
    color: string
  }
  index: number
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    button: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-600",
    button: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
  },
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const colors = colorClasses[resource.color as keyof typeof colorClasses]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div
          className={`bg-card rounded-2xl shadow-lg border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full card-hover`}
        >
          <div className="relative overflow-hidden">
            <Image
              src={resource.image || "/placeholder.svg"}
              alt={resource.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className={`absolute top-4 left-4 px-3 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded-full`}
            >
              {resource.category}
            </div>
          </div>

          <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-200 font-display">
              {resource.title}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6 flex-grow font-body line-clamp-3">
              {resource.description}
            </p>

            <div className="text-center">
              <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-200">
                Click to explore →
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={resource.image || "/placeholder.svg"}
                alt={resource.title}
                width={600}
                height={300}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <X size={20} />
              </button>
              <div
                className={`absolute top-4 left-4 px-3 py-1 ${colors.bg} ${colors.text} text-sm font-semibold rounded-full`}
              >
                {resource.category}
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">{resource.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-body">{resource.description}</p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 font-display">Key Features:</h3>
                <ul className="space-y-2 text-slate-600 font-body">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Comprehensive learning resources and documentation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Hands-on tutorials and practical examples
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Community support and expert guidance
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Regular updates and new feature releases
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  className={`bg-gradient-to-r ${colors.button} text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex-1 font-display`}
                >
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>Explore Resource</span>
                    <ExternalLink size={18} />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(false)}
                  className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold py-3 px-6 rounded-full bg-transparent font-display"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
