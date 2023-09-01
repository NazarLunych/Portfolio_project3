import React from 'react';
import InputWrapper from '../../InputWrapper/InputWrapper';
import styles from './Input.module.scss';

type Props = {
  header: string;
  type: string;
  value: string | boolean;
  errorMessage?: string;
  isRemoveBtn: boolean;
  onRemoveBtnClick?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  header,
  type,
  value,
  onChange,
  isRemoveBtn,
  onRemoveBtnClick,
  errorMessage,
}: Props): JSX.Element {
  return (
    <InputWrapper title={header} isRemoveBtn={isRemoveBtn} onRemoveBtnClick={onRemoveBtnClick}>
      <input
        type={type}
        onChange={onChange}
        value={type === 'checkbox' ? undefined : value.toString()}
        checked={type === 'checkbox' ? !!value : undefined}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </InputWrapper>
  );
}
