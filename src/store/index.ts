import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { counterReducer } from 'src/features/counter';
import { kanyeReducer } from 'src/features/kanye';
import { appReducer } from 'src/features/app';
import { homeReducer } from 'src/features/home';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    kanyeQuote: kanyeReducer,
    app: appReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
