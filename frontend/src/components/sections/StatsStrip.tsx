import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Search, BookOpen, Target } from 'lucide-react'

const StatsStrip: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: 50000,
      suffix: "+",
      label: "Active Users",
      color: "text-emerald-400"
    },
    {
      icon: <Search className="w-8 h-8" />,
      number: 250000,
      suffix: "+",
      label: "Products Scanned",
      color: "text-cyan-400"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: 10000,
      suffix: "+",
      label: "Research Papers",
      color: "text-purple-400"
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: 98,
      suffix: "%",
      label: "Accuracy Rate",
      color: "text-amber-400"
    }
  ]

  const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isInView) return

      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return <span>{count.toLocaleString()}</span>
  }

  return (
    <section className="py-16 px-6 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                <Counter end={stat.number} />
                <span className="text-emerald-400">{stat.suffix}</span>
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsStrip
