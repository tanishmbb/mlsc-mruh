"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface EventGalleryProps {
  gallery: {
    id: number
    title: string
    date: string
    images: string[]
  }
  index: number
  onImageClick: (src: string, title: string, images: string[], currentIndex: number) => void
}

export default function EventGallery({ gallery, index, onImageClick }: EventGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{gallery.title}</h3>
        <p className="text-gray-600">{gallery.date}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.images.map((image, imageIndex) => (
          <motion.div
            key={imageIndex}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group"
            onClick={() => onImageClick(image, gallery.title, gallery.images, imageIndex)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${gallery.title} ${imageIndex + 1}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
