import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import Auth from 'services/Auth';
import { useRecoil } from 'hooks';
import { CurrentUserState } from 'states';

import { CloseIcon, HamburgerButtonIcon } from 'assets/svgs';
import Button from 'components/common/Button';

import styles from './gnb.module.scss';

function GNB() {
  const [currentUser] = useRecoil(CurrentUserState);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const onToggleClick = () => {
    setIsVisible((prev) => !prev);
  };

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
    <>
      <HamburgerButtonIcon
        className={cx(styles.menuButton, styles.navButton)}
        onClick={onToggleClick}
      />
      <header className={cx(styles.gnb, { [styles.invisible]: !isVisible })}>
        <CloseIcon
          className={cx(styles.menuButton, styles.closeButton)}
          onClick={onToggleClick}
        />
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
    </>
  );
}

export default GNB;
