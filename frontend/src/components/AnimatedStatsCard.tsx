import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  delay?: number;
  suffix?: string;
  maxValue?: number;
}

const AnimatedStatsCard: React.FC<AnimatedStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  delay = 0,
  suffix = '',
  maxValue
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number') {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, delay * 100);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: 'from-emerald-500 to-emerald-600 bg-emerald-100 text-emerald-600',
      blue: 'from-blue-500 to-blue-600 bg-blue-100 text-blue-600',
      purple: 'from-purple-500 to-purple-600 bg-purple-100 text-purple-600',
      red: 'from-red-500 to-red-600 bg-red-100 text-red-600',
      yellow: 'from-yellow-500 to-yellow-600 bg-yellow-100 text-yellow-600',
      teal: 'from-teal-500 to-teal-600 bg-teal-100 text-teal-600'
    };
    return colorMap[color] || colorMap.emerald;
  };

  const colorClasses = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay * 0.1 + 0.2, type: "spring", stiffness: 200 }}
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]}`}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay * 0.1 + 0.3 }}
              className="text-sm font-medium text-gray-600 mb-1"
            >
              {title}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay * 0.1 + 0.4 }}
              className={`text-2xl font-bold ${colorClasses.split(' ')[3]}`}
            >
              {typeof value === 'number' ? displayValue : value}{suffix}
              {maxValue && typeof value === 'number' && (
                <span className="text-sm font-normal text-gray-500">/{maxValue}</span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Progress bar for numeric values with max */}
        {maxValue && typeof value === 'number' && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: delay * 0.1 + 0.5, duration: 0.8 }}
            className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(value / maxValue) * 100}%` }}
              transition={{ delay: delay * 0.1 + 0.7, duration: 1 }}
              className={`h-full bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} rounded-full`}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedStatsCard;


