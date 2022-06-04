import { NavLink } from 'react-router-dom';
import styles from './gnb.module.scss';

function GNB() {
  return (
    <header className={styles.gnb}>
      <nav className={styles.navigation}>
        <NavLink to="/">Choice</NavLink>
        <NavLink to="Rankings">Rankings</NavLink>
      </nav>
    </header>
  );
}

export default GNB;
