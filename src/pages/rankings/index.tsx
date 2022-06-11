import { useEffect, useState } from 'react';
import _ from 'lodash';

import { Firestore } from 'services/Firestore';

import HeroCard from 'components/HeroCard';

import styles from './rankings.module.scss';

function Rankings() {
  const [rankingsList, setRankingsList] = useState<Selected[]>([]);

  useEffect(() => {
    Firestore.getRankings().then((data) => {
      const sortedData = _.sortBy<Selected>(data, 'count').reverse();
      setRankingsList(sortedData);
    });
  }, []);

  const list = rankingsList.map((item: Selected, idx) => {
    const key = `${item.heroId}-${idx}-${item.count}`;
    return (
      <li key={key} className={styles.rankingItem}>
        <span className={styles.rank}>
          {idx + 1}위 (총 {item.count}회)
        </span>
        <HeroCard heroId={Number(item.heroId)} />
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
