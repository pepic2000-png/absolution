import { useState } from 'react'
import { EXERCISES } from '../exercises'
import ExerciseForm from '../components/ExerciseForm'

const LEVEL_COLORS = {
  easy:    { color: '#639922', bg: '#f0f7e6' },
  medium:  { color: '#378ADD', bg: '#e8f2fc' },
  hard:    { color: '#D85A30', bg: '#fdf0ea' },
  maximum: { color: '#7F77DD', bg: '#f0eff9' },
}

const LEVEL_LABELS = {
  easy: 'Leicht', medium: 'Mittel', hard: 'Schwer', maximum: 'Maximum',
}

const EQUIPMENT_LABELS = {
  none:     '🤸 BW',
  band:     '🔴 Band',
  dumbbell: '🏋️ Hantel',
  cable:    '🔧 Seilzug',
  bar:      '🏗️ Stange',
  bench:    '🪑 Bank',
}

function equipLabel(key) {
  return EQUIPMENT_LABELS[key] || key
}

const PATTERN_LABELS = {
  'anti-extension': 'Anti-Extension',
  'anti-rotation':  'Anti-Rotation',
  'hip-flexion':    'Hüftflexion',
  'lateral-flexion':'Lateral',
  'bracing':        'Bracing',
  'rotation':       'Rotation',
}

const PAUSE_OPTIONS = [5, 10, 15, 20, 30, 0] // 0 = no pause

