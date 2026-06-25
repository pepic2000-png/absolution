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

  async function setExerciseMedia(exerciseId, url, type = 'youtube', frames = null, sameAsEasy = false) {
    const data = { url, type, updatedAt: new Date().toISOString() }
    if (frames) data.frames = frames
    if (sameAsEasy) data.sameAsEasy = true
    await setDoc(doc(db, 'exerciseMedia', exerciseId), data)
  }

  async function removeExerciseMedia(exerciseId) {
    await deleteDoc(doc(db, 'exerciseMedia', exerciseId))
  }

  return { media, loading, setExerciseMedia, removeExerciseMedia }
}
