import { useState } from 'react'
import { EXERCISES } from '../exercises'
import ExerciseForm from '../components/ExerciseForm'

const LEVEL_COLORS = {
  easy:    { color: '#639922', bg: '#f0f7e6' },
  medium:  { color: '#378ADD', bg: '#e8f2fc' },
  hard:    { color: '#D85A30', bg: '#fdf0ea' },
  maximum: { color: '#7F77DD', bg: '#f0eff9' },
  weighted:{ color: '#7F77DD', bg: '#f0eff9' },
}

const LEVEL_LABELS = {
  easy: 'Leicht', medium: 'Mittel', hard: 'Schwer', maximum: 'Maximum', weighted: 'Gewicht',
}

const EQUIPMENT_LABELS = {
  none: '🤸 BW', band: '🔴 Band', dumbbell: '🏋️ Hantel',
  cable: '🔧 Seilzug', bar: '🏗️ Stange', bench: '🪑 Bank',
}

const PATTERN_LABELS = {
  'anti-extension': 'Anti-Extension',
  'anti-rotation':  'Anti-Rotation',
  'hip-flexion':    'Hüftflexion',
  'lateral-flexion':'Lateral',
  'bracing':        'Bracing',
  'rotation':       'Rotation',
}

const PAUSE_OPTIONS = [5, 10, 15, 20, 30, 0]

// Flatten exercises into individual variant entries
function flattenExercises(exercises) {
  const items = []
  for (const ex of exercises) {
    for (const variant of (ex.variants || [])) {
      items.push({
        id: `${ex.id}__${variant.level}`,
        exerciseId: ex.id,
        exerciseName: ex.name,
        pattern: ex.pattern,
        equipment: ex.equipment,
        concept: ex.concept,
        variant,
        // Keep full exercise for workout (single variant)
        exercise: { ...ex, variants: [variant] },
      })
    }
  }
  return items
}

