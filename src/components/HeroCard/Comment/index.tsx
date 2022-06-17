import { CloseIcon } from 'assets/svgs';
import { FormEvent, useRef } from 'react';
import styles from './comment.module.scss';

type CommentProps = {
  setIsComment: React.Dispatch<React.SetStateAction<boolean>>;
};
function Comment({ setIsComment }: CommentProps) {
  const commentRef = useRef(null);

  const onCloseClick = () => {
    setIsComment(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current = commentRef.current as unknown as HTMLInputElement;
    console.log(current.value);
  };
  return (
    <div className={styles.comment}>
      <CloseIcon onClick={onCloseClick} className={styles.closeButton} />
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.name}>이름</span>
          <span className={styles.content}>내용</span>
        </li>
        <li className={styles.item}>
          <span className={styles.name}>이름</span>
          <span className={styles.content}>내용</span>
        </li>
        <li className={styles.item}>
          <span className={styles.name}>이름</span>
          <span className={styles.content}>내용</span>
        </li>
        <li className={styles.item}>
          <span className={styles.name}>이름</span>
          <span className={styles.content}>내용</span>
        </li>
        <li className={styles.item}>
          <span className={styles.name}>이름</span>
          <span className={styles.content}>내용</span>
        </li>
      </ul>
      <form className={styles.form} onSubmit={onSubmit}>
        <input ref={commentRef} type="text" className={styles.input} />
      </form>
    </div>
  );
}

export default Comment;
