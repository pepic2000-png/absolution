import { useState } from 'react'
import { EXERCISES } from '../exercises'
import ExerciseForm from '../components/ExerciseForm'

export default function AdminScreen({
  sharedPlans, onPublishPlan, onUnpublishPlan,
  media, onSetMedia, onRemoveMedia,
  localPlans, onBack,
  globalExercises, onAddGlobalExercise, onRemoveGlobalExercise,
}) {
  const [tab, setTab] = useState('plans') // 'plans' | 'videos' | 'exercises'
  const [publishing, setPublishing] = useState(null)
  const [publishName, setPublishName] = useState('')
  const [editingMedia, setEditingMedia] = useState(null)
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaType, setMediaType] = useState('youtube')
  const [frameUrl1, setFrameUrl1] = useState('')
  const [frameUrl2, setFrameUrl2] = useState('')
  const [saving, setSaving] = useState(false)
  const [showExerciseForm, setShowExerciseForm] = useState(false)

  async function handlePublish(plan) {
    if (!publishName.trim()) return
    setSaving(true)
    await onPublishPlan(publishName.trim(), plan.exercises.map(id => ({ id })), plan.config)
    setSaving(false)
    setPublishing(null)
    setPublishName('')
  }

  async function handleSaveMedia() {
    if (!editingMedia) return
    if (mediaType === 'frames') {
      if (!frameUrl1.trim() || !frameUrl2.trim()) return
      setSaving(true)
      await onSetMedia(editingMedia, frameUrl1.trim(), 'frames', [frameUrl1.trim(), frameUrl2.trim()])
    } else {
      if (!mediaUrl.trim()) return
      setSaving(true)
      await onSetMedia(editingMedia, mediaUrl.trim(), mediaType)
    }
    setSaving(false)
    setEditingMedia(null)
    setMediaUrl('')
    setFrameUrl1('')
    setFrameUrl2('')
  }

  async function handleAddGlobalExercise(exercise) {
    setSaving(true)
    await onAddGlobalExercise(exercise)
    setSaving(false)
    setShowExerciseForm(false)
  }

  function getYouTubeId(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return m ? m[1] : null
  }

  const allExercisesForVideo = [...EXERCISES, ...(globalExercises || [])]

  return (
    <div className="flex flex-col bg-white screen-enter"
      style={{
        height: '100%',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Header */}
      <div className="px-5 mb-4 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200">←</button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin</h1>
          <p className="text-xs text-gray-400">Pläne, Videos & Übungen verwalten</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4 flex gap-2 flex-shrink-0">
        {[
          { key: 'plans', label: '📋 Pläne' },
          { key: 'videos', label: '🎬 Videos' },
          { key: 'exercises', label: '💪 Übungen' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors"
            style={{ backgroundColor: tab === t.key ? '#111' : '#f5f5f5', color: tab === t.key ? '#fff' : '#666' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 min-h-0">

        {/* PLANS TAB */}
        {tab === 'plans' && (
          <div className="space-y-4">
            {sharedPlans.length > 0 && (
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Geteilte Pläne</div>
                <div className="space-y-2">
                  {sharedPlans.map(plan => (
                    <div key={plan.id} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                      <span className="text-lg">🌐</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{plan.name}</div>
                        <div className="text-xs text-gray-500">{plan.exercises?.length} Übungen · für alle sichtbar</div>
                      </div>
                      <button onClick={() => onUnpublishPlan(plan.id)}
                        className="text-red-400 text-sm font-medium px-2 py-1 rounded-lg active:bg-red-50">
                        Entfernen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Lokale Pläne veröffentlichen</div>
              {localPlans.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">Keine lokalen Pläne gespeichert</p>
              )}
              <div className="space-y-2">
                {localPlans.map(plan => (
                  <div key={plan.id}>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{plan.name}</div>
                        <div className="text-xs text-gray-500">{plan.exercises?.length} Übungen</div>
                      </div>
                      <button
                        onClick={() => { setPublishing(plan); setPublishName(plan.name) }}
                        className="text-sm font-semibold text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl active:bg-gray-50">
                        Teilen 🌐
                      </button>
                    </div>
                    {publishing?.id === plan.id && (
                      <div className="bg-white border border-gray-100 rounded-xl p-3 mt-1 shadow-sm">
                        <div className="text-xs text-gray-400 mb-2">Name für geteilten Plan:</div>
                        <div className="flex gap-2">
                          <input type="text" value={publishName} onChange={e => setPublishName(e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                          <button onClick={() => handlePublish(plan)} disabled={saving || !publishName.trim()}
                            className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-40">
                            {saving ? '...' : 'OK'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {tab === 'videos' && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 mb-3">YouTube-Link pro Übung. Alle Nutzer sehen das Video.</p>
            {allExercisesForVideo.map(ex => {
              const m = media[ex.id]
              const isEditing = editingMedia === ex.id
              return (
                <div key={ex.id}>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm">{ex.name}</div>
                      {m ? (
                        <div className="text-xs text-green-600 truncate">✓ Video vorhanden</div>
                      ) : (
                        <div className="text-xs text-gray-400">Kein Video</div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {m && (
                        <button onClick={() => onRemoveMedia(ex.id)}
                          className="text-red-400 text-xs px-2 py-1 rounded-lg active:bg-red-50">✕</button>
                      )}
                      <button
                        onClick={() => {
                          setEditingMedia(isEditing ? null : ex.id)
                          setMediaUrl(m?.url || '')
                          setMediaType(m?.type || 'youtube')
                          setFrameUrl1(m?.frames?.[0] || '')
                          setFrameUrl2(m?.frames?.[1] || '')
                        }}
                        className="text-sm font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-xl active:bg-gray-50">
                        {m ? 'Ändern' : '+ Video'}
                      </button>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="bg-white border border-gray-100 rounded-xl p-3 mt-1 shadow-sm space-y-2">
                      <div className="flex gap-1.5">
                        {[['youtube','▶ YouTube'],['video','🎬 Video'],['frames','🖼 Bilder']].map(([t, label]) => (
                          <button key={t} onClick={() => setMediaType(t)}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ backgroundColor: mediaType === t ? '#111' : '#f5f5f5', color: mediaType === t ? '#fff' : '#666' }}>
                            {label}
                          </button>
                        ))}
                      </div>
                      {mediaType === 'frames' ? (
                        <>
                          <input type="text" value={frameUrl1} onChange={e => setFrameUrl1(e.target.value)}
                            placeholder="URL Startposition (https://...jpg)"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                          <input type="text" value={frameUrl2} onChange={e => setFrameUrl2(e.target.value)}
                            placeholder="URL Endposition (https://...jpg)"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                        </>
                      ) : (
                        <>
                          <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)}
                            placeholder={mediaType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...mp4'}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                          {mediaType === 'youtube' && mediaUrl && getYouTubeId(mediaUrl) && (
                            <div className="text-xs text-green-600">✓ YouTube-ID erkannt: {getYouTubeId(mediaUrl)}</div>
                          )}
                        </>
                      )}
                      <button onClick={handleSaveMedia}
                        disabled={saving || (mediaType === 'frames' ? !frameUrl1.trim() || !frameUrl2.trim() : !mediaUrl.trim())}
                        className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40">
                        {saving ? 'Speichern...' : 'Speichern'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* EXERCISES TAB */}
        {tab === 'exercises' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Globale Übungen ({(globalExercises || []).length})</div>
              {!showExerciseForm && (
                <button onClick={() => setShowExerciseForm(true)}
                  className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl active:bg-gray-200">
                  + Neue Übung
                </button>
              )}
            </div>

            {showExerciseForm && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="font-semibold text-gray-800 mb-3">Neue globale Übung</div>
                <ExerciseForm
                  onSave={handleAddGlobalExercise}
                  onCancel={() => setShowExerciseForm(false)}
                  submitLabel={saving ? 'Speichern...' : 'Global speichern 🌐'}
                />
              </div>
            )}

            {(globalExercises || []).length === 0 && !showExerciseForm && (
              <p className="text-sm text-gray-400 text-center py-6">Noch keine globalen Übungen hinzugefügt</p>
            )}

            <div className="space-y-2">
              {(globalExercises || []).map(ex => (
                <div key={ex.id} className="flex items-start gap-3 bg-blue-50 rounded-xl px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm">{ex.name}</div>
                    <div className="text-xs text-gray-500">{ex.pattern} · {ex.variants?.length} Varianten</div>
                    <div className="text-xs text-blue-500 mt-0.5">🌐 Global sichtbar</div>
                  </div>
                  <button onClick={() => onRemoveGlobalExercise(ex.id)}
                    className="text-red-400 text-sm px-2 py-1 rounded-lg flex-shrink-0 active:bg-red-50">✕</button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Basis-Übungen ({EXERCISES.length})</div>
              <div className="space-y-1.5">
                {EXERCISES.map(ex => (
                  <div key={ex.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-700 text-sm">{ex.name}</div>
                      <div className="text-xs text-gray-400">{ex.pattern}</div>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">{ex.variants.length} Var.</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
