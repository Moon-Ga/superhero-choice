import HeroCard from 'components/HeroCard';
import { randomId } from 'utils/constants';
import store from 'store';

import { useState } from 'react';
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
      (item: Selected) => item.heroId.id === id.toString()
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
    <div className={styles.choice}>
      <div className={styles.firstHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={firstHeroId} onClick={onCardClick} />
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.secondHalf}>
        <div className={styles.cardContainer}>
          <HeroCard heroId={secondHeroId} onClick={onCardClick} />
        </div>
      </div>
    </div>
  );
}

export default Choice;
