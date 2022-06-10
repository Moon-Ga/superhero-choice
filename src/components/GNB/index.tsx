import Button from 'components/common/Button';
import { useRecoil } from 'hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from 'services/Auth';
import { CurrentUserState } from 'states';

import styles from './gnb.module.scss';

function GNB() {
  const [currentUser] = useRecoil(CurrentUserState);

  const navigate = useNavigate();

  const onLogoutClick = () => {
    if (currentUser.name) {
      Auth.logout();
    } else {
      navigate('/login');
    }
  };

  const loginLabel = currentUser.name ? 'Logout' : 'Login';
  return (
    <header className={styles.gnb}>
      <nav className={styles.navigation}>
        <NavLink to="/">Choice</NavLink>
        <NavLink to="Rankings">Rankings</NavLink>
      </nav>
      <Button theme="primary" onClick={onLogoutClick}>
        {loginLabel}
      </Button>
    </header>
  );
}

export default GNB;
