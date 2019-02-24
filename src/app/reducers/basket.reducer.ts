import { GetAllBasketsSuccess, GET_ALL_BASKETS_SUCCESS, GET_BASKET_SUCCESS, GetBasketSuccess, ClearCurrentBasket, CLEAR_BASKET, ADD_PRODUCT_TO_BASKET_SUCCESS } from '../actions/basket.action';
import { Action } from '@ngrx/store';
import { Basket } from '../models/basket.model';

export type BasketsState = Basket[];
export const initialStateBaskets: BasketsState = [];

export type CurrentBasketState = Basket;
export const initialStateCurrent: CurrentBasketState = null;

function getAllBaskets(state: BasketsState, action: GetAllBasketsSuccess): BasketsState{
  return action.payload;
}

function getBasket(state: CurrentBasketState, action: GetBasketSuccess): CurrentBasketState{
  return action.payload;
}

function clearBasket(state: CurrentBasketState, action: ClearCurrentBasket): CurrentBasketState{
  return initialStateCurrent;
}

export function basketsReducer(state: BasketsState = initialStateBaskets, action: Action) {
  switch (action.type) {
    case GET_ALL_BASKETS_SUCCESS:
      return getAllBaskets(state, action as GetAllBasketsSuccess);
    default:
      return state;
  }
}

export function currentBasketReducer(state: CurrentBasketState = initialStateCurrent, action: Action) {
  switch (action.type) {
    case GET_BASKET_SUCCESS:
      return getBasket(state, action as GetBasketSuccess);
    case CLEAR_BASKET:
      return clearBasket(state, action as ClearCurrentBasket);
    case ADD_PRODUCT_TO_BASKET_SUCCESS:
      return getBasket(state, action as GetBasketSuccess)
    default:
      return state;
  }
}