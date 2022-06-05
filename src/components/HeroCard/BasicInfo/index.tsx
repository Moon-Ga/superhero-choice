import { NoImageImage } from 'assets/svgs';
import styles from './basicInfo.module.scss';

type BasicInfoProps = {
  data: HeroInfo;
};
function BasicInfo({ data }: BasicInfoProps) {
  const labels = ['근력', '지능', '속력', '내구력', '위력', '전투력'];

  const statColor = (statpoint: string) => {
    if (statpoint === '정보 없음') {
      return 'weak';
    }
    const toNumber = Number(statpoint);
    if (toNumber <= 15) {
      return 'weak';
    }
    if (toNumber <= 30) {
      return 'normal';
    }
    if (toNumber <= 45) {
      return 'strong';
    }
    if (toNumber <= 60) {
      return 'powerful';
    }
    if (toNumber <= 75) {
      return 'mighty';
    }
    if (toNumber <= 90) {
      return 'untouchable';
    }
    return 'god';
  };
  const statItems = Object.values(data.powerstats).map((stat, idx) => {
    const key = `${data.id}-${stat}-${idx}`;
    const point = stat !== 'null' ? stat : '정보 없음';
    return (
      <li key={key} className={styles.statItem}>
        <span className={styles.label}>{labels[idx]}</span>
        <span className={styles[statColor(point)]}>{point}</span>
      </li>
    );
  });

  const fullname =
    data.biography['full-name'].length !== 0
      ? data.biography['full-name']
      : data.name;

  return (
    <div className={styles.basicInfo}>
      <div className={styles.imageContainer}>
        <img
          src={data.image.url}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = NoImageImage;
          }}
          alt={data.name}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.nameContainer}>
          <p className={styles.name}>{data.name}</p>
          <span className={styles.fullname}>{fullname}</span>
        </div>
        <div className={styles.stats}>
          <ul className={styles.statItems}>{statItems}</ul>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;