"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    poster: string
    description: string
  }
  index: number
  onClick: () => void
}

export default function EventCard({ event, index, onClick }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isUpcoming = new Date(event.date) > new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <Image
            src={event.poster || "./event1/Img1.jpg"}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar size={16} className="mr-2 text-blue-500" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock size={16} className="mr-2 text-green-500" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-2 text-red-500" />
              {event.location}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{event.description}</p>

          <div className="mt-4 pt-4 border-t border-border100 flex justify-between items-center">
            <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-200">
              Click to view details →
            </span>

            {isUpcoming ? (
              <span className="text-sm text-green-600 font-semibold">Upcoming</span>
            ) : (
              <span className="text-sm text-muted-foreground font-semibold">Completed</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
