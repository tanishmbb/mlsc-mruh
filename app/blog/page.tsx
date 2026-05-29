"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Clock, Sparkles } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-16">
        {/* HERO */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                MLSC <span className="text-primary">Blog</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Insights, tutorials, and stories from our tech community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-3xl p-12 shadow-xl"
            >
              {/* ICON */}
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-12 h-12 text-primary-foreground" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Coming Soon
              </h2>

              <p className="text-lg text-muted-foreground mb-12">
                We’re preparing high-quality content including tutorials,
                event highlights, student spotlights, and industry insights.
              </p>

              {/* FEATURES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: Calendar,
                    title: "Tech Tutorials",
                    desc: "Step-by-step guides and coding walkthroughs",
                  },
                  {
                    icon: Clock,
                    title: "Event Stories",
                    desc: "Behind-the-scenes from MLSC events",
                  },
                  {
                    icon: Sparkles,
                    title: "Student Spotlights",
                    desc: "Featuring our amazing members",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-background border border-border rounded-2xl p-6 shadow-sm"
                  >
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOT NOTE */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-muted/40 border border-border rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Want updates?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media to know when the blog launches.
                </p>

                <div className="flex justify-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  )
}
