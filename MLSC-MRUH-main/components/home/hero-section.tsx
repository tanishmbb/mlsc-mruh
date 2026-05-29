import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Code } from "lucide-react"

export default function HeroSection() {
  const router = useRouter()

  const handleJoinCommunity = () => {
    router.push("/contact")
  }

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about-section")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-600 rounded-lg rotate-12"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-purple-600 rounded-lg -rotate-12"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 bg-emerald-600 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-18 h-18 bg-amber-600 rounded-lg -rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 font-display">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              MLSC MRUH
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-4xl mx-auto leading-relaxed font-body">
            Microsoft Learn Student Chapter at Malla Reddy University
          </p>

          <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-3xl mx-auto leading-relaxed font-body">
            Where innovation meets collaboration, and students transform into tomorrow's tech leaders through hands-on
            learning and community building.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              onClick={handleJoinCommunity}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover-lift shadow-lg btn-shimmer font-display"
            >
              Join Our Community
              <ArrowRight className="ml-2" size={20} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleLearnMore}
              className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 bg-card/80 backdrop-blur-sm hover-glow font-display"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 card-hover">
              <Users className="w-12 h-12 text-blue-600 mb-3" />
              <h3 className="text-2xl font-bold text-slate-900 font-display">200+</h3>
              <p className="text-slate-600 font-body">Active Members</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 card-hover">
              <Code className="w-12 h-12 text-emerald-600 mb-3" />
              <h3 className="text-2xl font-bold text-slate-900 font-display">2+</h3>
              <p className="text-slate-600 font-body">Tech Events</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 card-hover">
              <Users className="w-12 h-12 text-indigo-600 mb-3" />
              <h3 className="text-2xl font-bold text-slate-900 font-display">#1</h3>
              <p className="text-slate-600 font-body">Biggest Club in the University</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
