import { useState, useMemo } from 'react'

const VARIANT_LABELS = ['Leicht', 'Mittel', 'Schwer', 'Maximum']

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  if (s === 0) return `${m}min`
  return `${m}min ${s}s`
}

export default function SetupScreen({ onStart }) {
  const [exerciseCount, setExerciseCount] = useState(4)
  const [variantCount, setVariantCount] = useState(3)
  const [variantDuration, setVariantDuration] = useState(30)
  const [pauseDuration, setPauseDuration] = useState(15)
  const [burnoutEnabled, setBurnoutEnabled] = useState(false)
  const [burnoutDuration, setBurnoutDuration] = useState(60)

  const summary = useMemo(() => {
    const workoutTime = exerciseCount * variantCount * variantDuration
    const pauseTime = (exerciseCount - 1) * pauseDuration
    const burnoutTime = burnoutEnabled ? burnoutDuration : 0
    const total = workoutTime + pauseTime + burnoutTime
    return { total, workoutTime, pauseTime, burnoutTime, sets: exerciseCount * variantCount }
  }, [exerciseCount, variantCount, variantDuration, pauseDuration, burnoutEnabled, burnoutDuration])

  function handleStart() {
    onStart({ exerciseCount, variantCount, variantDuration, pauseDuration, burnoutEnabled, burnoutDuration })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col screen-enter" style={{ paddingTop: 'max(24px, env(safe-area-inset-top))', paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
      <div className="flex-1 px-5 max-w-lg mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Core Workout</h1>
        <p className="text-gray-500 text-sm mb-8">Workout konfigurieren & starten</p>

        <div className="space-y-7">
          {/* Exercise count */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800">Anzahl Übungen</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setExerciseCount(v => Math.max(2, v - 1))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 active:bg-gray-200">−</button>
                <span className="w-6 text-center font-bold text-xl text-gray-900">{exerciseCount}</span>
                <button onClick={() => setExerciseCount(v => Math.min(8, v + 1))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 active:bg-gray-200">+</button>
              </div>
            </div>
          </div>

          {/* Variant count */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">Varianten pro Übung</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setVariantCount(v => Math.max(2, v - 1))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 active:bg-gray-200">−</button>
                <span className="w-6 text-center font-bold text-xl text-gray-900">{variantCount}</span>
                <button onClick={() => setVariantCount(v => Math.min(4, v + 1))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 active:bg-gray-200">+</button>
              </div>
            </div>
            <div className="flex gap-2">
              {VARIANT_LABELS.slice(0, variantCount).map((l, i) => (
                <span key={i} className={`text-xs px-2 py-1 rounded-full font-medium ${
                  i === 0 ? 'bg-green-100 text-green-700' :
                  i === 1 ? 'bg-blue-100 text-blue-700' :
                  i === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>{l}</span>
              ))}
            </div>
          </div>

          {/* Variant duration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">Sekunden pro Variante</span>
              <span className="font-bold text-xl text-gray-900">{variantDuration}s</span>
            </div>
            <input
              type="range" min={15} max={60} step={5}
              value={variantDuration}
              onChange={e => setVariantDuration(+e.target.value)}
              className="w-full accent-gray-800 h-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>15s</span><span>60s</span>
            </div>
          </div>

          {/* Pause duration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">Pause zwischen Übungen</span>
              <span className="font-bold text-xl text-gray-900">{pauseDuration}s</span>
            </div>
            <input
              type="range" min={5} max={30} step={5}
              value={pauseDuration}
              onChange={e => setPauseDuration(+e.target.value)}
              className="w-full accent-gray-800 h-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5s</span><span>30s</span>
            </div>
          </div>

          {/* Burnout toggle */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold text-gray-800">Burnout-Finisher</span>
                <span className="ml-2 text-lg">🔥</span>
              </div>
              <button
                onClick={() => setBurnoutEnabled(v => !v)}
                className={`relative w-12 h-7 rounded-full transition-colors ${burnoutEnabled ? 'bg-orange-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${burnoutEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {burnoutEnabled && (
              <div className="pl-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Burnout-Dauer</span>
                  <span className="font-bold text-gray-900">{burnoutDuration}s</span>
                </div>
                <input
                  type="range" min={30} max={120} step={10}
                  value={burnoutDuration}
                  onChange={e => setBurnoutDuration(+e.target.value)}
                  className="w-full accent-orange-500 h-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>30s</span><span>120s</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-5">
          <h2 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">Zusammenfassung</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3">
              <div className="text-2xl font-bold text-gray-900">{formatTime(summary.total)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Gesamtdauer</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-2xl font-bold text-gray-900">{exerciseCount}</div>
              <div className="text-xs text-gray-500 mt-0.5">Übungen</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-2xl font-bold text-gray-900">{summary.sets}</div>
              <div className="text-xs text-gray-500 mt-0.5">Sets gesamt</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-2xl font-bold text-gray-900">{formatTime(summary.pauseTime)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Pause gesamt</div>
            </div>
          </div>
          {burnoutEnabled && (
            <div className="mt-3 bg-orange-50 rounded-xl p-3 flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <div>
                <span className="font-semibold text-orange-700">Burnout-Finisher</span>
                <span className="text-orange-600 ml-2 text-sm">{formatTime(burnoutDuration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Start button */}
      <div className="px-5 pt-6 max-w-lg mx-auto w-full">
        <button
          onClick={handleStart}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90 transition-opacity"
        >
          Workout starten →
        </button>
      </div>
    </div>
  )
}
