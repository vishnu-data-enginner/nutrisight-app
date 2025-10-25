import React from 'react'

interface NutriSightLogoProps {
  size?: number
  className?: string
}

const NutriSightLogo: React.FC<NutriSightLogoProps> = ({ size = 48, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Magnifying Glass */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Magnifying Glass Circle */}
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="#16a34a"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Magnifying Glass Handle */}
          <path
            d="M32 32L40 40"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Carrot */}
          <g transform="translate(12, 8)">
            {/* Carrot Body */}
            <ellipse
              cx="8"
              cy="16"
              rx="3"
              ry="8"
              fill="#22c55e"
            />
            
            {/* Carrot Texture Lines */}
            <line x1="6" y1="12" x2="10" y2="12" stroke="#16a34a" strokeWidth="1" />
            <line x1="6" y1="16" x2="10" y2="16" stroke="#16a34a" strokeWidth="1" />
            <line x1="6" y1="20" x2="10" y2="20" stroke="#16a34a" strokeWidth="1" />
            
            {/* Carrot Leaves */}
            <path
              d="M8 8 L6 4 L8 2 L10 4 Z"
              fill="#22c55e"
            />
            <path
              d="M8 8 L10 4 L12 6 L10 8 Z"
              fill="#22c55e"
            />
            <path
              d="M8 8 L6 4 L4 6 L6 8 Z"
              fill="#22c55e"
            />
          </g>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div>
        <h1 className="text-xl font-bold text-green-700">
          NutriSight
        </h1>
        <p className="text-xs text-green-600">
          Intelligent Insight
        </p>
      </div>
    </div>
  )
}

export default NutriSightLogo

