import { useState, useEffect, useCallback, useRef } from 'react'
import { sounds } from '../audio'

const VARIANT_COLORS = {
  easy:    { stroke: '#639922', bg: '#f0f7e6', text: '#639922', label: 'Leicht' },
  medium:  { stroke: '#378ADD', bg: '#e8f2fc', text: '#378ADD', label: 'Mittel' },
  hard:    { stroke: '#D85A30', bg: '#fdf0ea', text: '#D85A30', label: 'Schwer' },
  maximum: { stroke: '#7F77DD', bg: '#f0eff9', text: '#7F77DD', label: 'Maximum' },
  weighted:{ stroke: '#7F77DD', bg: '#f0eff9', text: '#7F77DD', label: 'Gewicht' },
}

function getYouTubeId(url) {
  const m = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return m ? m[1] : null
}

function CompactRingTimer({ seconds, total, color }) {
  const size = 96
  const sw = 7
  const r = (size - sw) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - (total > 0 ? seconds / total : 0))
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e5e5" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s linear' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold tabular-nums" style={{ color }}>{seconds}</span>
      </div>
    </div>
  )
}

export default function WorkoutScreen({
  exercise, exerciseIndex, totalExercises, config, muted, onFinish, media = {}
}) {
  const [variantIdx, setVariantIdx] = useState(0)
  const [seconds, setSeconds] = useState(config.variantDuration)
  const [paused, setPaused] = useState(false)
  const [isLandscape, setIsLandscape] = useState(
    () => window.matchMedia('(orientation: landscape)').matches
  )
  const pausedRef = useRef(false)
  const secondsRef = useRef(config.variantDuration)
  const variantIdxRef = useRef(0)
  const doneRef = useRef(false)

  const variants = exercise.variants
  const currentVariant = variants[variantIdx]
  const c = VARIANT_COLORS[currentVariant?.level] || VARIANT_COLORS.easy
  const exerciseMedia = media[exercise.id]
  const ytId = exerciseMedia?.type === 'youtube' ? getYouTubeId(exerciseMedia.url) : null

  useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)')
    const handler = e => setIsLandscape(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function playSound(fn) { if (!muted) fn() }

  const advanceVariant = useCallback(() => {
    const nextIdx = variantIdxRef.current + 1
    if (nextIdx >= variants.length || doneRef.current) {
      if (!doneRef.current) { doneRef.current = true; onFinish() }
      return
    }
    variantIdxRef.current = nextIdx
    setVariantIdx(nextIdx)
    secondsRef.current = config.variantDuration
    setSeconds(config.variantDuration)
    playSound(sounds.variantChange)
  }, [variants.length, config.variantDuration, onFinish, muted])

  useEffect(() => {
    playSound(sounds.variantStart)
    const interval = setInterval(() => {
      if (pausedRef.current) return
      const next = secondsRef.current - 1
      secondsRef.current = next
      setSeconds(next)
      if (next <= 3 && next > 0) playSound(sounds.countdownBeep)
      if (next <= 0) advanceVariant()
    }, 1000)
    return () => clearInterval(interval)
  }, [variantIdx])

  function togglePause() { pausedRef.current = !pausedRef.current; setPaused(p => !p) }
  function skip() { secondsRef.current = 0; advanceVariant() }

  const progress = (exerciseIndex + variantIdx / variants.length) / totalExercises

  // Video embed (always visible, muted autoplay loop for demo)
  const videoEmbed = ytId ? (
    <iframe
      key={ytId}
      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&playsinline=1&controls=0&modestbranding=1&rel=0`}
      className="w-full h-full"
      allow="autoplay; fullscreen"
      allowFullScreen
      style={{ border: 'none' }}
    />
  ) : exerciseMedia?.url ? (
    <video src={exerciseMedia.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
  ) : null

  // Info panel content (shared between layouts)
  const infoPanel = (
    <div className="flex flex-col h-full">
      {/* Exercise title */}
      <div className="mb-2 flex-shrink-0">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Übung {exerciseIndex + 1} / {totalExercises}
        </div>
        <h1 className="text-lg font-bold text-gray-900 leading-tight">{exercise.name}</h1>
      </div>

      {/* Variant chips */}
      {variants.length > 1 && (
        <div className="flex gap-1.5 flex-wrap mb-2 flex-shrink-0">
          {variants.map((v, i) => {
            const vc = VARIANT_COLORS[v.level] || VARIANT_COLORS.easy
            const isActive = i === variantIdx
            const isDone = i < variantIdx
            return (
              <div key={i} className="px-2 py-1 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: isActive ? vc.bg : isDone ? '#f0f0f0' : '#f8f8f8',
                  color: isActive ? vc.text : isDone ? '#bbb' : '#ccc',
                  border: `1.5px solid ${isActive ? vc.stroke : isDone ? '#e0e0e0' : '#ebebeb'}`,
                }}>
                {isDone ? '✓ ' : ''}{vc.label}
              </div>
            )
          })}
        </div>
      )}

      {/* Timer + current variant */}
      <div className="flex items-center gap-3 mb-2 flex-shrink-0">
        <CompactRingTimer seconds={seconds} total={config.variantDuration} color={c.stroke} />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm leading-tight">{currentVariant?.name}</div>
          <div className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-3">{currentVariant?.desc}</div>
        </div>
      </div>

      {/* Coaching cue */}
      <div className="rounded-xl px-3 py-2 text-xs font-medium flex-shrink-0 mb-3 line-clamp-2"
        style={{ backgroundColor: `${c.stroke}18`, color: c.stroke }}>
        💬 {currentVariant?.cue}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-auto flex-shrink-0">
        <button onClick={togglePause}
          className="flex-1 py-3.5 rounded-2xl font-semibold text-sm bg-gray-100 text-gray-800 active:bg-gray-200">
          {paused ? '▶ Weiter' : '⏸ Pause'}
        </button>
        <button onClick={skip}
          className="px-5 py-3.5 rounded-2xl font-semibold text-sm bg-gray-100 text-gray-500 active:bg-gray-200">
          Skip →
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-white screen-enter overflow-hidden"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 flex-shrink-0" style={{ margin: '0' }}>
        <div className="h-1 transition-all duration-500"
          style={{ width: `${progress * 100}%`, backgroundColor: c.stroke }} />
      </div>

      {isLandscape ? (
        /* ── LANDSCAPE: video left, content right ── */
        <div className="flex flex-1 min-h-0">
          {/* Video half */}
          <div className="flex-1 bg-black relative flex items-center justify-center"
            style={{ paddingLeft: 'env(safe-area-inset-left)' }}>
            {videoEmbed ? (
              <div className="w-full h-full">{videoEmbed}</div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
                <div className="text-5xl opacity-20">🎬</div>
                <div className="text-xs text-gray-500 opacity-60">Kein Video</div>
              </div>
            )}
            {/* Pause overlay */}
            {paused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-4xl font-bold">⏸</div>
              </div>
            )}
          </div>

          {/* Content half */}
          <div className="flex flex-col bg-white overflow-y-auto"
            style={{
              width: 'min(420px, 42vw)',
              minWidth: '280px',
              padding: '16px 20px',
              paddingRight: 'max(20px, env(safe-area-inset-right))',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            }}>
            {infoPanel}
          </div>
        </div>
      ) : (
        /* ── PORTRAIT: video top, content below ── */
        <div className="flex flex-col flex-1 min-h-0"
          style={{
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          }}>
          {/* Video block */}
          <div className="bg-black flex-shrink-0 relative flex items-center justify-center"
            style={{ aspectRatio: '16/9', maxHeight: '38vh' }}>
            {videoEmbed ? (
              <div className="w-full h-full">{videoEmbed}</div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                <div className="text-5xl opacity-20">🎬</div>
                <div className="text-xs text-gray-500 opacity-60">Kein Video</div>
              </div>
            )}
            {paused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-4xl font-bold">⏸</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pt-3 min-h-0">
            {infoPanel}
          </div>
        </div>
      )}
    </div>
  )
}
