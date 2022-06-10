import { MouseEventHandler, useState } from 'react';
import { useQuery } from 'react-query';

import { getHero } from 'utils/getHero';

import Spinner from 'components/common/Spinner';
import BasicInfo from './BasicInfo';

import styles from './heroCard.module.scss';
import DetailedInfo from './DetailedInfo';

type HeroCardProps = {
  heroId: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
function HeroCard({ heroId, onClick }: HeroCardProps) {
  const [isDetail, setDetail] = useState<boolean>(false);

  const { data } = useQuery(['superhero', heroId], () => getHero(heroId));

  if (!data || !data.id) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-heroid={heroId}
      className={styles.heroCard}
      onClick={onClick}
    >
      {isDetail ? <DetailedInfo data={data} /> : <BasicInfo data={data} />}
    </div>
  );
}

export default HeroCard;
