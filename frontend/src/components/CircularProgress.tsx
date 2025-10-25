import React from 'react'

interface CircularProgressProps {
  value: number
  max: number
  color?: string
  label?: string
  size?: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  color = '#00C982',
  label = '',
  size = 80
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {Math.round(percentage)}
        </span>
        {label && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

export default CircularProgress
