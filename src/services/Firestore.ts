import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from './Firebase';

export const db = getFirestore(firebaseApp);
