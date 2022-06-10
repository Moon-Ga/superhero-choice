import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';
import Auth from 'services/Auth';
import { useRecoil } from 'hooks';
import { CurrentUserState } from 'states';
import Choice from './choice';
import Rankings from './rankings';

import styles from './app.module.scss';
import Login from './login';

function App() {
  const [, setCurrentUser, resetCurrentUser] = useRecoil(CurrentUserState);

  useEffect(() => {
    Auth.onAuthChange(setCurrentUser, resetCurrentUser);
  }, [resetCurrentUser, setCurrentUser]);

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route index element={<Choice />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="*" element={<Choice />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
