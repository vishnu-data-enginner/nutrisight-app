import React from 'react'

interface ProgressBarProps {
  value: number
  max: number
  color?: string
  label?: string
  height?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = '#00C982',
  label = '',
  height = 8
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div 
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
