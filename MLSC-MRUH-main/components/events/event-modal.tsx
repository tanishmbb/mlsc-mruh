"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { X, Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventModalProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    poster: string
    description: string
    highlights: string[]
    gallery: string[]
  }
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.gallery.length) % event.gallery.length)
  }

  const isUpcoming = new Date(event.date) > new Date()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Image
              src={event.poster || "/placeholder.svg"}
              alt={event.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button title="Close"
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar size={20} className="mr-3 text-blue-500" />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-sm">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={20} className="mr-3 text-green-500" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-sm">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-3 text-red-500" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">About This Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Event Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {event.gallery.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>

                <div className="relative mb-4">
                  <Image
                    src={event.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${event.title} gallery ${currentImageIndex + 1}`}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {event.gallery.length > 1 && (
                    <>
                      <button title="Previous"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button title="Next"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {event.gallery.map((image, index) => (
                    <button title="Thumbnail"
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? "border-blue-500 scale-110"
                          : "border-border200 hover:border-border300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border200">
              {isUpcoming ? (
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full flex-1">
                  Register for Event
                </Button>
              ) : (
                <Button
                  disabled
                  className="bg-gray-200 text-gray-600 font-semibold px-8 py-3 rounded-full flex-1 cursor-not-allowed"
                >
                  Completed
                </Button>
              )}
              <Button
                variant="outline"
                className="border-2 border-border300 hover:border-blue-600 text-foreground hover:text-blue-600 font-semibold px-8 py-3 rounded-full bg-transparent"
              >
                Share Event
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
