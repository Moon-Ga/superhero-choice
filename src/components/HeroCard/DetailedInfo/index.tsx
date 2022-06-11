import cx from 'classnames';
import styles from './detailedInfo.module.scss';

type DetailedInfoProps = {
  data: HeroInfo;
};
function DetailedInfo({ data }: DetailedInfoProps) {
  const { name } = data;
  const { gender, race } = data.appearance;
  const height =
    data.appearance.height[1] === '0 cm' ? '-' : data.appearance.height[1];
  const weight =
    data.appearance.weight[1] === '0 kg' ? '-' : data.appearance.weight[1];
  const { fullName, placeOfBirth, firstAppearance } = data.biography;
  const { groupAffiliation } = data.connections;

  const firstData = [name, fullName, height, weight, gender];
  const firstLabels = ['이름', '본명', '키', '몸무게', '성별'];

  const secondData = [race, placeOfBirth, firstAppearance, groupAffiliation];
  const secondLabels = ['종족', '태어난 곳', '첫 등장', '소속'];

  const firstItems = firstLabels.map((label, idx) => {
    return (
      <div className={styles.item} key={label}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.data}>{firstData[idx] || '-'}</dd>
      </div>
    );
  });
  const secondItems = secondLabels.map((label, idx) => {
    return (
      <div className={styles.item} key={label}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.data}>{secondData[idx] || '-'}</dd>
      </div>
    );
  });

  return (
    <div className={styles.detailedInfo}>
      <div className={styles.wrapper}>
        <dl className={styles.firstInfo}>{firstItems}</dl>
        <dl className={styles.secondInfo}>{secondItems}</dl>
      </div>
    </div>
  );
}

export default DetailedInfo;
