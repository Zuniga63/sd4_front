import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';

export const selectCount = (state: RootState) => state.counter.value;

export const countSelector = createSelector(selectCount, state => state);
