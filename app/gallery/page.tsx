"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MainCarousel from "@/components/gallery/main-carousel"
import EventGallery from "@/components/gallery/event-gallery"
import ImageViewer from "@/components/gallery/image-viewer"

const mainCarouselImages = [
  {
    src: "/images/event1/Img1.jpg",
    title: "Mastering Git and GitHub",
    description: "Hands-on version control workshop at Microsoft Meet",
  },
  {
    src: "/images/event2/Img1.jpg",
    title: "Her Hustle Hour",
    description: "Celebrating women in technology with talks and workshops",
  },
  {
    src: "/images/event3/Img2.jpg",
    title: "Microsoft Learn Student Club Inaugration",
    description: "Inauguration of MLSC at Malla Reddy University",
  },
  {
    src: "/images/event4/Img2.jpg",
    title: "GIT, GitHub & VS Code Fundamentals",
    description: "Deep dive into version control using Git and GitHub",
  },
  {
    src: "/images/event5/Img2.jpg",
    title: "Productivity with Microsoft 365 & Copilot",
    description: "Master Git and GitHub with an immersive hands-on session",
  },
  {
    src: "/images/event6/Img1.jpg",
    title: "Launch of AIGNITE - Month of AI",
    description: "Kickoff event for AIGNITE, a month-long AI celebration",
  },
  {
    src: "/images/event7/Img1.jpg",
    title: "AIGNITE - Intro to ML, DL, RL Concepts and Careers",
    description:
      "Dive into the fundamentals of Machine Learning, Deep Learning, and Reinforcement Learning",
  },
]

const eventGalleries = [
  {
    id: 1,
    title: "Mastering Git and GitHub",
    date: "May 11, 2025",
    images: [
      "/images/event1/Img1.jpg",
      "/images/event1/Img2.jpg",
      "/images/event1/Img3.jpg",
      "/images/event1/Img4.jpg",
      "/images/event1/Img5.jpg",
    ],
  },
  {
    id: 2,
    title: "Her Hustle Hour",
    date: "May 21, 2025",
    images: [
      "/images/event2/Img1.jpg",
      "/images/event2/Img2.jpg",
      "/images/event2/Img3.jpg",
      "/images/event2/Img4.jpg",
      "/images/event2/Img5.jpg",
    ],
  },
  {
    id: 3,
    title: "Microsoft Learn Student Club Inaugration",
    date: "August 1, 2025",
    images: [
      "/images/event3/Img1.jpg",
      "/images/event3/Img2.jpeg",
      "/images/event3/Img3.jpeg",
      "/images/event3/Img4.jpeg",
      "/images/event3/Img5.jpeg",
    ],
  },
  {
    id: 4,
    title: "GIT, GitHub & VS Code Fundamentals",
    date: "August 21, 2025",
    images: [
      "/images/event4/Img1.jpg",
      "/images/event4/Img2.jpg",
      "/images/event4/Img3.jpg",
    ],
  },
  {
    id: 5,
    title: "Productivity with Microsoft 365 & Copilot",
    date: "August 26, 2025",
    images: [
      "/images/event5/Img1.jpg",
      "/images/event5/Img2.jpg",
      "/images/event5/Img3.jpg",
      "/images/event5/Img4.jpg",
      "/images/event5/Img5.jpg",
      "/images/event5/Img6.jpg",
    ],
  },
  {
    id: 6,
    title: "Launch of AIGNITE - Month of AI",
    date: "September 1, 2025",
    images: [
      "/images/event6/Img1.jpg",
      "/images/event6/Img2.jpg",
      "/images/event6/Img3.jpg",
      "/images/event6/Img4.jpg",
    ],
  },
  {
    id: 7,
    title: "AIGNITE - Intro to ML, DL, RL Concepts and Careers",
    date: "September 7, 2025",
    images: [
      "/images/event7/Img1.jpg",
      "/images/event7/Img2.jpg",
      "/images/event7/Img3.jpg",
      "/images/event7/Img4.jpg",
      "/images/event7/Img5.jpg",
    ],
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    title: string
    images: string[]
    currentIndex: number
  } | null>(null)

  const openImageViewer = (
    src: string,
    title: string,
    images: string[],
    currentIndex: number
  ) => {
    setSelectedImage({ src, title, images, currentIndex })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
                Our <span className="text-red-600">Gallery</span>
              </h1>
              <p className="text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
                Explore the memorable moments from our events, workshops, and
                community activities that showcase the vibrant spirit of MLSC
                MRUH.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Moments */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                Featured Moments
              </h2>
              <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
                Highlights from our most impactful events and activities
              </p>
            </motion.div>

            <MainCarousel images={mainCarouselImages} />
          </div>
        </section>

        {/* Event Galleries */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                Event Galleries
              </h2>
              <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
                Browse through our comprehensive collection of event photos
              </p>
            </motion.div>

            <div className="space-y-16">
              {[...eventGalleries].reverse().map((gallery, index) => (
                <EventGallery
                  key={gallery.id}
                  gallery={gallery}
                  index={index}
                  onImageClick={openImageViewer}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={(newIndex) =>
            setSelectedImage((prev) =>
              prev ? { ...prev, currentIndex: newIndex } : null
            )
          }
        />
      )}

    </div>
  )
}