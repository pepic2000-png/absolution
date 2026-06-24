const VARIANT_COLORS = {
  easy: '#639922',
  medium: '#378ADD',
  hard: '#D85A30',
  maximum: '#7F77DD',
}

export default function RingTimer({ seconds, total, level }) {
  const size = 180
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? seconds / total : 0
  const offset = circumference * (1 - progress)
  const color = VARIANT_COLORS[level] || '#639922'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s linear, stroke 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-5xl font-bold tabular-nums"
          style={{ color }}
        >
          {seconds}
        </span>
      </div>
    </div>
  )
}
