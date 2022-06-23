import { MouseEvent, useEffect, useState } from 'react';

import { Firestore } from 'services/Firestore';
import { maxIdNumber, minIdNumber, randomId } from 'utils/constants';

import HeroCard from 'components/HeroCard';

import styles from './choice.module.scss';

function Choice() {
  const [cardHeroId, setHeroId] = useState({
    first: randomId(minIdNumber, maxIdNumber),
    second: randomId(minIdNumber, maxIdNumber),
  });

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const heroId = Number(e.currentTarget.dataset.heroid);
    Firestore.addRankings(heroId);

    setHeroId({
      first: randomId(minIdNumber, maxIdNumber),
      second: randomId(minIdNumber, maxIdNumber),
    });

    setIsSelected((prev) => !prev);
  };

  useEffect(() => {
    if (cardHeroId.first === cardHeroId.second) {
      setHeroId({
        first: randomId(minIdNumber, maxIdNumber),
        second: randomId(minIdNumber, maxIdNumber),
      });
    }
  }, [cardHeroId.first, cardHeroId.second]);

  return (
    <main className={styles.choice}>
      <section className={styles.firstHalf}>
        <div className={styles.cardContainer}>
          <HeroCard
            heroId={cardHeroId.first}
            onClick={onCardClick}
            isSelected={isSelected}
          />
        </div>
      </section>
      <div className={styles.text}>OR</div>
      <section className={styles.secondHalf}>
        <div className={styles.cardContainer}>
          <HeroCard
            heroId={cardHeroId.second}
            onClick={onCardClick}
            isSelected={isSelected}
          />
        </div>
      </section>
    </main>
  );
}

export default Choice;
