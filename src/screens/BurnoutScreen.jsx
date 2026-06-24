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
      if (!doneRef.current) { doneRef.current = true; onFinish() }
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
      className="flex flex-col screen-enter"
      style={{
        height: '100dvh',
        paddingTop: 'max(14px, env(safe-area-inset-top))',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        background: 'linear-gradient(180deg, #fff5f2 0%, #fff 60%)',
      }}
    >
      {/* Badge */}
      <div className="flex justify-center mb-2 mt-1 flex-shrink-0">
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5">
          <span className="text-base">🔥</span>
          <span className="text-sm font-bold text-red-600 uppercase tracking-wide">Burnout-Finisher</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 min-h-0">
        <div className="flex-shrink-0 mb-2">
          <h1 className="text-xl font-bold text-gray-900">{exercise.name}</h1>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{exercise.concept}</p>
        </div>

        <div className="flex-shrink-0 mb-3">
          <VariantCards variants={variants} activeIndex={variantIdx} />
        </div>

        <div className="flex justify-center flex-shrink-0 mb-2">
          <RingTimer seconds={seconds} total={config.burnoutDuration} level={currentVariant?.level} />
        </div>

        <div className="text-center flex-shrink-0 mb-2">
          <div className="text-sm font-semibold text-gray-800">{currentVariant?.name}</div>
          <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{currentVariant?.desc}</div>
        </div>

        <div className="rounded-xl px-4 py-2.5 text-sm font-bold text-center flex-shrink-0 mb-3 bg-red-50 text-red-600 line-clamp-2">
          🔥 {currentVariant?.cue}
        </div>

        <div className="flex gap-3 mt-auto flex-shrink-0">
          <button onClick={togglePause} className="flex-1 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-800 active:bg-gray-200">
            {paused ? '▶ Weiter' : '⏸ Pause'}
          </button>
          <button onClick={skip} className="px-6 py-4 rounded-2xl font-semibold text-base bg-gray-100 text-gray-500 active:bg-gray-200">
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}