export default function PlanBuilderScreen({
  selectedLevels, config, onConfirm, onBack,
  extraExercises = [], onAddLocalExercise, onRemoveLocalExercise, localExercises = [],
  globalExercises = [],
}) {
  const allExercises = [...EXERCISES, ...globalExercises, ...localExercises]
  const allItems = flattenExercises(allExercises)

  const defaultItem = allItems.find(i => i.exerciseId === 'dead-bug' && i.variant.level === 'easy') || allItems[0]
  const [selected, setSelected] = useState([defaultItem])
  const [pauses, setPauses] = useState([])
  const [planName, setPlanName] = useState('')
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)

  const selectedIds = selected.map(i => i.id)
  const patterns = ['all', ...Object.keys(PATTERN_LABELS)]

  // Filter to only show levels matching selectedLevels (unless none match — then show all)
  const filteredItems = allItems.filter(item => {
    if (filter !== 'all' && item.pattern !== filter) return false
    return true
  })

  function toggleItem(item) {
    if (selectedIds.includes(item.id)) {
      if (item.exerciseId === 'dead-bug' && selected.filter(s => s.exerciseId === 'dead-bug').length <= 1) return
      const idx = selected.findIndex(s => s.id === item.id)
      setSelected(prev => prev.filter(s => s.id !== item.id))
      setPauses(prev => {
        const next = [...prev]
        next.splice(Math.max(0, idx - 1), 1)
        return next
      })
    } else {
      setSelected(prev => [...prev, item])
      setPauses(prev => [...prev, config?.pauseDuration ?? 15])
    }
  }

  function cyclePause(idx) {
    setPauses(prev => {
      const next = [...prev]
      const pos = PAUSE_OPTIONS.indexOf(next[idx])
      next[idx] = PAUSE_OPTIONS[(pos + 1) % PAUSE_OPTIONS.length]
      return next
    })
  }

  function moveUp(idx) {
    if (idx <= 1) return
    setSelected(prev => { const n = [...prev]; [n[idx-1], n[idx]] = [n[idx], n[idx-1]]; return n })
    setPauses(prev => { const n = [...prev]; [n[idx-2], n[idx-1]] = [n[idx-1], n[idx-2]]; return n })
  }

  function moveDown(idx) {
    if (idx === 0 || idx >= selected.length - 1) return
    setSelected(prev => { const n = [...prev]; [n[idx], n[idx+1]] = [n[idx+1], n[idx]]; return n })
    setPauses(prev => { if (idx-1 >= prev.length-1) return prev; const n=[...prev]; [n[idx-1],n[idx]]=[n[idx],n[idx-1]]; return n })
  }

  function handleAddLocalExercise(exercise) {
    onAddLocalExercise(exercise)
    setShowForm(false)
  }

  function handleConfirm() {
    const exercises = selected.map((item, i) => ({
      ...item.exercise,
      pauseAfter: i < selected.length - 1 ? (pauses[i] ?? config?.pauseDuration ?? 15) : undefined,
    }))
    onConfirm(exercises, planName)
  }

  return (
    <div className="flex flex-col bg-white screen-enter"
      style={{ height: '100dvh', paddingTop: 'max(20px, env(safe-area-inset-top))', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>

      {/* Header */}
      <div className="px-5 mb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200 flex-shrink-0">←</button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Eigener Plan</h1>
          <p className="text-xs text-gray-400">{selected.length} Einheiten gewählt</p>
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
          <ExerciseForm onSave={handleAddLocalExercise} onCancel={() => setShowForm(false)} submitLabel="Lokal speichern" />
        </div>
      )}

      {/* Plan name */}
      {!showForm && (
        <div className="px-5 mb-3 flex-shrink-0">
          <input type="text" value={planName} onChange={e => setPlanName(e.target.value)}
            placeholder="Plan-Name (optional, zum Speichern)"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400" />
        </div>
      )}

      {/* Selected order with pauses */}
      {!showForm && selected.length > 0 && (
        <div className="px-5 mb-3 flex-shrink-0">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Reihenfolge</div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {selected.map((item, idx) => {
              const c = LEVEL_COLORS[item.variant.level] || LEVEL_COLORS.easy
              return (
                <div key={item.id} className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-0.5">
                      <button onClick={() => moveUp(idx)} disabled={idx <= 1}
                        className="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center disabled:opacity-30">←</button>
                      <button onClick={() => moveDown(idx)} disabled={idx >= selected.length - 1 || idx === 0}
                        className="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center disabled:opacity-30">→</button>
                    </div>
                    <div className="px-2 py-1.5 rounded-xl text-xs font-medium text-center leading-tight"
                      style={{ backgroundColor: c.bg, color: c.color, maxWidth: '72px', border: `1.5px solid ${c.color}` }}>
                      <div className="font-bold truncate">{item.exerciseName}</div>
                      <div className="opacity-80">{LEVEL_LABELS[item.variant.level]}</div>
                    </div>
                    {!(item.exerciseId === 'dead-bug' && selected.filter(s => s.exerciseId === 'dead-bug').length <= 1) && (
                      <button onClick={() => toggleItem(item)} className="text-red-400 text-xs">✕</button>
                    )}
                  </div>
                  {idx < selected.length - 1 && (
                    <button onClick={() => cyclePause(idx)}
                      className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg px-1.5 py-1"
                      style={{ backgroundColor: pauses[idx] === 0 ? '#fee2e2' : '#f3f4f6', minWidth: '36px' }}>
                      <span className="text-xs">{pauses[idx] === 0 ? '🚫' : '⏸'}</span>
                      <span className="text-xs font-semibold" style={{ color: pauses[idx] === 0 ? '#dc2626' : '#6b7280' }}>
                        {pauses[idx] === 0 ? 'Kein' : `${pauses[idx]}s`}
                      </span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pattern filter */}
      {!showForm && (
        <div className="px-5 mb-2 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {patterns.map(p => (
              <button key={p} onClick={() => setFilter(p)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{ backgroundColor: filter === p ? '#111' : '#f5f5f5', color: filter === p ? '#fff' : '#666' }}>
                {p === 'all' ? 'Alle' : PATTERN_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All variant items */}
      {!showForm && (
        <div className="flex-1 overflow-y-auto px-5 space-y-1.5 pb-2">
          {filteredItems.map(item => {
            const isSelected = selectedIds.includes(item.id)
            const c = LEVEL_COLORS[item.variant.level] || LEVEL_COLORS.easy
            const isLocal = item.exerciseId?.startsWith('local-')
            const isGlobal = globalExercises.some(g => g.id === item.exerciseId)
            return (
              <div key={item.id}
                onClick={() => toggleItem(item)}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer select-none"
                style={{
                  backgroundColor: isSelected ? '#f0f0f0' : '#fafafa',
                  border: `2px solid ${isSelected ? '#111' : 'transparent'}`,
                  WebkitTapHighlightColor: 'transparent',
                }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: isSelected ? '#111' : '#e5e5e5', color: isSelected ? '#fff' : '#999' }}>
                  {isSelected ? '✓' : '+'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{item.exerciseName}</span>
                    {isGlobal && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">🌐</span>}
                    {isLocal && <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">Eigene</span>}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">{item.variant.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{PATTERN_LABELS[item.pattern] || item.pattern}</div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ backgroundColor: c.bg, color: c.color }}>
                    {LEVEL_LABELS[item.variant.level]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CTA */}
      {!showForm && (
        <div className="px-5 pt-3 flex-shrink-0">
          <button onClick={handleConfirm} disabled={selected.length < 2}
            className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90 disabled:opacity-40">
            {selected.length < 2 ? 'Mind. 2 Einheiten wählen' : `Plan mit ${selected.length} Einheiten →`}
          </button>
        </div>
      )}
    </div>
  )
}
