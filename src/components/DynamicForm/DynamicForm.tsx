import Input from '../Form/Input/Input';
import React, {useState} from 'react';
import styles from './DynamicForm.module.scss';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {filterInputsArr, updateInputValue} from '../../store/inputs';

type State = {
  isOpenModal: boolean;
  isShownRemoveInputBtn: boolean;
};

export default function DynamicForm(): JSX.Element {
  const dispatch = useDispatch();
  const {inputsArr} = useSelector((state: RootState) => state.inputs);
  const [{isOpenModal, isShownRemoveInputBtn}, setState] = useState<State>({
    isOpenModal: false,
    isShownRemoveInputBtn: false,
  });

  const setStateHandler = (name: 'isOpenModal' | 'isShownRemoveInputBtn', value: boolean) => {
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const handleBtnClick = (action: 'add' | 'remove', e: React.MouseEvent) => {
    e.preventDefault();
    if (action === 'add') {
      return setStateHandler('isOpenModal', true);
    }

    return setStateHandler('isShownRemoveInputBtn', !isShownRemoveInputBtn);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('You can see the result in the console');
    console.log(inputsArr);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={() => setStateHandler('isOpenModal', false)} />
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputsArr.length ? (
          <div className={styles.inputsWrapper}>
            {inputsArr.map(({name, type, value}) => {
              return (
                <Input
                  header={name}
                  type={type}
                  value={value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const {type, checked, value} = event.target;
                    dispatch(updateInputValue({type, checked, value, name}));
                  }}
                  key={name}
                  isRemoveBtn={isShownRemoveInputBtn}
                  onRemoveBtnClick={() => dispatch(filterInputsArr(name))}
                />
              );
            })}
          </div>
        ) : (
          <h1 className={styles.h1}>
            Please click on the &quot;Add input&quot; button to add an input
          </h1>
        )}
        <div className={styles.btnsContainer}>
          <button onClick={(e) => handleBtnClick('add', e)} className={styles.btn}>
            Add input
          </button>
          {!!inputsArr.length && (
            <button
              onClick={(e) => handleBtnClick('remove', e)}
              className={clsx(
                isShownRemoveInputBtn && styles.activeRemoveBtn,
                styles.btn,
                styles.removeInputBtn
              )}
            >
              {isShownRemoveInputBtn ? 'Cancel deletion' : 'Select an input to delete'}
            </button>
          )}
        </div>

        {!!inputsArr.length && <button className={clsx(styles.btn, styles.submit)}>Submit</button>}
      </form>
    </>
  );
}
