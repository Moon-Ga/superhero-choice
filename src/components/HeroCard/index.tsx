import Spinner from 'components/common/Spinner';
import { useQuery } from 'react-query';
import { getHero } from 'utils/getHero';
import BasicInfo from './BasicInfo';
import styles from './heroCard.module.scss';

type HeroCardProps = {
  heroId: number;
};
function HeroCard({ heroId }: HeroCardProps) {
  const { data } = useQuery(['firstHero', heroId], () => getHero(heroId));

  if (!data) {
    return (
      <div className={styles.loading}>
        <Spinner />;
      </div>
    );
  }

  return (
    <div className={styles.heroCard}>
      <BasicInfo data={data} />
    </div>
  );
}

export default HeroCard;
