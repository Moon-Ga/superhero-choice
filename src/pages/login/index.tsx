import { useState } from 'react';
import { providerLogin } from 'services/Auth';
import Firestore from 'services/Firestore';
import styles from './login.module.scss';

function Login() {
  const [onLogin, setOnLogin] = useState<boolean>(false);
  const firestore = new Firestore();

  const loginWithProvider = (provider: string) => {
    providerLogin(provider).then((data) => {
      setOnLogin(true);
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
      };
      firestore.newUser(data.user.uid, userData);
    });
  };
  return <div />;
}

export default Login;
