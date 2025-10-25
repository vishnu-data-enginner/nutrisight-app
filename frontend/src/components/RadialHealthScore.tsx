import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface RadialHealthScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const RadialHealthScore: React.FC<RadialHealthScoreProps> = ({
  score,
  size = 120,
  strokeWidth = 8,
  className = ''
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className={`relative ${className}`}
    >
      <div style={{ width: size, height: size }}>
        <CircularProgressbar
          value={displayScore}
          text={`${displayScore}`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: '#e5e7eb',
            textSize: '24px',
            fontWeight: 'bold',
            strokeWidth: strokeWidth,
          })}
        />
      </div>
      
      {/* Score label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="text-sm font-medium text-gray-600">{label}</div>
        <div className="text-xs text-gray-500">Health Score</div>
      </motion.div>

      {/* Animated rings */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute inset-0 rounded-full border-2 border-current"
        style={{ color }}
      />
    </motion.div>
  );
};

export default RadialHealthScore;


