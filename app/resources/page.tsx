"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ResourceCard from "@/components/resources/resource-card"

/* --- KEEP YOUR EXISTING resources ARRAY AS-IS --- */
const resources = [
  {
    id: 1,
    title: "Microsoft Azure",
    description:
      "Cloud computing platform with comprehensive services for building, deploying, and managing applications.",
    image: "../images/Resources/Azure.png",
    category: "Cloud Platform",
    color: "blue",
  },
  {
    id: 2,
    title: "Microsoft Learn",
    description: "Free online learning platform with hands‑on tutorials, documentation, and certification paths.",
    image: "../images/Resources/Learn.png",
    link: "https://learn.microsoft.com/",
    category: "Learning Platform",
    color: "green",
  },
  {
    id: 3,
    title: "Visual Studio Code",
    description:
      "Lightweight but powerful source code editor with rich ecosystem of extensions and tools.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-k4ew6quRgirtKondE8cs4WeuW1U4KKYL5w&s",
    link: "https://code.visualstudio.com/",
    category: "Development Tool",
    color: "red",
  },
  {
    id: 4,
    title: "GitHub Codespaces",
    description:
      "Cloud‑based development environment that provides instant access to VS Code in the browser.",
    image: "data:image/jpeg;base64,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",
    link: "https://github.com/features/codespaces",
    category: "Development Environment",
    color: "yellow",
  },
  {
    id: 5,
    title: "Microsoft 365",
    description:
      "Productivity suite including Office apps, cloud storage, and collaboration tools.",
    image: "data:image/jpeg;base64,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",
    link: "https://www.microsoft.com/microsoft-365",
    category: "Productivity Suite",
    color: "blue",
  },
  {
    id: 6,
    title: "Power Platform",
    description:
      "Low‑code platform for building apps, automating workflows, and analyzing data with AI.",
    image: "data:image/png;base64,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",
    link: "https://powerplatform.microsoft.com/",
    category: "Low‑Code Platform",
    color: "green",
  },
  {
    id: 7,
    title: "Azure DevOps",
    description:
      "Complete DevOps toolchain for planning, developing, testing, and deploying applications.",
    image: "data:image/png;base64,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",
    link: "https://azure.microsoft.com/services/devops/",
    category: "DevOps Platform",
    color: "red",
  },
  {
    id: 8,
    title: "Microsoft Copilot",
    description:
      "AI‑powered assistant that helps with coding, writing, and productivity across Microsoft tools.",
    image: "data:image/png;base64,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",
    link: "https://copilot.microsoft.com/",
    category: "AI Assistant",
    color: "yellow",
  },
  {
    id: 9,
    title: "Azure AI Services",
    description:
      "Pre‑built AI models and APIs for vision, speech, language, and decision‑making capabilities.",
    image: "data:image/png;base64,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",
    link: "https://azure.microsoft.com/products/ai-services/",
    category: "AI Platform",
    color: "blue",
  },
]

const categories = [
  "All",
  "Cloud Platform",
  "Learning Platform",
  "Development Tool",
  "Development Environment",
  "Productivity Suite",
  "Low‑Code Platform",
  "DevOps Platform",
  "AI Assistant",
  "AI Platform",
]
/* --- KEEP YOUR EXISTING categories ARRAY AS-IS --- */

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filtered =
    selectedCategory === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        {/* HERO */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Learning <span className="text-primary">Resources</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover Microsoft tools, platforms, and learning materials curated
              for students and developers.
            </p>
          </motion.div>
        </section>

        {/* FILTERS */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
                const active = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${
                        active
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-card text-foreground border border-border hover:bg-muted"
                      }
                    `}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                {selectedCategory === "All"
                  ? "All Resources"
                  : selectedCategory}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {filtered.length} resource
                {filtered.length !== 1 && "s"} available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
