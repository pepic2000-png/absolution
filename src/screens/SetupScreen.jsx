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
      <button onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 active:bg-gray-200 select-none">−</button>
      <span className="w-7 text-center font-bold text-xl text-gray-900 tabular-nums">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 active:bg-gray-200 select-none">+</button>
    </div>
  )
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch" aria-checked={on}
      className="relative flex-shrink-0 w-12 h-7 rounded-full focus:outline-none"
      style={{ backgroundColor: on ? '#f97316' : '#d1d5db', transition: 'background-color 0.2s' }}
    >
      <span className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow"
        style={{ transform: on ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
    </button>
  )
}

export default function SetupScreen({ onStart, onOpenBuilder, onOpenAdmin, savedPlans, sharedPlans = [], onLoadPlan, onDeletePlan, isAdmin, onAdminSwitch, onAdminLogout }) {
  const [workoutMode, setWorkoutMode] = useState('variants') // 'variants' | 'single'
  const [exerciseCount, setExerciseCount] = useState(4)
  const [variantDuration, setVariantDuration] = useState(30)
  const [pauseDuration, setPauseDuration] = useState(15)
  const [burnoutEnabled, setBurnoutEnabled] = useState(false)
  const [burnoutDuration, setBurnoutDuration] = useState(60)
  const [selectedLevels, setSelectedLevels] = useState(['easy', 'medium', 'hard'])
  const [vol, setVol] = useState(getVolume())
  const [showPlans, setShowPlans] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminInput, setAdminInput] = useState('')
  const [adminError, setAdminError] = useState(false)

  function toggleLevel(key) {
    setSelectedLevels(prev => {
      if (prev.includes(key)) {
        if (prev.length <= 1) return prev
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
    const effectiveVariants = workoutMode === 'single' ? 1 : variantCount
    const workoutTime = exerciseCount * effectiveVariants * variantDuration
    const pauseTime = (exerciseCount - 1) * pauseDuration
    const burnoutTime = burnoutEnabled ? burnoutDuration * (workoutMode === 'single' ? 1 : variantCount) : 0
    const total = workoutTime + pauseTime + burnoutTime
    return { total, sets: exerciseCount * effectiveVariants }
  }, [workoutMode, exerciseCount, variantCount, variantDuration, pauseDuration, burnoutEnabled, burnoutDuration])

  function currentConfig() {
    return { workoutMode, exerciseCount, variantDuration, pauseDuration, burnoutEnabled, burnoutDuration, selectedLevels }
  }

  function handleStart() {
    unlockAudio()
    onStart(currentConfig())
  }

  function handleLoadPlan(plan) {
    unlockAudio()
    onLoadPlan(plan)
    setShowPlans(false)
  }

  function handleAdminLogin(e) {
    e.preventDefault()
    const ok = onAdminSwitch(adminInput)
    if (ok) {
      setShowAdminModal(false)
      setAdminInput('')
      setAdminError(false)
    } else {
      setAdminError(true)
      setAdminInput('')
    }
  }

  return (
    <div className="flex flex-col bg-white screen-enter"
      style={{
        height: '100dvh',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Header */}
      <div className="px-5 mb-3 flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Core Workout</h1>
          <p className="text-gray-400 text-sm">Workout konfigurieren</p>
        </div>
        <div className="flex gap-2 mt-1">
          {(savedPlans.length > 0 || sharedPlans.length > 0) && (
            <button onClick={() => setShowPlans(s => !s)}
              className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200">
              📋 {savedPlans.length + sharedPlans.length}
            </button>
          )}
          {isAdmin ? (
            <button onClick={onOpenAdmin}
              className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200">
              ⚙️
            </button>
          ) : (
            <button onClick={() => setShowAdminModal(true)}
              className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200">
              ⚙️
            </button>
          )}
        </div>
      </div>

      {/* Plans panel */}
      {showPlans && (savedPlans.length > 0 || sharedPlans.length > 0) && (
        <div className="mx-5 mb-3 bg-gray-50 rounded-2xl p-3 flex-shrink-0">
          {sharedPlans.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">🌐 Geteilte Pläne</div>
              <div className="space-y-2">
                {sharedPlans.map(plan => (
                  <div key={plan.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{plan.name}</div>
                      <div className="text-xs text-gray-400">{plan.exercises?.length} Übungen</div>
                    </div>
                    <button onClick={() => handleLoadPlan(plan, true)}
                      className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200 flex-shrink-0">
                      Laden
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Meine Pläne</div>
          <div className="space-y-2">
            {savedPlans.map(plan => (
              <div key={plan.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate">{plan.name}</div>
                  <div className="text-xs text-gray-400">{plan.exercises.length} Übungen · {plan.savedAt}</div>
                </div>
                <button onClick={() => handleLoadPlan(plan)}
                  className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200 flex-shrink-0">
                  Laden
                </button>
                <button onClick={() => onDeletePlan(plan.id)}
                  className="text-red-400 text-lg w-7 flex items-center justify-center flex-shrink-0">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable config */}
      <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-2">

        {/* Workout-Modus */}
        <div>
          <div className="font-semibold text-gray-800 mb-2">Trainings-Modus</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setWorkoutMode('variants')}
              className="p-3 rounded-xl text-left transition-all"
              style={{
                backgroundColor: workoutMode === 'variants' ? '#111' : '#f5f5f5',
                color: workoutMode === 'variants' ? '#fff' : '#555',
                border: `2px solid ${workoutMode === 'variants' ? '#111' : 'transparent'}`,
              }}
            >
              <div className="font-bold text-sm mb-0.5">Varianten</div>
              <div className="text-xs opacity-70">1 Übung × alle Level</div>
            </button>
            <button
              onClick={() => setWorkoutMode('single')}
              className="p-3 rounded-xl text-left transition-all"
              style={{
                backgroundColor: workoutMode === 'single' ? '#111' : '#f5f5f5',
                color: workoutMode === 'single' ? '#fff' : '#555',
                border: `2px solid ${workoutMode === 'single' ? '#111' : 'transparent'}`,
              }}
            >
              <div className="font-bold text-sm mb-0.5">Quer durch</div>
              <div className="text-xs opacity-70">Übungen × 1 Level</div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">Übungen</div>
            <div className="text-xs text-gray-400">2 – 47 (zufällig)</div>
          </div>
          <Stepper value={exerciseCount} min={2} max={47} onChange={setExerciseCount} />
        </div>

        <div>
          <div className="font-semibold text-gray-800 mb-2">Schwierigkeits-Level</div>
          <div className="grid grid-cols-4 gap-2">
            {LEVELS.map(l => {
              const active = selectedLevels.includes(l.key)
              return (
                <button key={l.key} onClick={() => toggleLevel(l.key)}
                  className="py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: active ? l.bg : '#f5f5f5',
                    color: active ? l.color : '#aaa',
                    border: `2px solid ${active ? l.color : 'transparent'}`,
                  }}>
                  {l.label}
                </button>
              )
            })}
          </div>
          <div className="text-xs text-gray-400 mt-1.5">
            {workoutMode === 'single'
              ? `${variantCount} Level${variantCount !== 1 ? 's' : ''} im Pool — je Übung 1 Level zugeteilt`
              : `${variantCount} Variante${variantCount !== 1 ? 'n' : ''} pro Übung`}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Sekunden pro Variante</span>
            <span className="font-bold text-gray-900">{variantDuration}s</span>
          </div>
          <input type="range" min={15} max={60} step={5} value={variantDuration}
            onChange={e => setVariantDuration(+e.target.value)} className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>15s</span><span>60s</span></div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Pause zwischen Übungen</span>
            <span className="font-bold text-gray-900">{pauseDuration}s</span>
          </div>
          <input type="range" min={5} max={30} step={5} value={pauseDuration}
            onChange={e => setPauseDuration(+e.target.value)} className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5s</span><span>30s</span></div>
        </div>

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
                onChange={e => setBurnoutDuration(+e.target.value)} className="w-full h-2 accent-orange-500" />
              <div className="flex justify-between text-xs text-orange-400 mt-1"><span>30s</span><span>120s</span></div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">🔊 Lautstärke</span>
            <span className="text-sm text-gray-500">{Math.round(vol * 100)}%</span>
          </div>
          <input type="range" min={0} max={1} step={0.05} value={vol}
            onChange={e => handleVolumeChange(+e.target.value)} className="w-full h-2 accent-gray-800" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Aus</span><span>Voll</span></div>
        </div>

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

      {/* CTAs */}
      <div className="px-5 pt-3 flex flex-col gap-2 flex-shrink-0">
        <button onClick={handleStart} disabled={selectedLevels.length === 0}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90 disabled:opacity-40">
          {workoutMode === 'single' ? 'Quer-Workout starten →' : 'Varianten-Workout →'}
        </button>
        <button onClick={() => { unlockAudio(); onOpenBuilder(currentConfig()) }}
          className="w-full bg-white text-gray-800 font-semibold text-base py-3.5 rounded-2xl active:bg-gray-50 border border-gray-200">
          ✏️ Eigenen Plan erstellen
        </button>
        {isAdmin && (
          <div className="flex justify-center pt-1">
            <button onClick={onAdminLogout} className="text-xs text-gray-400 underline">
              Admin abmelden
            </button>
          </div>
        )}
      </div>

      {/* Admin login modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={() => { setShowAdminModal(false); setAdminInput(''); setAdminError(false) }}>
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 pb-10"
            style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom))' }}
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="text-2xl mb-1">⚙️</div>
              <div className="font-bold text-gray-900">Admin-Passwort</div>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <input
                type="password"
                value={adminInput}
                onChange={e => { setAdminInput(e.target.value); setAdminError(false) }}
                placeholder="Admin-Passwort"
                autoFocus
                className="w-full bg-gray-50 border-2 rounded-2xl px-4 py-3 text-center text-base outline-none"
                style={{ borderColor: adminError ? '#D85A30' : '#e5e5e5' }}
              />
              {adminError && <p className="text-sm text-center" style={{ color: '#D85A30' }}>Falsches Passwort</p>}
              <button type="submit"
                className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-2xl active:opacity-90">
                Anmelden
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
