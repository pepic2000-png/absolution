import { useState } from 'react'
import { EXERCISES } from '../exercises'

export default function AdminScreen({ sharedPlans, onPublishPlan, onUnpublishPlan, media, onSetMedia, onRemoveMedia, localPlans, onBack }) {
  const [tab, setTab] = useState('plans') // 'plans' | 'videos'
  const [publishing, setPublishing] = useState(null) // local plan being published
  const [publishName, setPublishName] = useState('')
  const [editingMedia, setEditingMedia] = useState(null) // exerciseId
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaType, setMediaType] = useState('youtube')
  const [saving, setSaving] = useState(false)

  async function handlePublish(plan) {
    if (!publishName.trim()) return
    setSaving(true)
    await onPublishPlan(publishName.trim(), plan.exercises.map(id => ({ id })), plan.config)
    setSaving(false)
    setPublishing(null)
    setPublishName('')
  }

  async function handleSaveMedia() {
    if (!mediaUrl.trim() || !editingMedia) return
    setSaving(true)
    await onSetMedia(editingMedia, mediaUrl.trim(), mediaType)
    setSaving(false)
    setEditingMedia(null)
    setMediaUrl('')
  }

  function getYouTubeId(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return m ? m[1] : null
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
      <div className="px-5 mb-4 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200">←</button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin</h1>
          <p className="text-xs text-gray-400">Pläne & Videos verwalten</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4 flex gap-2 flex-shrink-0">
        {['plans', 'videos'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: tab === t ? '#111' : '#f5f5f5', color: tab === t ? '#fff' : '#666' }}>
            {t === 'plans' ? '📋 Pläne teilen' : '🎬 Videos'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 min-h-0">

        {/* PLANS TAB */}
        {tab === 'plans' && (
          <div className="space-y-4">
            {/* Published plans */}
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

            {/* Local plans to publish */}
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
            <p className="text-xs text-gray-400 mb-3">YouTube-Link pro Übung eintragen. Alle Nutzer sehen das Video.</p>
            {EXERCISES.map(ex => {
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
                        }}
                        className="text-sm font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-xl active:bg-gray-50">
                        {m ? 'Ändern' : '+ Video'}
                      </button>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="bg-white border border-gray-100 rounded-xl p-3 mt-1 shadow-sm space-y-2">
                      <div className="flex gap-2">
                        {['youtube', 'video'].map(t => (
                          <button key={t} onClick={() => setMediaType(t)}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ backgroundColor: mediaType === t ? '#111' : '#f5f5f5', color: mediaType === t ? '#fff' : '#666' }}>
                            {t === 'youtube' ? '▶ YouTube' : '🎬 Video-URL'}
                          </button>
                        ))}
                      </div>
                      <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)}
                        placeholder={mediaType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...mp4'}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400" />
                      {mediaType === 'youtube' && mediaUrl && getYouTubeId(mediaUrl) && (
                        <div className="text-xs text-green-600">✓ YouTube-ID erkannt: {getYouTubeId(mediaUrl)}</div>
                      )}
                      <button onClick={handleSaveMedia} disabled={saving || !mediaUrl.trim()}
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
      </div>
    </div>
  )
}
