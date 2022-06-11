import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';
import { Resetter, SetterOrUpdater } from 'recoil';
import { firebaseApp } from './Firebase';

const auth = getAuth(firebaseApp);

export default class Auth {
  static getProvider = (provider: string) => {
    switch (provider) {
      case 'Google':
        return new GoogleAuthProvider();
      case 'GitHub':
        return new GithubAuthProvider();
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  };

  static providerLogin = (provider: string) => {
    const authProvider = this.getProvider(provider);
    return signInWithPopup(auth, authProvider);
  };

  static logout = () => {
    signOut(auth);
  };

  static onAuthChange = (
    setUserState: SetterOrUpdater<{
      name: string;
      email: string;
      imageURL: string;
      uid: string;
    }>,
    resetUserState: Resetter
  ) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          name: user.displayName as string,
          email: user.email as string,
          imageURL: user.photoURL as string,
          uid: user.uid as string,
        };
        setUserState(userData);
      } else {
        resetUserState();
      }
    });
  };
}
