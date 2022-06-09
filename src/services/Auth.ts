import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';
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

  static onAuthChange = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // onChange(user);
        return user;
      }
      // onChange('Guest');
      return 'Guest';
    });
  };
}
