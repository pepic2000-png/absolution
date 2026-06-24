import { useState, useEffect, useRef } from 'react'
import RingTimer from '../components/RingTimer'
import VariantCards from '../components/VariantCards'
import { sounds } from '../audio'

export default function BurnoutScreen({ exercise, config, muted, onFinish }) {
  const [variantIdx, setVariantIdx] = useState(0)
  const [seconds, setSeconds] = useState(config.burnoutDuration)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const secondsRef = useRef(config.burnoutDuration)
  const variantIdxRef = useRef(0)
  const doneRef = useRef(false)

  const variants = exercise.variants
  const currentVariant = variants[variantIdx]

  function playSound(fn) {
    if (!muted) fn()
  }

  useEffect(() => {
    playSound(sounds.burnoutStart)
  }, [])

  const advanceVariant = () => {
    const nextIdx = variantIdxRef.current + 1
    if (nextIdx >= variants.length || doneRef.current) {
      doneRef.current = true
      onFinish()
      return
    }
    variantIdxRef.current = nextIdx
    setVariantIdx(nextIdx)
    secondsRef.current = config.burnoutDuration
    setSeconds(config.burnoutDuration)
    playSound(sounds.variantChange)
  }

  useEffect(() => {
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

  return (
    <div
      className="min-h-screen flex flex-col screen-enter"
      style={{
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        background: 'linear-gradient(180deg, #fff5f2 0%, #fff 60%)',
      }}
    >
      {/* Burnout badge */}
      <div className="flex justify-center mb-3 mt-2">
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold text-red-600 uppercase tracking-wide">Burnout-Finisher</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 max-w-lg mx-auto w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{exercise.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{exercise.concept}</p>
        </div>

        <VariantCards variants={variants} activeIndex={variantIdx} />

        <div className="flex flex-col items-center my-6">
          <RingTimer
            seconds={seconds}
            total={config.burnoutDuration}
            level={currentVariant?.level}
          />
        </div>

        <div className="text-center mb-4">
          <div className="text-base font-semibold text-gray-800">{currentVariant?.name}</div>
          <div className="text-sm text-gray-500 mt-1">{currentVariant?.desc}</div>
        </div>

        <div className="rounded-xl px-4 py-3 text-sm font-bold text-center mb-6 bg-red-50 text-red-600">
          🔥 {currentVariant?.cue}
        </div>

        <div className="flex gap-3 mt-auto">
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
