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

  static async getComments(
    heroId: number,
    updateComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
  ) {
    const docRef = doc(db, 'comments', heroId.toString());
    await onSnapshot(docRef, (document) => {
      if (document.exists()) {
        updateComments(document.data().data);
      }
    });
  }

  static async addComment(heroId: number, userInfo: UserInfo, comment: string) {
    const docRef = doc(db, 'comments', heroId.toString());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        data: [{ userId: userInfo.uid, name: userInfo.name, comment }],
      });
    } else {
      await updateDoc(docRef, {
        data: [
          ...docSnap.data().data,
          { userId: userInfo.uid, name: userInfo.name, comment },
        ],
      });
    }
  }

  static async deleteComment(heroId: number, index: number) {
    const docRef = doc(db, 'comments', heroId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const filtered = docSnap
        .data()
        .data.filter((item: CommentItem, idx: number) => {
          return index !== idx;
        });
      await updateDoc(docRef, { data: filtered });
    }
  }
}
