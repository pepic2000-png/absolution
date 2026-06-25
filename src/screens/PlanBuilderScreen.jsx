import { useState } from 'react'
import { EXERCISES } from '../exercises'
import ExerciseForm from '../components/ExerciseForm'

const LEVEL_COLORS = {
  easy:    { color: '#639922', bg: '#f0f7e6' },
  medium:  { color: '#378ADD', bg: '#e8f2fc' },
  hard:    { color: '#D85A30', bg: '#fdf0ea' },
  maximum: { color: '#7F77DD', bg: '#f0eff9' },
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

export default function PlanBuilderScreen({
  selectedLevels, config, onConfirm, onBack,
  extraExercises = [], onAddLocalExercise, onRemoveLocalExercise, localExercises = [],
  globalExercises = [],
}) {
  const allExercises = [...EXERCISES, ...globalExercises, ...localExercises]
  const [selected, setSelected] = useState([allExercises.find(e => e.id === 'dead-bug') || allExercises[0]])
  const [planName, setPlanName] = useState('')
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)

  const patterns = ['all', ...Object.keys(PATTERN_LABELS)]
  const selectedIds = selected.map(e => e.id)

  function toggleExercise(ex) {
    if (selectedIds.includes(ex.id)) {
      if (ex.id === 'dead-bug') return
      setSelected(prev => prev.filter(e => e.id !== ex.id))
    } else {
      setSelected(prev => [...prev, ex])
    }
  }

  function moveUp(idx) {
    if (idx <= 1) return
    setSelected(prev => {
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
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
  }

  function handleAddLocalExercise(exercise) {
    const ex = { ...exercise, id: `local-${Date.now()}` }
    onAddLocalExercise(exercise)
    setSelected(prev => [...prev, { ...ex }])
    setShowForm(false)
  }

  const filteredAll = filter === 'all'
    ? allExercises
    : allExercises.filter(e => e.pattern === filter)

  function handleConfirm() {
    const withVariants = selected.map(ex => ({
      ...ex,
      variants: ex.variants.filter(v => selectedLevels.includes(v.level)),
    }))
    onConfirm(withVariants, planName)
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

      {/* Selected order */}
      {!showForm && selected.length > 0 && (
        <div className="px-5 mb-3 flex-shrink-0">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Reihenfolge</div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {selected.map((ex, idx) => (
              <div key={ex.id} className="flex-shrink-0 flex flex-col items-center gap-1">
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
                <div className={`px-2.5 py-1.5 rounded-xl text-xs font-medium text-center max-w-20 leading-tight ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {idx + 1}. {ex.name}
                </div>
                {idx > 0 && (
                  <button onClick={() => toggleExercise(ex)} className="text-red-400 text-xs">✕</button>
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
            return (
              <div
                key={ex.id}
                onClick={() => toggleExercise(ex)}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer select-none transition-colors"
                style={{
                  backgroundColor: isSelected ? '#f0f0f0' : '#fafafa',
                  border: `2px solid ${isSelected ? '#111' : 'transparent'}`,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors"
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
