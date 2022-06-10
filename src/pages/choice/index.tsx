import { MouseEvent, useEffect, useState } from 'react';

import { maxIdNumber, minIdNumber, randomId } from 'utils/constants';

import HeroCard from 'components/HeroCard';

import { Firestore } from 'services/Firestore';
import styles from './choice.module.scss';

function Choice() {
  const [cardHeroId, setHeroId] = useState({
    first: randomId(minIdNumber, maxIdNumber),
    second: randomId(minIdNumber, maxIdNumber),
  });

  const onCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const heroId = Number(e.currentTarget.dataset.heroid);
    Firestore.addRankings(heroId);

    setHeroId({
      first: randomId(minIdNumber, maxIdNumber),
      second: randomId(minIdNumber, maxIdNumber),
    });
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
          <HeroCard heroId={cardHeroId.first} onClick={onCardClick} />
        </div>
      </section>
      <div className={styles.line} />
      <section className={styles.secondHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={cardHeroId.second} onClick={onCardClick} />
        </div>
      </section>
    </main>
  );
}

export default Choice;
