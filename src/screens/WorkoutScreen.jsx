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

  const variants = exercise.variants
  const currentVariant = variants[variantIdx]
  const color = VARIANT_COLORS[currentVariant?.level] || '#639922'

  const playSound = useCallback((fn) => {
    if (!muted) fn()
  }, [muted])

  const advanceVariant = useCallback(() => {
    const nextIdx = variantIdxRef.current + 1
    if (nextIdx >= variants.length) {
      onFinish()
      return
    }
    variantIdxRef.current = nextIdx
    setVariantIdx(nextIdx)
    secondsRef.current = config.variantDuration
    setSeconds(config.variantDuration)
    playSound(sounds.variantChange)
  }, [variants.length, config.variantDuration, onFinish, playSound])

  // Timer tick
  useEffect(() => {
    playSound(sounds.variantStart)

    const interval = setInterval(() => {
      if (pausedRef.current) return
      const next = secondsRef.current - 1
      secondsRef.current = next
      setSeconds(next)

      if (next <= 3 && next > 0) {
        playSound(sounds.countdownBeep)
      }
      if (next <= 0) {
        advanceVariant()
      }
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

  const progress = (exerciseIndex + (variantIdx / variants.length)) / totalExercises

  return (
    <div
      className="min-h-screen flex flex-col screen-enter"
      style={{
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 mx-5 rounded-full mb-4">
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${progress * 100}%`, backgroundColor: color }}
        />
      </div>

      <div className="flex-1 flex flex-col px-5 max-w-lg mx-auto w-full">
        {/* Exercise header */}
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            Übung {exerciseIndex + 1} / {totalExercises}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{exercise.name}</h1>
          <p className="text-sm text-gray-500 mt-1 leading-snug">{exercise.concept}</p>
        </div>

        {/* Variant cards */}
        <VariantCards variants={variants} activeIndex={variantIdx} />

        {/* Timer */}
        <div className="flex flex-col items-center my-6">
          <RingTimer
            seconds={seconds}
            total={config.variantDuration}
            level={currentVariant?.level}
          />
        </div>

        {/* Current variant info */}
        <div className="text-center mb-4">
          <div className="text-base font-semibold text-gray-800">{currentVariant?.name}</div>
          <div className="text-sm text-gray-500 mt-1 leading-snug">{currentVariant?.desc}</div>
        </div>

        {/* Coaching cue */}
        <div
          className="rounded-xl px-4 py-3 text-sm font-medium text-center mb-6"
          style={{ backgroundColor: `${color}15`, color }}
        >
          💬 {currentVariant?.cue}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={togglePause}
            className="flex-1 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-800 active:bg-gray-200 transition-colors"
          >
            {paused ? '▶ Weiter' : '⏸ Pause'}
          </button>
          <button
            onClick={skip}
            className="px-6 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-500 active:bg-gray-200 transition-colors"
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}
