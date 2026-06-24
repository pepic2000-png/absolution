import { useState } from 'react'
import { EXERCISES, getSwapCandidates, ALL_LEVELS } from '../exercises'

const LEVEL_COLORS = {
  easy:    { color: '#639922', bg: '#f0f7e6' },
  medium:  { color: '#378ADD', bg: '#e8f2fc' },
  hard:    { color: '#D85A30', bg: '#fdf0ea' },
  maximum: { color: '#7F77DD', bg: '#f0eff9' },
}

export default function ExercisePreviewScreen({ exercises, selectedLevels, onConfirm, onBack }) {
  const [list, setList] = useState(exercises)
  const [swappingIdx, setSwappingIdx] = useState(null)

  const candidates = getSwapCandidates(list.map(e => e.id))

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
      <div className="px-5 mb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200">
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Übungen</h1>
          <p className="text-xs text-gray-400">Tippe zum Austauschen</p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 space-y-2 pb-2">
        {list.map((ex, idx) => (
          <div key={ex.id}>
            <button
              onClick={() => setSwappingIdx(swappingIdx === idx ? null : idx)}
              className="w-full text-left bg-gray-50 rounded-2xl p-4 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-gray-900">{ex.name}</span>
                    {idx === 0 && (
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
                <span className="text-gray-300 text-lg mt-1">⇄</span>
              </div>
            </button>

            {/* Swap panel */}
            {swappingIdx === idx && (
              <div className="bg-white border border-gray-100 rounded-2xl mt-1 p-3 shadow-sm">
                <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Austauschen mit:</div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {candidates.filter(c => c.id !== ex.id).map(c => (
                    <button
                      key={c.id}
                      onClick={() => swapExercise(idx, c)}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-50 active:bg-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.pattern}</div>
                      </div>
                      <span className="text-gray-300">→</span>
                    </button>
                  ))}
                  {candidates.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-3">Alle Übungen bereits im Workout</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pt-3">
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
