import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, deleteDoc,
  doc, serverTimestamp, query, where, orderBy
} from 'firebase/firestore'
import { db } from '../firebase'

export default function useSharedPlans() {
  const [sharedPlans, setSharedPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'sharedPlans'),
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, snap => {
      setSharedPlans(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  async function publishPlan(name, exercises, config) {
    await addDoc(collection(db, 'sharedPlans'), {
      name,
      exercises: exercises.map(e => e.id),
      config,
      active: true,
      createdAt: serverTimestamp(),
    })
  }

  async function unpublishPlan(id) {
    await deleteDoc(doc(db, 'sharedPlans', id))
  }

  return { sharedPlans, loading, publishPlan, unpublishPlan }
}
