// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from 'src/store';

// export type CounterState = {
//   value: number;
// };

// const initialState: CounterState = {
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: state => {
//       state.value += 1;
//     },
//     decrement: state => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

// export default counterSlice.reducer;

export * from './actions';
export * from './reducer';
export * from './selectors';
