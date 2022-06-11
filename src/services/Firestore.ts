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
    const docRef = doc(db, 'rankings', 'statistics');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().data) {
        const itemIndex = docSnap
          .data()
          .data.findIndex((data: Selected) => data.heroId === heroId);
        if (itemIndex !== -1) {
          const newArray = [...docSnap.data().data];
          newArray[itemIndex] = {
            heroId,
            count: newArray[itemIndex].count + 1,
          };
          await updateDoc(docRef, { data: newArray });
        } else {
          const newArray = [...docSnap.data().data, { heroId, count: 1 }];
          await updateDoc(docRef, { data: newArray });
        }
      }
    } else {
      await setDoc(docRef, { data: [{ heroId, count: 1 }] });
    }
  }

  static async getRankings() {
    const docRef = doc(db, 'rankings', 'statistics');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().data) {
        return docSnap.data().data;
      }
    }
    return null;
  }
}
