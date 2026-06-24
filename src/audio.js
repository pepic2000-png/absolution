// Volume is shared across all sounds (0 = mute, 1 = full)
let volume = 0.5
let ctx = null
// Silent HTML audio element — forces iOS audio session to "playback" category
// so sounds bypass the silent/ring switch
let silentEl = null

function ensureSilentElement() {
  if (silentEl) return
  // 1-sample silent WAV as data URI
  silentEl = document.createElement('audio')
  silentEl.src =
    'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
  silentEl.loop = true
  silentEl.volume = 0.001
  silentEl.play().catch(() => {})
}

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function beep(freq, duration, type = 'sine', gainMul = 1, delay = 0) {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gainNode = ac.createGain()
  osc.connect(gainNode)
  gainNode.connect(ac.destination)
  osc.type = type
  osc.frequency.value = freq
  const g = gainMul * volume
  gainNode.gain.setValueAtTime(0, ac.currentTime + delay)
  gainNode.gain.linearRampToValueAtTime(g, ac.currentTime + delay + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration)
  osc.start(ac.currentTime + delay)
  osc.stop(ac.currentTime + delay + duration + 0.05)
}

// Call on first user gesture to unlock iOS audio
export function unlockAudio() {
  ensureSilentElement()
  getCtx()
}

export function setVolume(v) {
  volume = Math.max(0, Math.min(1, v))
}

export function getVolume() {
  return volume
}

export const sounds = {
  variantStart() {
    beep(220, 0.15, 'sine', 0.7)
  },
  variantChange() {
    beep(440, 0.1, 'sine', 0.6)
    beep(550, 0.15, 'sine', 0.5, 0.1)
  },
  countdownBeep() {
    beep(880, 0.08, 'square', 0.4)
  },
  burnoutStart() {
    beep(180, 0.12, 'sawtooth', 0.8)
    beep(240, 0.12, 'sawtooth', 0.7, 0.1)
    beep(320, 0.2, 'sawtooth', 0.8, 0.2)
  },
  fanfare() {
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => beep(freq, 0.3, 'sine', 0.6, i * 0.15))
  },
}
