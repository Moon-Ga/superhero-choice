import HeroCard from 'components/HeroCard';
import { randomId } from 'utils/constants';
import styles from './choice.module.scss';

function Choice() {
  const firstHeroId = randomId();
  const secondHeroId = randomId();

  return (
    <div className={styles.choice}>
      <div className={styles.firstHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={firstHeroId} />
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.secondHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={secondHeroId} />
        </div>
      </div>
    </div>
  );
}

export default Choice;
