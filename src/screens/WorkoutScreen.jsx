import { useState, useEffect, useCallback, useRef } from 'react'
import RingTimer from '../components/RingTimer'
import VariantCards from '../components/VariantCards'
import { sounds } from '../audio'

const VARIANT_COLORS = {
  easy: '#639922',
  medium: '#378ADD',
  hard: '#D85A30',
  maximum: '#7F77DD',
}

export default function WorkoutScreen({
  exercise, exerciseIndex, totalExercises, config, muted, onFinish
}) {
  const [variantIdx, setVariantIdx] = useState(0)
  const [seconds, setSeconds] = useState(config.variantDuration)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const secondsRef = useRef(config.variantDuration)
  const variantIdxRef = useRef(0)
  const doneRef = useRef(false)

  const variants = exercise.variants
  const currentVariant = variants[variantIdx]
  const color = VARIANT_COLORS[currentVariant?.level] || '#639922'

  function playSound(fn) {
    if (!muted) fn()
  }

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

  function togglePause() {
    pausedRef.current = !pausedRef.current
    setPaused(p => !p)
  }

  function skip() {
    secondsRef.current = 0
    advanceVariant()
  }

  const progress = (exerciseIndex + variantIdx / variants.length) / totalExercises

  return (
    <div
      className="flex flex-col screen-enter"
      style={{
        height: '100dvh',
        paddingTop: 'max(14px, env(safe-area-inset-top))',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 mx-5 rounded-full mb-3 flex-shrink-0">
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${progress * 100}%`, backgroundColor: color }}
        />
      </div>

      <div className="flex-1 flex flex-col px-5 min-h-0">
        {/* Header */}
        <div className="flex-shrink-0 mb-2">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Übung {exerciseIndex + 1} / {totalExercises}
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{exercise.name}</h1>
          <p className="text-xs text-gray-500 leading-snug mt-0.5 line-clamp-2">{exercise.concept}</p>
        </div>

        {/* Variant cards */}
        <div className="flex-shrink-0 mb-3">
          <VariantCards variants={variants} activeIndex={variantIdx} />
        </div>

        {/* Timer */}
        <div className="flex justify-center flex-shrink-0 mb-2">
          <RingTimer seconds={seconds} total={config.variantDuration} level={currentVariant?.level} />
        </div>

        {/* Current variant */}
        <div className="text-center flex-shrink-0 mb-2">
          <div className="text-sm font-semibold text-gray-800">{currentVariant?.name}</div>
          <div className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">{currentVariant?.desc}</div>
        </div>

        {/* Coaching cue */}
        <div
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-center flex-shrink-0 mb-3 line-clamp-2"
          style={{ backgroundColor: `${color}18`, color }}
        >
          💬 {currentVariant?.cue}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-auto flex-shrink-0">
          <button
            onClick={togglePause}
            className="flex-1 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-800 active:bg-gray-200"
          >
            {paused ? '▶ Weiter' : '⏸ Pause'}
          </button>
          <button
            onClick={skip}
            className="px-6 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-500 active:bg-gray-200"
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}
