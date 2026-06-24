import { useState, useEffect, useRef } from 'react'
import { sounds } from '../audio'

export default function PauseScreen({ duration, nextExercise, config, muted, onResume }) {
  const [seconds, setSeconds] = useState(duration)
  const secondsRef = useRef(duration)
  const doneRef = useRef(false)

  function playSound(fn) {
    if (!muted) fn()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const next = secondsRef.current - 1
      secondsRef.current = next
      setSeconds(next)
      if (next <= 3 && next > 0) playSound(sounds.countdownBeep)
      if (next <= 0 && !doneRef.current) {
        doneRef.current = true
        onResume()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const variants = nextExercise?.variants || []

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 screen-enter"
      style={{
        paddingTop: 'max(24px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="max-w-lg w-full text-center">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Pause</div>

        {/* Big countdown */}
        <div className="text-8xl font-bold text-gray-900 tabular-nums mb-2">{seconds}</div>
        <div className="text-gray-400 text-sm mb-10">Sekunden bis zur nächsten Übung</div>

        {/* Next exercise preview */}
        {nextExercise && (
          <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Nächste Übung</div>
            <div className="text-xl font-bold text-gray-900 mb-1">{nextExercise.name}</div>
            <div className="text-sm text-gray-500 mb-3">{nextExercise.concept}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span className="bg-white rounded-lg px-3 py-1.5 border border-gray-200">
                {variants.length} Variante{variants.length !== 1 ? 'n' : ''}
              </span>
              <span className="bg-white rounded-lg px-3 py-1.5 border border-gray-200">
                {variants.length * config.variantDuration}s gesamt
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onResume}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90"
        >
          Jetzt weiter →
        </button>
      </div>
    </div>
  )
}
