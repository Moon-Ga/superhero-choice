import { CloseIcon } from 'assets/svgs';
import { useRecoil } from 'hooks';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Firestore } from 'services/Firestore';
import { CurrentUserState } from 'states';
import styles from './comment.module.scss';

type CommentProps = {
  data: HeroInfo;
  heroId: number;
  setIsComment: React.Dispatch<React.SetStateAction<boolean>>;
};
function Comment({ data, heroId, setIsComment }: CommentProps) {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [commentData, setCommentData] = useState<CommentItem[]>([]);
  const [wordCount, setWordCount] = useState(0);

  const [userInfo] = useRecoil(CurrentUserState);

  const commentRef = useRef(null);

  const placeholder = isUser ? '코멘트를 입력하세요.' : '로그인 해야 합니다.';

  const onCloseClick = () => {
    setIsComment(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setWordCount(e.target.value.length);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = commentRef.current as unknown as HTMLInputElement;
    setInputValue('');
    setWordCount(0);
    return Firestore.addComment(heroId, userInfo, current.value);
  };

  useEffect(() => {
    setIsUser(userInfo.name.length !== 0);
    Firestore.getComments(heroId, setCommentData);
  }, [heroId, userInfo.name.length]);

  const commentList = commentData.map((comment: CommentItem, idx) => {
    const key = `${comment.userId}-${idx}`;
    return (
      <li key={key} className={styles.item}>
        <span className={styles.name}>{comment.name}</span>
        <span className={styles.content}>{comment.comment}</span>
      </li>
    );
  });

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <p className={styles.name}>{data.name}</p>
        <CloseIcon onClick={onCloseClick} className={styles.closeButton} />
      </div>
      <ul className={styles.list}>{commentList}</ul>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          ref={commentRef}
          type="text"
          value={inputValue}
          maxLength={50}
          className={styles.input}
          onChange={onChange}
          placeholder={placeholder}
          disabled={!isUser}
        />
        <span className={styles.wordCount}>{wordCount} / 50</span>
      </form>
    </div>
  );
}

export default Comment;
