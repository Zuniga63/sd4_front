import { RootState } from 'src/store';
import { createSelector } from '@reduxjs/toolkit';

export const app = (state: RootState) => state.app;

export const appSelector = createSelector(app, state => state);
