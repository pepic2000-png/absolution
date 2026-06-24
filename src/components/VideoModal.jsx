export default function VideoModal({ url, type, onClose }) {
  function getYouTubeId(u) {
    const m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return m ? m[1] : null
  }

  const ytId = type === 'youtube' ? getYouTubeId(url) : null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-white font-semibold">Video</span>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">✕</button>
      </div>

      <div className="flex-1 flex items-center justify-center px-2">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&playsinline=1`}
            className="w-full rounded-xl"
            style={{ aspectRatio: '16/9' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            playsInline
            className="w-full rounded-xl"
            style={{ maxHeight: '70vh' }}
          />
        )}
      </div>
    </div>
  )
}
