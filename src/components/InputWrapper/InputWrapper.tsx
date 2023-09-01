import React, {ReactNode} from 'react';
import styles from './InputWrapper.module.scss';

type Props = {
  title: string;
  children: ReactNode;
  isRemoveBtn: boolean;
  onRemoveBtnClick?: () => void;
};

export default function InputWrapper({
  title,
  children,
  isRemoveBtn,
  onRemoveBtnClick = () => alert('On remove button click'),
}: Props): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      {isRemoveBtn && <button className={styles.removeInputBtn} onClick={onRemoveBtnClick} />}
      <label className={styles.title}>{title}</label>
      {children}
    </div>
  );
}
