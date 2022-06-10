import styles from './detailedInfo.module.scss';

type DetailedInfoProps = {
  data: HeroInfo;
};
function DetailedInfo({ data }: DetailedInfoProps) {
  return (
    <div className={styles.detailedInfo}>
      <div className={styles.info}>
        <div className={styles.nameContainer}>
          <p className={styles.name} />
          <span className={styles.fullname} />
        </div>
        <div className={styles.stats}>
          <ul className={styles.statItems} />
        </div>
      </div>
    </div>
  );
}

export default DetailedInfo;