export default function PlanBuilderScreen({
  selectedLevels, config, onConfirm, onBack,
  extraExercises = [], onAddLocalExercise, onRemoveLocalExercise, localExercises = [],
  globalExercises = [],
}) {
  const allExercises = [...EXERCISES, ...globalExercises, ...localExercises]
  const defaultEx = allExercises.find(e => e.id === 'dead-bug') || allExercises[0]
  const [selected, setSelected] = useState([defaultEx])
  const [exerciseLevels, setExerciseLevels] = useState({})
  const [pauses, setPauses] = useState([]) // pause duration after each exercise (except last)
  const [planName, setPlanName] = useState('')
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)

  const patterns = ['all', ...Object.keys(PATTERN_LABELS)]
  const selectedIds = selected.map(e => e.id)

  function getExerciseLevels(ex) {
    return exerciseLevels[ex.id] || selectedLevels
  }

  function toggleExerciseLevel(ex, levelKey) {
    const current = getExerciseLevels(ex)
    if (current.includes(levelKey)) {
      if (current.length <= 1) return
      setExerciseLevels(prev => ({ ...prev, [ex.id]: current.filter(l => l !== levelKey) }))
    } else {
      setExerciseLevels(prev => ({ ...prev, [ex.id]: [...current, levelKey] }))
    }
  }

  function toggleExercise(ex) {
    if (selectedIds.includes(ex.id)) {
      if (ex.id === 'dead-bug') return
      const idx = selected.findIndex(e => e.id === ex.id)
      setSelected(prev => prev.filter(e => e.id !== ex.id))
      setPauses(prev => {
        const next = [...prev]
        // remove pause at idx-1 (pause after previous exercise) or idx (pause after this)
        next.splice(Math.max(0, idx - 1), 1)
        return next
      })
    } else {
      setSelected(prev => [...prev, ex])
      setPauses(prev => [...prev, config?.pauseDuration ?? 15])
    }
  }

  function cyclePause(idx) {
    setPauses(prev => {
      const next = [...prev]
      const current = next[idx]
      const pos = PAUSE_OPTIONS.indexOf(current)
      next[idx] = PAUSE_OPTIONS[(pos + 1) % PAUSE_OPTIONS.length]
      return next
    })
  }

  function moveUp(idx) {
    if (idx <= 1) return
    setSelected(prev => {
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
    setPauses(prev => {
      const next = [...prev]
      ;[next[idx - 2], next[idx - 1]] = [next[idx - 1], next[idx - 2]]
      return next
    })
  }

  function moveDown(idx) {
    if (idx === 0) return
    setSelected(prev => {
      if (idx >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
      return next
    })
    setPauses(prev => {
      if (idx - 1 >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
  }

  function handleAddLocalExercise(exercise) {
    const ex = { ...exercise, id: `local-${Date.now()}` }
    onAddLocalExercise(exercise)
    setSelected(prev => [...prev, { ...ex }])
    setPauses(prev => [...prev, config?.pauseDuration ?? 15])
    setShowForm(false)
  }

  const filteredAll = filter === 'all'
    ? allExercises
    : allExercises.filter(e => e.pattern === filter)

  function handleConfirm() {
    const withVariants = selected.map((ex, i) => {
      const levels = getExerciseLevels(ex)
      const pauseAfter = i < selected.length - 1 ? (pauses[i] ?? config?.pauseDuration ?? 15) : undefined
      return {
        ...ex,
        variants: ex.variants.filter(v => levels.includes(v.level)),
        pauseAfter,
      }
    })
    onConfirm(withVariants, planName)
  }

  // All level keys available across the exercises (deduplicated)
  const allAvailableLevels = ['easy', 'medium', 'hard', 'maximum']

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
      <div className="px-5 mb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200 flex-shrink-0">←</button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Eigener Plan</h1>
          <p className="text-xs text-gray-400">{selected.length} Übungen gewählt</p>
        </div>
        {onAddLocalExercise && !showForm && (
          <button onClick={() => setShowForm(true)}
            className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200 flex-shrink-0">
            + Eigene
          </button>
        )}
      </div>

      {/* Local exercise form */}
      {showForm && (
        <div className="mx-5 mb-3 bg-gray-50 rounded-2xl p-4 flex-shrink-0">
          <div className="font-semibold text-gray-800 mb-3 text-sm">Eigene Übung erstellen</div>
          <ExerciseForm
            onSave={handleAddLocalExercise}
            onCancel={() => setShowForm(false)}
            submitLabel="Lokal speichern"
          />
        </div>
      )}

      {/* Plan name */}
      {!showForm && (
        <div className="px-5 mb-3 flex-shrink-0">
          <input
            type="text"
            value={planName}
            onChange={e => setPlanName(e.target.value)}
            placeholder="Plan-Name (optional, zum Speichern)"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400"
          />
        </div>
      )}

      {/* Selected order with pauses */}
      {!showForm && selected.length > 0 && (
        <div className="px-5 mb-3 flex-shrink-0">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Reihenfolge</div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {selected.map((ex, idx) => (
              <div key={ex.id} className="flex items-center gap-1 flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx <= 1}
                      className="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center disabled:opacity-30"
                    >←</button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx >= selected.length - 1 || idx === 0}
                      className="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center disabled:opacity-30"
                    >→</button>
                  </div>
                  <div className={`px-2 py-1.5 rounded-xl text-xs font-medium text-center leading-tight ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    style={{ maxWidth: '72px' }}>
                    {idx + 1}. {ex.name}
                  </div>
                  {idx > 0 && (
                    <button onClick={() => toggleExercise(ex)} className="text-red-400 text-xs">✕</button>
                  )}
                </div>
                {/* Pause chip between exercises */}
                {idx < selected.length - 1 && (
                  <button
                    onClick={() => cyclePause(idx)}
                    className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg px-1.5 py-1 text-center"
                    style={{ backgroundColor: pauses[idx] === 0 ? '#fee2e2' : '#f3f4f6', minWidth: '36px' }}
                  >
                    <span className="text-xs">{pauses[idx] === 0 ? '🚫' : '⏸'}</span>
                    <span className="text-xs font-semibold" style={{ color: pauses[idx] === 0 ? '#dc2626' : '#6b7280' }}>
                      {pauses[idx] === 0 ? 'Kein' : `${pauses[idx]}s`}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pattern filter */}
      {!showForm && (
        <div className="px-5 mb-2 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {patterns.map(p => (
              <button key={p} onClick={() => setFilter(p)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                style={{ backgroundColor: filter === p ? '#111' : '#f5f5f5', color: filter === p ? '#fff' : '#666' }}>
                {p === 'all' ? 'Alle' : PATTERN_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All exercises */}
      {!showForm && (
        <div className="flex-1 overflow-y-auto px-5 space-y-2 pb-2">
          {filteredAll.map(ex => {
            const isSelected = selectedIds.includes(ex.id)
            const isActivation = ex.id === 'dead-bug'
            const isLocal = ex.id?.startsWith('local-')
            const isGlobal = globalExercises.some(g => g.id === ex.id)
            const exLevels = getExerciseLevels(ex)
            const availableLevels = allAvailableLevels.filter(l => ex.variants?.some(v => v.level === l))
            return (
              <div key={ex.id} className="rounded-2xl overflow-hidden"
                style={{ border: `2px solid ${isSelected ? '#111' : 'transparent'}`, backgroundColor: isSelected ? '#f0f0f0' : '#fafafa' }}>
                <div
                  onClick={() => toggleExercise(ex)}
                  className="flex items-center gap-3 p-3 cursor-pointer select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: isSelected ? '#111' : '#e5e5e5', color: isSelected ? '#fff' : '#999' }}
                  >
                    {isSelected ? (isActivation ? '★' : '✓') : '+'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{ex.name}</span>
                      {isActivation && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Aktivierung</span>}
                      {isGlobal && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">🌐</span>}
                      {isLocal && <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">Eigene</span>}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{PATTERN_LABELS[ex.pattern] || ex.pattern}</div>
                    <div className="flex gap-1 flex-wrap mt-0.5">
                      {availableLevels.map(l => {
                        const c = LEVEL_COLORS[l]
                        return (
                          <span key={l} className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: c.bg, color: c.color }}>{LEVEL_LABELS[l]}</span>
                        )
                      })}
                      {(ex.equipment || ['none']).map(e => (
                        <span key={e} className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">{equipLabel(e)}</span>
                      ))}
                    </div>
                  </div>
                  {isLocal && onRemoveLocalExercise && (
                    <button
                      onClick={e => { e.stopPropagation(); onRemoveLocalExercise(ex.id) }}
                      className="text-red-300 text-sm px-1 flex-shrink-0"
                    >🗑</button>
                  )}
                </div>

                {/* Level picker — only when selected and has normal levels */}
                {isSelected && availableLevels.length > 0 && (
                  <div className="px-3 pb-3 pt-0">
                    <div className="text-xs text-gray-400 mb-1.5">Schwierigkeit</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {availableLevels.map(l => {
                        const active = exLevels.includes(l)
                        const c = LEVEL_COLORS[l]
                        return (
                          <button
                            key={l}
                            onClick={e => { e.stopPropagation(); toggleExerciseLevel(ex, l) }}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{
                              backgroundColor: active ? c.bg : '#f5f5f5',
                              color: active ? c.color : '#aaa',
                              border: `1.5px solid ${active ? c.color : 'transparent'}`,
                            }}
                          >
                            {LEVEL_LABELS[l]}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* CTA */}
      {!showForm && (
        <div className="px-5 pt-3 flex-shrink-0">
          <button
            onClick={handleConfirm}
            disabled={selected.length < 2}
            className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90 disabled:opacity-40"
          >
            {selected.length < 2 ? 'Mind. 2 Übungen wählen' : `Plan mit ${selected.length} Übungen →`}
          </button>
        </div>
      )}
    </div>
  )
}
