import { useState } from 'react'

const KEY = 'corefit_local_exercises'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export default function useLocalExercises() {
  const [localExercises, setLocalExercises] = useState(load)

  function addLocalExercise(exercise) {
    const ex = { ...exercise, id: `local-${Date.now()}` }
    const next = [...localExercises, ex]
    localStorage.setItem(KEY, JSON.stringify(next))
    setLocalExercises(next)
  }

  function removeLocalExercise(id) {
    const next = localExercises.filter(e => e.id !== id)
    localStorage.setItem(KEY, JSON.stringify(next))
    setLocalExercises(next)
  }

  return { localExercises, addLocalExercise, removeLocalExercise }
}
