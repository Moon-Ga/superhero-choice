import styles from './spinner.module.scss';

function Spinner() {
  return (
    <span className={styles.spinner}>
      <span className={styles.ball} />
      <span className={styles.frame} />
    </span>
  );
}

export default Spinner;
