import Button from 'components/common/Button';
import { useRecoil } from 'hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from 'services/Auth';
import { CurrentUserState } from 'states';
import cx from 'classnames';

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

  const navItems = [
    { path: '/', label: 'Choice' },
    { path: '/rankings', label: 'Rankings' },
  ];

  const loginLabel = currentUser.name ? 'Logout' : 'Login';
  const buttonClassName = currentUser.name ? 'user' : '';

  return (
    <header className={styles.gnb}>
      <nav className={styles.navigation}>
        {navItems.map((navItem) => (
          <NavLink
            key={navItem.label}
            to={navItem.path}
            className={({ isActive }) =>
              cx(styles.navItem, { [styles.active]: isActive })
            }
          >
            {navItem.label}
          </NavLink>
        ))}
      </nav>
      <Button
        theme="primary"
        onClick={onLogoutClick}
        className={styles[buttonClassName]}
      >
        {loginLabel}
      </Button>
    </header>
  );
}

export default GNB;
