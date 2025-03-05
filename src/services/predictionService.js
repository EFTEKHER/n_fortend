import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';

export const savePrediction = async (predictionData) => {
  try {
    await addDoc(collection(db, 'predictions'), {
      ...predictionData,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving prediction: ", error);
    throw error;
  }
};

export const getPredictions = (callback) => {
  const q = query(collection(db, 'predictions'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const predictions = [];
    snapshot.forEach((doc) => {
      predictions.push({ id: doc.id, ...doc.data() });
    });
    callback(predictions);
  });
};