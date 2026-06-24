import { useEffect } from 'react'
import { sounds } from '../audio'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  if (s === 0) return `${m}min`
  return `${m}min ${s}s`
}

export default function DoneScreen({ exercises, config, burnoutDone, onReset }) {
  useEffect(() => {
    sounds.fanfare()
  }, [])

  const totalSets = exercises.length * config.variantCount
  const workoutTime = exercises.length * config.variantCount * config.variantDuration
  const pauseTime = Math.max(0, exercises.length - 1) * config.pauseDuration
  const burnoutTime = burnoutDone ? config.burnoutDuration : 0
  const total = workoutTime + pauseTime + burnoutTime

  return (
    <div
      className="min-h-screen flex flex-col screen-enter"
      style={{
        paddingTop: 'max(24px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex-1 flex flex-col px-5 max-w-lg mx-auto w-full">
        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Geschafft!</h1>
          <p className="text-gray-500">Starke Arbeit — das war ein solides Core-Workout.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-gray-900">{exercises.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Übungen</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-gray-900">{totalSets}</div>
            <div className="text-xs text-gray-500 mt-0.5">Sets</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gray-900">{formatTime(total)}</div>
            <div className="text-xs text-gray-500 mt-0.5">Gesamtzeit</div>
          </div>
        </div>

        {/* Exercise list */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Absolvierte Übungen</h2>
          <div className="space-y-2">
            {exercises.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="font-medium text-gray-800">{ex.name}</span>
                <span className="ml-auto text-xs text-gray-400">{ex.variants.length} Var.</span>
              </div>
            ))}
            {burnoutDone && (
              <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-4 py-3">
                <span className="text-lg">🔥</span>
                <span className="font-medium text-orange-700">Burnout-Finisher</span>
                <span className="ml-auto text-xs text-orange-500">{formatTime(config.burnoutDuration)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 max-w-lg mx-auto w-full">
        <button
          onClick={onReset}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90"
        >
          Neues Workout
        </button>
      </div>
    </div>
  )
}
