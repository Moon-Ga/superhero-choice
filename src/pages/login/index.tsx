import { GithubIcon, GoogleIcon } from 'assets/svgs';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from 'services/Auth';
import User from 'services/Firestore';

import styles from './login.module.scss';

function Login() {
  const [onLogin, setOnLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginWithProvider = (e: MouseEvent<SVGSVGElement>) => {
    const provider = e.currentTarget.dataset.provider as string;
    Auth.providerLogin(provider).then((data) => {
      setOnLogin(true);
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
      };
      User.newUser(data.user.uid, userData);
    });
    setOnLogin(false);
  };

  const onReturnButtonClick = () => {
    navigate(-1);
  };

  return (
    <main className={styles.login}>
      <button
        type="button"
        className={styles.returnButton}
        onClick={onReturnButtonClick}
      >
        이전으로
      </button>
      <div className={styles.title}>Superhero Choice</div>
      <div className={styles.description}>
        Welcome! Login for more features!
      </div>
      <div className={styles.socialLogin}>
        <GoogleIcon
          className={styles.icon}
          data-provider="Google"
          onClick={loginWithProvider}
        />
        <GithubIcon
          data-provider="GitHub"
          className={styles.icon}
          onClick={loginWithProvider}
        />
      </div>
    </main>
  );
}

export default Login;
