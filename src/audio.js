let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function beep(freq, duration, type = 'sine', gain = 0.3, delay = 0) {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gainNode = ac.createGain()
  osc.connect(gainNode)
  gainNode.connect(ac.destination)
  osc.type = type
  osc.frequency.value = freq
  gainNode.gain.setValueAtTime(0, ac.currentTime + delay)
  gainNode.gain.linearRampToValueAtTime(gain, ac.currentTime + delay + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration)
  osc.start(ac.currentTime + delay)
  osc.stop(ac.currentTime + delay + duration + 0.05)
}

export const sounds = {
  variantStart() {
    beep(220, 0.15, 'sine', 0.35)
  },
  variantChange() {
    beep(440, 0.1, 'sine', 0.3)
    beep(550, 0.15, 'sine', 0.25, 0.1)
  },
  countdownBeep() {
    beep(880, 0.08, 'square', 0.2)
  },
  burnoutStart() {
    beep(180, 0.12, 'sawtooth', 0.4)
    beep(240, 0.12, 'sawtooth', 0.35, 0.1)
    beep(320, 0.2, 'sawtooth', 0.4, 0.2)
  },
  fanfare() {
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => beep(freq, 0.3, 'sine', 0.3, i * 0.15))
  },
}
