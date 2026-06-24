import { useState, useMemo } from 'react'
import { unlockAudio, setVolume, getVolume } from '../audio'

const LEVELS = [
  { key: 'easy',    label: 'Leicht',  color: '#639922', bg: '#f0f7e6' },
  { key: 'medium',  label: 'Mittel',  color: '#378ADD', bg: '#e8f2fc' },
  { key: 'hard',    label: 'Schwer',  color: '#D85A30', bg: '#fdf0ea' },
  { key: 'maximum', label: 'Maximum', color: '#7F77DD', bg: '#f0eff9' },
]

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  if (s === 0) return `${m}min`
  return `${m}min ${s}s`
}

function Stepper({ value, min, max, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 active:bg-gray-200 select-none"
      >−</button>
      <span className="w-7 text-center font-bold text-xl text-gray-900 tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 active:bg-gray-200 select-none"
      >+</button>
    </div>
  )
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className="relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: on ? '#f97316' : '#d1d5db' }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: on ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  )
}

export default function SetupScreen({ onStart }) {
  const [exerciseCount, setExerciseCount] = useState(4)
  const [variantDuration, setVariantDuration] = useState(30)
  const [pauseDuration, setPauseDuration] = useState(15)
  const [burnoutEnabled, setBurnoutEnabled] = useState(false)
  const [burnoutDuration, setBurnoutDuration] = useState(60)
  const [selectedLevels, setSelectedLevels] = useState(['easy', 'medium', 'hard'])
  const [vol, setVol] = useState(getVolume())

  function toggleLevel(key) {
    setSelectedLevels(prev => {
      if (prev.includes(key)) {
        if (prev.length <= 1) return prev // at least 1
        return prev.filter(k => k !== key)
      }
      return [...prev, key]
    })
  }

  function handleVolumeChange(v) {
    setVol(v)
    setVolume(v)
  }

  const variantCount = selectedLevels.length

  const summary = useMemo(() => {
    const workoutTime = exerciseCount * variantCount * variantDuration
    const pauseTime = (exerciseCount - 1) * pauseDuration
    const burnoutTime = burnoutEnabled ? burnoutDuration * variantCount : 0
    const total = workoutTime + pauseTime + burnoutTime
    return { total, sets: exerciseCount * variantCount }
  }, [exerciseCount, variantCount, variantDuration, pauseDuration, burnoutEnabled, burnoutDuration])

  function handleStart() {
    unlockAudio()
    onStart({
      exerciseCount,
      variantDuration,
      pauseDuration,
      burnoutEnabled,
      burnoutDuration,
      selectedLevels,
    })
  }

  return (
    <div
      className="flex flex-col bg-white screen-enter"
      style={{
        height: '100dvh',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Header */}
      <div className="px-5 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Core Workout</h1>
        <p className="text-gray-400 text-sm">Workout konfigurieren</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-2">

        {/* Exercise count */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">Übungen</div>
            <div className="text-xs text-gray-400">2 – 15</div>
          </div>
          <Stepper value={exerciseCount} min={2} max={15} onChange={setExerciseCount} />
        </div>

        {/* Level selection */}
        <div>
          <div className="font-semibold text-gray-800 mb-2">Schwierigkeits-Level</div>
          <div className="grid grid-cols-4 gap-2">
            {LEVELS.map(l => {
              const active = selectedLevels.includes(l.key)
              return (
                <button
                  key={l.key}
                  onClick={() => toggleLevel(l.key)}
                  className="py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: active ? l.bg : '#f5f5f5',
                    color: active ? l.color : '#aaa',
                    border: `2px solid ${active ? l.color : 'transparent'}`,
                  }}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
          <div className="text-xs text-gray-400 mt-1.5">{variantCount} Variante{variantCount !== 1 ? 'n' : ''} pro Übung</div>
        </div>

        {/* Variant duration */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Sekunden pro Variante</span>
            <span className="font-bold text-gray-900">{variantDuration}s</span>
          </div>
          <input type="range" min={15} max={60} step={5} value={variantDuration}
            onChange={e => setVariantDuration(+e.target.value)}
            className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>15s</span><span>60s</span></div>
        </div>

        {/* Pause */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Pause zwischen Übungen</span>
            <span className="font-bold text-gray-900">{pauseDuration}s</span>
          </div>
          <input type="range" min={5} max={30} step={5} value={pauseDuration}
            onChange={e => setPauseDuration(+e.target.value)}
            className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5s</span><span>30s</span></div>
        </div>

        {/* Burnout */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Burnout-Finisher</span>
              <span>🔥</span>
            </div>
            <Toggle on={burnoutEnabled} onChange={setBurnoutEnabled} />
          </div>
          {burnoutEnabled && (
            <div className="bg-orange-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-orange-700 font-medium">Burnout-Dauer</span>
                <span className="font-bold text-orange-700">{burnoutDuration}s</span>
              </div>
              <input type="range" min={30} max={120} step={10} value={burnoutDuration}
                onChange={e => setBurnoutDuration(+e.target.value)}
                className="w-full h-2 accent-orange-500" />
              <div className="flex justify-between text-xs text-orange-400 mt-1"><span>30s</span><span>120s</span></div>
            </div>
          )}
        </div>

        {/* Volume */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">🔊 Lautstärke</span>
            <span className="text-sm text-gray-500">{Math.round(vol * 100)}%</span>
          </div>
          <input type="range" min={0} max={1} step={0.05} value={vol}
            onChange={e => handleVolumeChange(+e.target.value)}
            className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Aus</span><span>Voll</span></div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3">
              <div className="text-xl font-bold text-gray-900">{formatTime(summary.total)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Gesamtdauer</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-xl font-bold text-gray-900">{summary.sets}</div>
              <div className="text-xs text-gray-500 mt-0.5">Sets gesamt</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pt-3">
        <button
          onClick={handleStart}
          disabled={selectedLevels.length === 0}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90 disabled:opacity-40"
        >
          Übungen ansehen →
        </button>
      </div>
    </div>
  )
}
