import { useState, useRef } from 'react'
import { EXERCISES } from '../exercises'
import ExerciseForm from '../components/ExerciseForm'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function AdminScreen({
  sharedPlans, onPublishPlan, onUnpublishPlan,
  media, onSetMedia, onRemoveMedia,
  localPlans, onBack,
  globalExercises, onAddGlobalExercise, onRemoveGlobalExercise,
}) {
  const [tab, setTab] = useState('plans')
  const [publishing, setPublishing] = useState(null)
  const [publishName, setPublishName] = useState('')
  const [editingMedia, setEditingMedia] = useState(null)
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaType, setMediaType] = useState('youtube')
  const [frameUrl1, setFrameUrl1] = useState('')
  const [frameUrl2, setFrameUrl2] = useState('')
  const [uploadProgress, setUploadProgress] = useState({}) // { '1': 0-100, '2': 0-100 }
  const [saving, setSaving] = useState(false)
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const fileInput1 = useRef(null)
  const fileInput2 = useRef(null)

  async function uploadImage(file, slot, exerciseId) {
    const ext = file.name.split('.').pop()
    const path = `exerciseMedia/${exerciseId}/frame${slot}.${ext}`
    const storageRef = ref(storage, path)
    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file)
      task.on('state_changed',
        snap => setUploadProgress(p => ({ ...p, [slot]: Math.round(snap.bytesTransferred / snap.totalBytes * 100) })),
        reject,
        async () => { resolve(await getDownloadURL(task.snapshot.ref)) }
      )
    })
  }

  async function handleFileSelect(e, slot) {
    const file = e.target.files[0]
    if (!file || !editingMedia) return
    setUploadProgress(p => ({ ...p, [slot]: 0 }))
    try {
      const url = await uploadImage(file, slot, editingMedia)
      if (slot === 1) setFrameUrl1(url)
      else setFrameUrl2(url)
    } catch {
      alert('Upload fehlgeschlagen')
    }
    setUploadProgress(p => { const n = { ...p }; delete n[slot]; return n })
  }

  async function handlePublish(plan) {
    if (!publishName.trim()) return
    setSaving(true)
    await onPublishPlan(publishName.trim(), plan.exercises.map(id => ({ id })), plan.config)
    setSaving(false)
    setPublishing(null)
    setPublishName('')
  }

  async function handleSaveMedia(mediaKey) {
    const key = mediaKey || editingMedia
    if (!key) return
    if (mediaType === 'frames') {
      if (!frameUrl1.trim() || !frameUrl2.trim()) return
      setSaving(true)
      await onSetMedia(key, frameUrl1.trim(), 'frames', [frameUrl1.trim(), frameUrl2.trim()])
    } else {
      if (!mediaUrl.trim()) return
      setSaving(true)
      await onSetMedia(key, mediaUrl.trim(), mediaType)
    }
    setSaving(false)
    setEditingMedia(null)
    setMediaUrl('')
    setFrameUrl1('')
    setFrameUrl2('')
    setUploadProgress({})
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
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-3">Bilder/Video pro Variante. Alle Nutzer sehen die Medien.</p>
            {allExercisesForVideo.map(ex => {
              const levels = ['easy','medium','hard','maximum','weighted']
              const exVariants = ex.variants?.filter(v => levels.includes(v.level)) || []
              if (exVariants.length === 0) return null
              return (
                <div key={ex.id} className="bg-gray-50 rounded-2xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <div className="font-semibold text-gray-800 text-sm">{ex.name}</div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {exVariants.map(v => {
                      const mediaKey = `${ex.id}__${v.level}`
                      const m = media[mediaKey]
                      const isEditing = editingMedia === mediaKey
                      const easyMedia = media[`${ex.id}__easy`]
                      const LEVEL_LABELS = { easy:'Leicht', medium:'Mittel', hard:'Schwer', maximum:'Maximum', weighted:'Gewicht' }
                      const LEVEL_COLORS = { easy:'#639922', medium:'#378ADD', hard:'#D85A30', maximum:'#7F77DD', weighted:'#7F77DD' }
                      const col = LEVEL_COLORS[v.level] || '#666'
                      return (
                        <div key={v.level}>
                          <div className="flex items-center gap-3 px-4 py-2.5">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg flex-shrink-0"
                              style={{ backgroundColor: col + '18', color: col }}>
                              {LEVEL_LABELS[v.level]}
                            </span>
                            <div className="flex-1 min-w-0">
                              {m?.sameAsEasy ? (
                                <div className="text-xs text-blue-500">↩ Gleich wie Leicht</div>
                              ) : m ? (
                                <div className="text-xs text-green-600">✓ {m.type === 'frames' ? 'Bilder' : m.type === 'youtube' ? 'YouTube' : 'Video'}</div>
                              ) : (
                                <div className="text-xs text-gray-400">Keine Medien</div>
                              )}
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
                              {m && !m.sameAsEasy && (
                                <button onClick={() => onRemoveMedia(mediaKey)}
                                  className="text-red-400 text-xs px-2 py-1 rounded-lg active:bg-red-50">✕</button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingMedia(isEditing ? null : mediaKey)
                                  setMediaUrl(m?.url || '')
                                  setMediaType(m?.type || 'frames')
                                  setFrameUrl1(m?.frames?.[0] || '')
                                  setFrameUrl2(m?.frames?.[1] || '')
                                }}
                                className="text-xs font-medium text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-lg active:bg-gray-50">
                                {m ? 'Ändern' : '+ Medien'}
                              </button>
                            </div>
                          </div>
                          {isEditing && (
                            <div className="bg-white border-t border-gray-100 p-3 space-y-2">
                              {/* Same as easy checkbox — only for non-easy variants that have easy media */}
                              {v.level !== 'easy' && easyMedia && !easyMedia.sameAsEasy && (
                                <button
                                  onClick={async () => {
                                    setSaving(true)
                                    await onSetMedia(mediaKey, '', 'sameAsEasy', null, true)
                                    setSaving(false)
                                    setEditingMedia(null)
                                  }}
                                  className="w-full flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-sm text-blue-700 font-medium active:bg-blue-100">
                                  <span className="text-base">☑</span>
                                  Gleiche Bilder wie Leicht verwenden
                                </button>
                              )}
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
                                  {[['1', 'Startposition', frameUrl1, setFrameUrl1, fileInput1],
                                    ['2', 'Endposition',   frameUrl2, setFrameUrl2, fileInput2]].map(([slot, label, url, setUrl, inputRef]) => (
                                    <div key={slot} className="space-y-1">
                                      <div className="text-xs font-medium text-gray-500">{label}</div>
                                      <div className="flex gap-2">
                                        <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                                          placeholder="https://... oder Foto hochladen"
                                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 min-w-0" />
                                        <button onClick={() => inputRef.current?.click()}
                                          className="flex-shrink-0 bg-gray-100 px-3 py-2 rounded-xl text-sm font-semibold active:bg-gray-200">
                                          📁
                                        </button>
                                        <input ref={inputRef} type="file" accept="image/*" className="hidden"
                                          onChange={e => handleFileSelect(e, Number(slot))} />
                                      </div>
                                      {uploadProgress[slot] !== undefined && (
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                          <div className="bg-gray-900 h-1.5 rounded-full transition-all"
                                            style={{ width: `${uploadProgress[slot]}%` }} />
                                        </div>
                                      )}
                                      {url && !uploadProgress[slot] && (
                                        <img src={url} alt={label} className="w-full h-24 object-contain rounded-xl bg-gray-50" />
                                      )}
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)}
                                    placeholder={mediaType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...mp4'}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                                  {mediaType === 'youtube' && mediaUrl && getYouTubeId(mediaUrl) && (
                                    <div className="text-xs text-green-600">✓ YouTube-ID: {getYouTubeId(mediaUrl)}</div>
                                  )}
                                </>
                              )}
                              <button onClick={() => handleSaveMedia(mediaKey)}
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
