import { useState } from 'react'

const KEY = 'corefit_plans'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export default function useSavedPlans() {
  const [plans, setPlans] = useState(load)

  function savePlan(name, exercises, config) {
    const plan = {
      id: Date.now().toString(),
      name,
      savedAt: new Date().toLocaleDateString('de-DE'),
      exercises: exercises.map(e => e.id),
      config,
    }
    const next = [plan, ...plans.filter(p => p.name !== name)]
    localStorage.setItem(KEY, JSON.stringify(next))
    setPlans(next)
    return plan
  }

  function deletePlan(id) {
    const next = plans.filter(p => p.id !== id)
    localStorage.setItem(KEY, JSON.stringify(next))
    setPlans(next)
  }

  return { plans, savePlan, deletePlan }
}
