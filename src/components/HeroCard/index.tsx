import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getHero } from 'utils/getHero';

import Spinner from 'components/common/Spinner';
import BasicInfo from './BasicInfo';

import styles from './heroCard.module.scss';
import DetailedInfo from './DetailedInfo';

type HeroCardProps = {
  heroId: number;
  onClick: (id: number, heroId: number) => void;
  setShouldRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
};
function HeroCard({ heroId, onClick, setShouldRefetch }: HeroCardProps) {
  const [isDetail, setIsDetail] = useState<boolean>(false);

  const { data, isError } = useQuery(['superhero', heroId], () =>
    getHero(heroId)
  );

  if (isError) {
    return <div>Error</div>;
  }

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
      className={styles.heroCard}
      onClick={() => onClick(heroId, data.id)}
    >
      {isDetail ? <DetailedInfo data={data} /> : <BasicInfo data={data} />}
    </div>
  );
}

export default HeroCard;
