import React, {useState} from 'react';
import styles from './Modal.module.scss';
import Input from '../Form/Input/Input';
import Select from '../Form/Select/Select';
import {useDispatch, useSelector} from 'react-redux';
import {addInputToArr} from '../../store/inputs';
import {RootState} from '../../store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const inputTypes = [
  'text',
  'checkbox',
  'date',
  'datetime-local',
  'email',
  'file',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'search',
  'tel',
  'time',
  'url',
  'week',
];

export default function Modal({isOpen, onClose}: Props): JSX.Element | undefined {
  const [{inputValue, selectedType}, setState] = useState({inputValue: '', selectedType: 'text'});
  const dispatch = useDispatch();
  const {inputsArr} = useSelector((state: RootState) => state.inputs);
  const duplicateCheck = inputsArr.some(
    (elem) => elem.name.toUpperCase() === inputValue.toUpperCase()
  );

  const getErrorMessage = () => {
    if (duplicateCheck) {
      return 'The chosen name is already in use. Please select a different name for your input to avoid any conflicts';
    } else if (!inputValue.length) {
      return 'Please fill out this field';
    }
  };

  const onChangeHandler = (stateName: 'inputValue' | 'selectedType', value: string) => {
    setState((prevState) => ({...prevState, [stateName]: value}));
  };

  const handleSubmit = () => {
    setState((prevState) => ({...prevState, inputValue: '', selectedType: 'text'}));
    onClose();

    dispatch(addInputToArr({name: inputValue, type: selectedType, value: ''}));
  };

  if (!isOpen) return;

  return (
    <div className={styles.modal}>
      <div className={styles.modalCnt}>
        <button className={styles.closeBtn} onClick={onClose} />

        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <Input
            header="Enter the input header"
            type="text"
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler('inputValue', event.target.value)
            }
            errorMessage={getErrorMessage()}
            isRemoveBtn={false}
          />
          <Select
            options={inputTypes}
            onChange={(e) => onChangeHandler('selectedType', e.target.value)}
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!inputValue.length || duplicateCheck}
          >
            Submit
          </button>
        </form>
      </div>

      <button className={styles.modalOver} onClick={onClose} />
    </div>
  );
}
