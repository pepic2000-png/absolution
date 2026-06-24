import { useState, useEffect, useRef } from 'react'

export default function useTimer(initialSeconds, onTick, onComplete, running = true) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const ref = useRef({ seconds: initialSeconds, running })

  useEffect(() => {
    ref.current.seconds = initialSeconds
    setSeconds(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    ref.current.running = running
  }, [running])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref.current.running) return
      const next = ref.current.seconds - 1
      ref.current.seconds = next
      setSeconds(next)
      if (onTick) onTick(next)
      if (next <= 0) {
        clearInterval(interval)
        if (onComplete) onComplete()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return seconds
}
