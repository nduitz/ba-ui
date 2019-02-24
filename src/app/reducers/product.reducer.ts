import { CreateProductSuccess, CREATE_PRODUCT_SUCCESS, GetAllProductsSuccess, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS, GET_PRODUCT_SUCCESS, GetProductSuccess } from '../actions/product.action';
import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export type ProductsState = Product[];
export const initialStateProducts: ProductsState = [];

export type CurrentProductState = Product;
export const initialStateCurrent: CurrentProductState = null;

function getAllProducts(state: ProductsState, action: GetAllProductsSuccess): ProductsState{
  return action.payload;
}

function getProduct(state: CurrentProductState, action: GetProductSuccess): CurrentProductState{
  return action.payload;
}

export function productsReducer(state: ProductsState = initialStateProducts, action: Action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_SUCCESS:
      return getAllProducts(state, action as GetAllProductsSuccess);
    default:
      return state;
  }
}

export function currentProductReducer(state: CurrentProductState = initialStateCurrent, action: Action) {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return getProduct(state, action as GetProductSuccess);
    default:
      return state;
  }
}