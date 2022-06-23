import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './confirm.module.scss';

type ConfirmProps = {
  children: ReactNode;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};
function Confirm({ children, setShowConfirm }: ConfirmProps) {
  const modalRoot = useRef<HTMLDivElement>(document.querySelector('#modal'));
  const bodyRef = useRef<HTMLBodyElement>(document.querySelector('body'))
    .current as unknown as HTMLBodyElement;

  const onToggleClick = () => {
    setShowConfirm(false);
    bodyRef.style.overflow = '';
  };

  return createPortal(
    <div className={styles.confirm}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        <div className={styles.select}>
          <button type="button" className={styles.yes} onClick={onToggleClick}>
            YES
          </button>
          <button type="button" className={styles.no} onClick={onToggleClick}>
            NO
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current as HTMLDivElement
  );
}

export default Confirm;
