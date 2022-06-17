import { MouseEventHandler, useState } from 'react';
import { useQuery } from 'react-query';

import { getHero } from 'utils/getHero';

import Spinner from 'components/common/Spinner';
import Button from 'components/common/Button';
import BasicInfo from './BasicInfo';
import DetailedInfo from './DetailedInfo';

import styles from './heroCard.module.scss';
import Comment from './Comment';

type HeroCardProps = {
  heroId: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
function HeroCard({ heroId, onClick }: HeroCardProps) {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);

  const onDetailClick = () => {
    setIsDetail((prev) => !prev);
  };

  const onCommentClick = () => {
    setIsComment((prev) => !prev);
  };

  const { data } = useQuery(['superhero', heroId], () => getHero(heroId));

  if (!data || !data.id) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  const content = () => {
    if (isComment) {
      return <Comment setIsComment={setIsComment} />;
    }

    return (
      <>
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
          className={styles.commentButton}
          onClick={onCommentClick}
        >
          코멘트
        </Button>
        <Button
          theme="secondary"
          size="sm"
          className={styles.detailButton}
          onClick={onDetailClick}
        >
          {isDetail ? '기본' : '상세'}
        </Button>
      </>
    );
  };

  return <div className={styles.heroCard}>{content()}</div>;
}

export default HeroCard;
