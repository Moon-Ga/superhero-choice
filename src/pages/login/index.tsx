import { GithubIcon, GoogleIcon } from 'assets/svgs';
import cx from 'classnames';
import Button from 'components/common/Button';
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
    setOnLogin(true);

    const provider = e.currentTarget.dataset.provider as string;

    Auth.providerLogin(provider)
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
    <main className={cx(styles.login, { [styles.onLogin]: onLogin })}>
      <Button
        theme="secondary"
        className={styles.returnButton}
        onClick={onReturnButtonClick}
      >
        이전으로
      </Button>
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
