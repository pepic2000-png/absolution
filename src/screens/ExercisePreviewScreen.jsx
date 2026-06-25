import { useState, useMemo } from 'react'
import { EXERCISES, getSwapCandidates } from '../exercises'

const LEVEL_COLORS = {
  easy:    { color: '#639922', bg: '#f0f7e6' },
  medium:  { color: '#378ADD', bg: '#e8f2fc' },
  hard:    { color: '#D85A30', bg: '#fdf0ea' },
  maximum: { color: '#7F77DD', bg: '#f0eff9' },
}

function ExerciseRow({ ex, idx, isSwapping, onToggleSwap, onSwap, candidates, isFirst }) {
  return (
    <div>
      {/* Exercise card — div not button to avoid iOS nested-button issue */}
      <div
        onClick={() => onToggleSwap(idx)}
        className="w-full text-left bg-gray-50 rounded-2xl p-4 active:bg-gray-100 transition-colors cursor-pointer select-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {idx + 1}
              </span>
              <span className="font-semibold text-gray-900">{ex.name}</span>
              {isFirst && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Aktivierung</span>
              )}
            </div>
            <p className="text-xs text-gray-500 pl-8 leading-snug">{ex.concept}</p>
            <div className="flex gap-1 pl-8 mt-2 flex-wrap">
              {ex.variants.map((v, vi) => {
                const c = LEVEL_COLORS[v.level] || LEVEL_COLORS.easy
                return (
                  <span key={vi} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: c.bg, color: c.color }}>
                    {v.label}
                  </span>
                )
              })}
            </div>
          </div>
          <span className={`text-lg mt-1 transition-transform ${isSwapping ? 'rotate-45 text-gray-600' : 'text-gray-300'}`}>⇄</span>
        </div>
      </div>

      {/* Swap panel */}
      {isSwapping && (
        <div className="bg-white border border-gray-200 rounded-2xl mt-1 p-3 shadow-sm">
          <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Austauschen mit:</div>
          <div className="space-y-1 max-h-52 overflow-y-auto">
            {candidates.map(c => (
              <div
                key={c.id}
                onClick={(e) => { e.stopPropagation(); onSwap(idx, c) }}
                className="w-full text-left px-3 py-3 rounded-xl bg-gray-50 active:bg-gray-100 flex items-center justify-between cursor-pointer select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div>
                  <div className="font-medium text-gray-800 text-sm">{c.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{c.pattern.replace('-', ' ')}</div>
                </div>
                <span className="text-gray-400 font-medium">Wählen</span>
              </div>
            ))}
            {candidates.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-3">Alle Übungen bereits im Workout</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ExercisePreviewScreen({ exercises, selectedLevels, onConfirm, onBack, planName, onSavePlan, extraExercises = [] }) {
  const [list, setList] = useState(exercises)
  const [swappingIdx, setSwappingIdx] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveName, setSaveName] = useState(planName || '')

  function toggleSwap(idx) {
    setSwappingIdx(prev => prev === idx ? null : idx)
  }

  function swapExercise(idx, newEx) {
    setList(prev => {
      const next = [...prev]
      next[idx] = {
        ...newEx,
        variants: newEx.variants.filter(v => selectedLevels.includes(v.level)),
      }
      return next
    })
    setSwappingIdx(null)
  }

  // Candidates exclude all currently listed exercises
  const candidatesForIdx = (idx) => {
    const excludeIds = list.map(e => e.id)
    return getSwapCandidates(excludeIds, extraExercises).map(c => ({
      ...c,
      variants: c.variants.filter(v => selectedLevels.includes(v.level)),
    }))
  }

  function handleSave() {
    if (!saveName.trim()) return
    onSavePlan(saveName.trim(), list)
    setSaving(false)
  }

  return (
    <div
      className="flex flex-col bg-white screen-enter"
      style={{
        height: '100%',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Header */}
      <div className="px-5 mb-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200 flex-shrink-0">
          ←
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Übungen prüfen</h1>
          <p className="text-xs text-gray-400">Tippen zum Austauschen</p>
        </div>
        <button
          onClick={() => setSaving(s => !s)}
          className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200"
        >
          💾 Speichern
        </button>
      </div>

      {/* Save panel */}
      {saving && (
        <div className="mx-5 mb-3 bg-gray-50 rounded-2xl p-4 flex-shrink-0">
          <div className="text-sm font-semibold text-gray-700 mb-2">Plan benennen:</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              placeholder="z.B. Montag Core"
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400"
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={!saveName.trim()}
              className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 space-y-2 pb-2">
        {list.map((ex, idx) => (
          <ExerciseRow
            key={`${ex.id}-${idx}`}
            ex={ex}
            idx={idx}
            isSwapping={swappingIdx === idx}
            onToggleSwap={toggleSwap}
            onSwap={swapExercise}
            candidates={candidatesForIdx(idx)}
            isFirst={idx === 0}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pt-3 flex-shrink-0">
        <button
          onClick={() => onConfirm(list)}
          className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90"
        >
          Workout starten →
        </button>
      </div>
    </div>
  )
}
