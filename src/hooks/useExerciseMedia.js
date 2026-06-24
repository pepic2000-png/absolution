import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function useExerciseMedia() {
  const [media, setMedia] = useState({}) // { exerciseId: { url, type } }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'exerciseMedia'), snap => {
      const map = {}
      snap.docs.forEach(d => { map[d.id] = d.data() })
      setMedia(map)
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  async function setExerciseMedia(exerciseId, url, type = 'youtube') {
    await setDoc(doc(db, 'exerciseMedia', exerciseId), { url, type, updatedAt: new Date().toISOString() })
  }

  async function removeExerciseMedia(exerciseId) {
    await deleteDoc(doc(db, 'exerciseMedia', exerciseId))
  }

  return { media, loading, setExerciseMedia, removeExerciseMedia }
}
