"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"

interface ImageViewerProps {
  image: {
    src: string
    title: string
    images: string[]
    currentIndex: number
  }
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export default function ImageViewer({ image, onClose, onNavigate }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(image.currentIndex)

  useEffect(() => {
    setCurrentIndex(image.currentIndex)
  }, [image.currentIndex])

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + image.images.length) % image.images.length
    setCurrentIndex(newIndex)
    onNavigate(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % image.images.length
    setCurrentIndex(newIndex)
    onNavigate(newIndex)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [currentIndex])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full h-full flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative max-w-full max-h-full">
            <Image
              src={image.images[currentIndex] || "/placeholder.svg"}
              alt={`${image.title} ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Close Button - Top Right */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-border600/50"
          >
            <X size={24} />
          </motion.button>

          {/* Navigation Arrows */}
          {image.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-border600/50"
              >
                <ChevronLeft size={28} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-border600/50"
              >
                <ChevronRight size={28} />
              </motion.button>
            </>
          )}

          {/* Image Info - Bottom Left */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-bold mb-1 font-display">{image.title}</h3>
            <p className="text-gray-300 font-body">
              {currentIndex + 1} of {image.images.length}
            </p>
          </div>

          {/* Action Buttons - Bottom Right */}
          <div className="absolute bottom-6 right-6 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const link = document.createElement("a")
                link.href = image.images[currentIndex]
                link.download = `${image.title}-${currentIndex + 1}`
                link.click()
              }}
              className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-border600/50"
            >
              <Download size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: image.title,
                    url: image.images[currentIndex],
                  })
                }
              }}
              className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm border border-border600/50"
            >
              <Share2 size={18} />
            </motion.button>
          </div>

          {/* Thumbnail Strip - Bottom Center */}
          {image.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border600/50">
              {image.images.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((img, index) => {
                const actualIndex = Math.max(0, currentIndex - 2) + index
                return (
                  <motion.button
                    key={actualIndex}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setCurrentIndex(actualIndex)
                      onNavigate(actualIndex)
                    }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      actualIndex === currentIndex ? "border-white scale-110" : "border-border500 hover:border-border300"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${actualIndex + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                )
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
