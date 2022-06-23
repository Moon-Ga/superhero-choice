import { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<unknown> {
  theme: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}
function Button({
  theme,
  type = 'button',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        styles.button,
        styles[theme],
        styles[size],
        props.className
      )}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

export default Button;
