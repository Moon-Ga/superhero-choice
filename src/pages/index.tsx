import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import store from 'store';

import MainLayout from 'layouts/MainLayout';
import Choice from './choice';
import Rankings from './rankings';

import styles from './app.module.scss';

function App() {
  useEffect(() => {
    if (!store.get('selectedHeroes')) {
      store.set('selectedHeroes', []);
    }
  }, []);

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
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
