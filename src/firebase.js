import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCh9O0Qqzup0c2j-mNpvdwy64osv1c0N6k",
    authDomain: "networkintrusion-f471b.firebaseapp.com",
    projectId: "networkintrusion-f471b",
    storageBucket: "networkintrusion-f471b.firebasestorage.app",
    messagingSenderId: "166706690702",
    appId: "1:166706690702:web:96669381e3f429ab2e27df",
    measurementId: "G-W82BSKXCTY"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);

  export default app;