import store from 'store';
import _ from 'lodash';

import HeroCard from 'components/HeroCard';

import styles from './rankings.module.scss';

function Rankings() {
  const storage = store.get('selectedHeroes');
  const onClick = () => {
    return null;
  };

  const list = _.sortBy<Selected>(storage, 'count')
    .reverse()
    .map((item: Selected, idx) => {
      const key = `${item.heroId}-${idx}-${item.count}`;
      return (
        <li key={key} className={styles.rankingItem}>
          <span className={styles.rank}>
            {idx + 1}위 (총 {item.count}회)
          </span>
          <HeroCard heroId={Number(item.heroId)} onClick={onClick} />
        </li>
      );
    });

  return (
    <main className={styles.rankings}>
      <ul className={styles.rankingsList}>{list}</ul>
    </main>
  );
}

export default Rankings;
