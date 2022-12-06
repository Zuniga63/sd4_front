import { createReducer } from '@reduxjs/toolkit';

import { decrement, increment, incrementByAmount } from './actions';

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const counterReducer = createReducer(initialState, builder => {
  builder
    .addCase(increment, state => {
      state.value += 1;
    })
    .addCase(decrement, state => {
      state.value -= 1;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});
