import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';

export type AppState = {
  name?: string;
  brandLogo?: string;
  slogan?: string;
  description?: string;
  menuOpened: boolean;
};

const initialState: AppState = {
  name: process.env.NEXT_PUBLIC_APP_NAME,
  brandLogo: process.env.NEXT_PUBLIC_BRAND_LOGO,
  slogan: process.env.NEXT_PUBLIC_APP_SLOGAN,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  menuOpened: false,
};

export const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(actions.showMenu, state => {
      state.menuOpened = true;
    })
    .addCase(actions.hideMenu, state => {
      state.menuOpened = false;
    });
});
