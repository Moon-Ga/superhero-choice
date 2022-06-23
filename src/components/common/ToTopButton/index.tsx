import cx from 'classnames';
import { useEffect, useState } from 'react';
import styles from './ToTopButton.module.scss';

type toTopButtonProps = {
  target: HTMLElement | null;
};
function ToTopButton({ target }: toTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const onToTopClick = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
        setIsVisible(entry.isIntersecting);
      };
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target);
    }
  }, [target]);

  return (
    <button
      type="button"
      className={cx(styles.toTopButton, { [styles.visible]: isVisible })}
      onClick={onToTopClick}
    >
      To top
    </button>
  );
}

export default ToTopButton;
