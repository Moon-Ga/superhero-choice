import Spinner from 'components/common/Spinner';
import { useQuery } from 'react-query';
import { getHero } from 'utils/getHero';
import BasicInfo from './BasicInfo';
import styles from './heroCard.module.scss';

type HeroCardProps = {
  heroId: number;
  onClick: (id: number, data: string) => void;
};
function HeroCard({ heroId, onClick }: HeroCardProps) {
  const { data } = useQuery(['superhero', heroId], () => getHero(heroId));

  if (!data) {
    return (
      <div className={styles.loading}>
        <Spinner />;
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
      <BasicInfo data={data} />
    </div>
  );
}

export default HeroCard;
