import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAUg8igDBo7PHHud_6lcq8OmpgyUcBeUh0',
  authDomain: 'absolution-41c9d.firebaseapp.com',
  projectId: 'absolution-41c9d',
  storageBucket: 'absolution-41c9d.firebasestorage.app',
  messagingSenderId: '762723308610',
  appId: '1:762723308610:web:4423941bc3ed8b1c1289db',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
