import { useState, useEffect } from 'react'
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function useGlobalExercises() {
  const [globalExercises, setGlobalExercises] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'globalExercises'), snap => {
      setGlobalExercises(snap.docs.map(d => ({ ...d.data(), id: d.id })))
    })
    return unsub
  }, [])

  async function addGlobalExercise(exercise) {
    await addDoc(collection(db, 'globalExercises'), { ...exercise, createdAt: serverTimestamp() })
  }

  async function removeGlobalExercise(id) {
    await deleteDoc(doc(db, 'globalExercises', id))
  }

  return { globalExercises, addGlobalExercise, removeGlobalExercise }
}
