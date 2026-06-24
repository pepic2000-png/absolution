import { useState } from 'react'

const PASSWORD = 'PainIsGain!'

export default function LockScreen({ onUnlock }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem('corefit_unlocked', '1')
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center bg-white"
      style={{
        height: '100dvh',
        paddingTop: 'max(24px, env(safe-area-inset-top))',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="w-full max-w-xs px-6 text-center">
        <div className="text-5xl mb-6">💪</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Core Workout</h1>
        <p className="text-gray-400 text-sm mb-10">Passwort eingeben</p>

        <form onSubmit={handleSubmit}>
          <div
            className="mb-4"
            style={{
              animation: shake ? 'shake 0.4s ease' : 'none',
            }}
          >
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              placeholder="Passwort"
              autoFocus
              className="w-full bg-gray-50 border rounded-2xl px-4 py-4 text-center text-lg outline-none transition-colors"
              style={{
                borderColor: error ? '#D85A30' : '#e5e5e5',
                borderWidth: '2px',
              }}
            />
            {error && (
              <p className="text-sm mt-2" style={{ color: '#D85A30' }}>
                Falsches Passwort
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl active:opacity-90"
          >
            Entsperren
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
