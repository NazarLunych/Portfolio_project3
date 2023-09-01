import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type Value = {
  name: string;
  type: string;
  value: string | boolean;
};

export const inputs = createSlice({
  name: 'inputs',
  initialState: {
    inputsArr: [] as Value[],
  },
  reducers: {
    addInputToArr: (state, action: PayloadAction<Value>) => {
      const newArr = [...state.inputsArr];
      newArr.push({
        ...action.payload,
        value: action.payload.type === 'checkbox' ? false : '',
      });

      return {...state, inputsArr: newArr};
    },
    filterInputsArr: (state, action: PayloadAction<string>) => {
      const filteredArr = state.inputsArr.filter((el) => el.name !== action.payload);
      return {...state, inputsArr: filteredArr};
    },
    updateInputValue: (
      state,
      action: PayloadAction<{type: string; checked: boolean; value: string; name: string}>
    ) => {
      const {type, checked, value, name} = action.payload;
      const newArr = state.inputsArr.map((input) => {
        if (input.name === name) {
          return {...input, value: type === 'checkbox' ? checked : value};
        }

        return input;
      });

      return {...state, inputsArr: newArr};
    },
  },
});

export const {addInputToArr, filterInputsArr, updateInputValue} = inputs.actions;
export default inputs.reducer;
