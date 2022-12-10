import { createReducer } from '@reduxjs/toolkit';
import * as ACTIONS from './actions';

// ----------------------------------------------------------------------------
// INTERFACES
// ----------------------------------------------------------------------------
export interface IImage {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}

export interface IProductOptionItemHome {
  id: string;
  product: string;
  optionSet: string;
  optionSetItem: {
    image?: IImage;
    name: string;
    isEnabled: boolean;
  };
  price?: number;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IProductOptionSetHome {
  id: string;
  product: string;
  optionSet: string;
  items: IProductOptionItemHome[];
  title: string;
  required: boolean;
  multiple: boolean;
  minCount?: number;
  maxCount?: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IProductHome {
  id: string;
  category: string;
  optionSets: IProductOptionSetHome[];
  optionSetItems: string[];
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
  price: number;
  hasDiscount: boolean;
  priceWithDiscount?: number;
  productIsNew: boolean;
  hasVariant: boolean;
  varianTitle?: string;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface ICategoryHome {
  id: string;
  name: string;
  image?: IImage;
  description?: string;
  order: number;
  products: IProductHome[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IHomeResponse {
  ok: boolean;
  categories: ICategoryHome[];
}

export interface IProductResponse {
  ok: boolean;
  product: IProductHome;
}

// ----------------------------------------------------------------------------
// STATE
// ----------------------------------------------------------------------------
export type homeState = {
  categories: ICategoryHome[];
  product?: IProductHome;
  category?: ICategoryHome;
};

const initialState: homeState = {
  categories: [],
};

export const homeReducer = createReducer(initialState, builder => {
  builder
    .addCase(ACTIONS.mountCategories, (state, { payload }) => {
      state.categories = payload;
    })
    .addCase(ACTIONS.mountProduct, (state, { payload }) => {
      state.product = payload;
      state.category = state.categories.find(
        item => item.id === payload.category
      );
    })
    .addCase(ACTIONS.unmountProduct, state => {
      state.product = undefined;
    });
});
