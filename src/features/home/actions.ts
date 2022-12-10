import { createAction } from '@reduxjs/toolkit';
import { ICategoryHome, IProductHome } from './reducers';

export const mountCategories = createAction<ICategoryHome[]>(
  'home/mountCategories'
);
export const mountProduct = createAction<IProductHome>('home/mountProduct');
export const unmountProduct = createAction('home/unmountProduct');
