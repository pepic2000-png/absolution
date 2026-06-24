import { useState } from 'react'

const PATTERNS = [
  { key: 'anti-extension', label: 'Anti-Extension' },
  { key: 'anti-rotation', label: 'Anti-Rotation' },
  { key: 'hip-flexion', label: 'Hüftbeugung' },
  { key: 'lateral-flexion', label: 'Lateral' },
  { key: 'bracing', label: 'Bracing' },
  { key: 'rotation', label: 'Rotation' },
]

const LEVELS = ['easy', 'medium', 'hard', 'maximum']
const LEVEL_LABELS = { easy: 'Leicht', medium: 'Mittel', hard: 'Schwer', maximum: 'Maximum' }

function emptyVariant(level) {
  return { level, label: LEVEL_LABELS[level], name: '', desc: '', cue: '' }
}

export default function ExerciseForm({ onSave, onCancel, submitLabel = 'Speichern' }) {
  const [name, setName] = useState('')
  const [pattern, setPattern] = useState('anti-extension')
  const [concept, setConcept] = useState('')
  const [variants, setVariants] = useState(LEVELS.map(emptyVariant))

  function updateVariant(level, field, value) {
    setVariants(vs => vs.map(v => v.level === level ? { ...v, [field]: value } : v))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    const filledVariants = variants.filter(v => v.name.trim())
    if (filledVariants.length === 0) return
    onSave({
      name: name.trim(),
      pattern,
      concept: concept.trim(),
      variants: filledVariants,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1">Übungsname *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="z.B. Hollow Body Hold"
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1">Bewegungsmuster</label>
        <div className="grid grid-cols-3 gap-1.5">
          {PATTERNS.map(p => (
            <button key={p.key} type="button"
              onClick={() => setPattern(p.key)}
              className="py-1.5 rounded-lg text-xs font-semibold border-2 transition-all"
              style={{
                borderColor: pattern === p.key ? '#374151' : 'transparent',
                backgroundColor: pattern === p.key ? '#f3f4f6' : '#f9fafb',
                color: pattern === p.key ? '#111827' : '#9ca3af',
              }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1">Konzept / Beschreibung</label>
        <textarea
          value={concept}
          onChange={e => setConcept(e.target.value)}
          placeholder="Was trainiert diese Übung?"
          rows={2}
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-700 mb-2">Varianten (mindestens eine ausfüllen)</div>
        <div className="space-y-3">
          {variants.map(v => (
            <div key={v.level} className="bg-gray-50 rounded-xl p-3 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{LEVEL_LABELS[v.level]}</div>
              <input
                type="text"
                value={v.name}
                onChange={e => updateVariant(v.level, 'name', e.target.value)}
                placeholder="Name der Variante"
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="text"
                value={v.desc}
                onChange={e => updateVariant(v.level, 'desc', e.target.value)}
                placeholder="Beschreibung der Ausführung"
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="text"
                value={v.cue}
                onChange={e => updateVariant(v.level, 'cue', e.target.value)}
                placeholder="Coaching-Cue (💬 Hinweis)"
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button type="button" onClick={onCancel}
          className="flex-1 py-3 rounded-xl font-semibold text-sm bg-gray-100 text-gray-700 active:bg-gray-200">
          Abbrechen
        </button>
        <button type="submit"
          className="flex-1 py-3 rounded-xl font-semibold text-sm bg-gray-900 text-white active:opacity-90">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
