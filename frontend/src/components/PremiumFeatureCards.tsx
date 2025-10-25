import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, Zap, TrendingUp, CheckCircle, Clock, Target } from 'lucide-react'

const PremiumFeatureCards: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Research Engine',
      description: 'Analyzes 10,000+ studies to validate every recommendation with clinical precision.',
      data: '10,000+ studies analyzed',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      progress: 100,
      metric: 'Studies'
    },
    {
      icon: Heart,
      title: 'Personalized Insights',
      description: 'Tailored recommendations based on your health profile and dietary goals.',
      data: '98% accuracy rate',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      progress: 98,
      metric: 'Accuracy'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive health insights in just 3 seconds with medical-grade accuracy.',
      data: '3-second scan time',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      progress: 100,
      metric: 'Speed'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Science-Driven
            <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              Nutrition Intelligence
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Advanced AI technology meets clinical research for personalized nutrition insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)'
              }}
              className={`group ${feature.bgColor} border-2 ${feature.borderColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
            >
              {/* Gradient Shadow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Real Data Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{feature.data}</span>
                  <span className="text-sm font-bold text-emerald-600">{feature.progress}%</span>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${feature.progress}%` }}
                    transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                  />
                </div>

                {/* Metric Badge */}
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-slate-500" />
                  <span className="text-xs text-slate-500">{feature.metric} Performance</span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: TrendingUp, label: 'Clinical Studies', value: '10,000+', color: 'emerald' },
            { icon: Clock, label: 'Average Scan Time', value: '3.2s', color: 'sky' },
            { icon: CheckCircle, label: 'Accuracy Rate', value: '98.5%', color: 'emerald' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-emerald-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumFeatureCards
