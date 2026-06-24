const COLORS = {
  easy:    { bg: '#639922', light: '#f0f7e6', text: '#639922', label: 'Leicht' },
  medium:  { bg: '#378ADD', light: '#e8f2fc', text: '#378ADD', label: 'Mittel' },
  hard:    { bg: '#D85A30', light: '#fdf0ea', text: '#D85A30', label: 'Schwer' },
  maximum: { bg: '#7F77DD', light: '#f0eff9', text: '#7F77DD', label: 'Maximum' },
}

export default function VariantCards({ variants, activeIndex }) {
  return (
    <div className="flex gap-2 w-full overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {variants.map((v, i) => {
        const c = COLORS[v.level] || COLORS.easy
        const isActive = i === activeIndex
        const isDone = i < activeIndex

        return (
          <div
            key={i}
            className="flex-1 min-w-0 rounded-xl px-3 py-2.5 transition-all duration-300"
            style={{
              backgroundColor: isActive ? c.light : isDone ? '#f8f8f8' : '#fafafa',
              border: `2px solid ${isActive ? c.bg : isDone ? '#e0e0e0' : '#ebebeb'}`,
              opacity: isDone ? 0.45 : 1,
            }}
          >
            <div
              className="text-xs font-bold mb-0.5"
              style={{ color: isActive ? c.text : isDone ? '#aaa' : '#ccc' }}
            >
              {c.label}
            </div>
            <div
              className="text-xs leading-tight"
              style={{ color: isActive ? '#333' : '#999', fontWeight: isActive ? 500 : 400 }}
            >
              {v.name}
            </div>
            {isDone && <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>✓</div>}
          </div>
        )
      })}
    </div>
  )
}
