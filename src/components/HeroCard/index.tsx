import { MouseEventHandler, useState } from 'react';
import { useQuery } from 'react-query';

import { getHero } from 'utils/getHero';

import Spinner from 'components/common/Spinner';
import Button from 'components/common/Button';
import BasicInfo from './BasicInfo';

import styles from './heroCard.module.scss';
import DetailedInfo from './DetailedInfo';

type HeroCardProps = {
  heroId: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
function HeroCard({ heroId, onClick }: HeroCardProps) {
  const [isDetail, setIsDetail] = useState<boolean>(false);

  const onDetailClick = () => {
    setIsDetail((prev) => !prev);
  };

  const { data } = useQuery(['superhero', heroId], () => getHero(heroId));

  if (!data || !data.id) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.heroCard}>
      <div
        role="button"
        tabIndex={0}
        data-heroid={heroId}
        onClick={onClick}
        className={styles.wrapper}
      >
        {isDetail ? <DetailedInfo data={data} /> : <BasicInfo data={data} />}
      </div>
      <Button
        theme="secondary"
        size="sm"
        className={styles.detailButton}
        onClick={onDetailClick}
      >
        Detail
      </Button>
    </div>
  );
}

export default HeroCard;
