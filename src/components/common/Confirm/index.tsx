import { MouseEvent, MouseEventHandler, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './confirm.module.scss';

type ConfirmProps = {
  children: ReactNode;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
};
function Confirm({ children, setShowConfirm, onConfirmClick }: ConfirmProps) {
  const modalRoot = useRef<HTMLDivElement>(document.querySelector('#modal'));
  const bodyRef = useRef<HTMLBodyElement>(document.querySelector('body'))
    .current as unknown as HTMLBodyElement;

  const onYesClick = (e: MouseEvent<HTMLButtonElement>) => {
    onConfirmClick(e);
    setShowConfirm(false);
    bodyRef.style.overflow = '';
  };

  const onNoClick = () => {
    setShowConfirm(false);
    bodyRef.style.overflow = '';
  };

  return createPortal(
    <div className={styles.confirm}>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        <div className={styles.select}>
          <button type="button" className={styles.yes} onClick={onYesClick}>
            YES
          </button>
          <div className={styles.line} />
          <button type="button" className={styles.no} onClick={onNoClick}>
            NO
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current as HTMLDivElement
  );
}

export default Confirm;
