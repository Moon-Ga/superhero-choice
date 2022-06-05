import { useState } from 'react';
import store from 'store';

import { randomId } from 'utils/constants';

import HeroCard from 'components/HeroCard';

import styles from './choice.module.scss';

function Choice() {
  const [, setIsClicked] = useState<boolean>(false);

  const firstHeroId = randomId();
  const secondHeroId = randomId();

  const onCardClick = (id: number, heroId: string) => {
    const storage = store.get('selectedHeroes');
    const setStorage = (array: Selected[]) =>
      store.set('selectedHeroes', array);
    const storageFinder = storage.findIndex(
      (item: Selected) => item.heroId === id.toString()
    );
    if (storageFinder !== -1) {
      const newObject = [...storage];
      newObject[storageFinder] = {
        heroId,
        count: newObject[storageFinder].count + 1,
      };
      setStorage(newObject);
    } else {
      const newObject = [...storage, { heroId, count: 1 }];
      setStorage(newObject);
    }
    setIsClicked((prev) => !prev);
  };

  return (
    <main className={styles.choice}>
      <section className={styles.firstHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={firstHeroId} onClick={onCardClick} />
        </div>
      </section>
      <div className={styles.line} />
      <section className={styles.secondHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={secondHeroId} onClick={onCardClick} />
        </div>
      </section>
    </main>
  );
}

export default Choice;
