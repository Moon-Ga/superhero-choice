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

const getProvider = (provider: string) => {
  switch (provider) {
    case 'Google':
      return new GoogleAuthProvider();
    case 'GitHub':
      return new GithubAuthProvider();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};

export const providerLogin = (provider: string) => {
  const authProvider = getProvider(provider);
  return signInWithPopup(auth, authProvider);
};

export const logout = () => {
  signOut(auth);
};

export const onAuthChange = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // onChange(user);
      return user;
    }
    // onChange('Guest');
    return 'Guest';
  });
};
