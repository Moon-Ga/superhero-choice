import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { firebaseApp } from './Firebase';

const db = getFirestore(firebaseApp);

export class Firestore {
  static async newUser(uid: string, userData: object) {
    const docRef = doc(db, 'users', uid);
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
      await updateDoc(docRef, { [item]: data });
    }
  }

  static async addRankings(heroId: number) {
    const docRef = doc(db, 'rankings', heroId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, { count: docSnap.data().count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
  }

  static async getRankings() {
    const collectionRef = collection(db, 'rankings');
    const docSnap = await getDocs(collectionRef);
    if (!docSnap.empty) {
      const array: Selected[] = [];
      docSnap.forEach((document) => {
        const data = {
          heroId: Number(document.id),
          count: document.data().count,
        };
        array.push(data);
      });
      return array;
    }
    return null;
  }
}
