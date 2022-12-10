import { RootState } from 'src/store';
import { createSelector } from '@reduxjs/toolkit';

export const home = (state: RootState) => state.home;

export const homeSelector = createSelector(home, state => state);
