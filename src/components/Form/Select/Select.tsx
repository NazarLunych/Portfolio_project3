import React from 'react';
import styles from './Select.module.scss';
import InputWrapper from '../../InputWrapper/InputWrapper';

type Props = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({options, onChange}: Props): JSX.Element {
  return (
    <InputWrapper title="Select an input type" isRemoveBtn={false}>
      <select onChange={onChange} className={styles.selector}>
        {options.map((value: string) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}
