import { GithubIcon, GoogleIcon } from 'assets/svgs';
import { useRecoil } from 'hooks';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from 'services/Auth';
import { Firestore } from 'services/Firestore';
import { CurrentUserState } from 'states';

import styles from './login.module.scss';

function Login() {
  const [onLogin, setOnLogin] = useState<boolean>(false);

  const [currentUser] = useRecoil(CurrentUserState);

  const navigate = useNavigate();

  const loginWithProvider = (e: MouseEvent<SVGSVGElement>) => {
    if (onLogin) return null;

    setOnLogin(true);

    const provider = e.currentTarget.dataset.provider as string;

    return Auth.providerLogin(provider)
      .then((data) => {
        const userData = {
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
        };
        Firestore.newUser(data.user.uid, userData);
      })
      .catch(() => {
        setOnLogin(false);
      });
  };

  const onReturnButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (currentUser.name) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <main className={styles.login}>
      {onLogin && <div>로그인 중...</div>}
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
