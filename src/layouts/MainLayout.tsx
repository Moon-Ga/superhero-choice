import { Outlet } from 'react-router-dom';

import GNB from 'components/GNB';

import styles from './mainLayout.module.scss';

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <GNB />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
