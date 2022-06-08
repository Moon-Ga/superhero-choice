import {
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from './Firebase';

const db = getFirestore(firebaseApp);

export default class Firestore {
  static async newUser(userid: string, userData: object) {
    const docRef = doc(db, 'users', userid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, userData);
    }
  }

  static async fetchUser(
    userid: string,
    updateState: (el: DocumentData | undefined) => void
  ) {
    const docRef = doc(db, 'users', userid);
    await onSnapshot(docRef, (document) => {
      updateState(document.data());
    });
  }

  static async updateUser(userid: string, item: string, data: object) {
    const docRef = doc(db, 'users', userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await console.log(docSnap.data());
      updateDoc(docRef, { [item]: data });
    }
  }
}
