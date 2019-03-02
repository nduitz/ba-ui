import { Basket } from '../models/basket.model';
import { ProductPosition } from '../models/product-position.model';
import { BasketState } from '../helpers/basket-state.enum';

export const CREATE_BASKET = '[basket] create basket';
export const CREATE_BASKET_SUCCESS = '[basket] create basket success';
export const CREATE_BASKET_ERROR = '[basket] create basket error';

export const GET_ALL_BASKETS = '[basket] get all baskets';
export const GET_ALL_BASKETS_SUCCESS = '[basket] get all baskets success';
export const GET_ALL_BASKETS_ERROR = '[basket] get all baskets error';

export const GET_BASKET = '[basket] get basket';
export const GET_BASKET_SUCCESS = '[basket] get basket success';
export const GET_BASKET_ERROR = '[basket] get basket error';

export const ADD_PRODUCT_TO_BASKET = '[basket] add product to basket';
export const ADD_PRODUCT_TO_BASKET_SUCCESS = '[basket] add product to basket success';
export const ADD_PRODUCT_TO_BASKET_ERROR = '[basket] add product to basket error';

export const CLEAR_BASKET = '[basket] clear basket'

export class CreateBasket {
  readonly type = CREATE_BASKET;

  constructor(public payload: Basket) {}
}

export class CreateBasketSuccess {
  readonly type = CREATE_BASKET_SUCCESS;

  constructor(public payload: Basket) {}
}

export class CreateBasketError {
  readonly type = CREATE_BASKET_ERROR;

  constructor(public payload: Error) {}
}

export class GetAllBaskets {
  readonly type = GET_ALL_BASKETS;

  constructor(public payload: BasketState = BasketState.OPEN) {};
}

export class GetAllBasketsSuccess {
  readonly type = GET_ALL_BASKETS_SUCCESS;

  constructor(public payload: Basket[]) {};
}

export class GetAllBasketsError {
  readonly type = GET_ALL_BASKETS_ERROR;

  constructor(public payload: Error) {};
}

export class GetBasket {
  readonly type = GET_BASKET;

  constructor(public payload: string) {};
}

export class GetBasketSuccess {
  readonly type = GET_BASKET_SUCCESS;

  constructor(public payload: Basket) {};
}

export class GetBasketError {
  readonly type = GET_BASKET_ERROR;

  constructor(public payload: Error) {};
}

export class ClearCurrentBasket {
  readonly type = CLEAR_BASKET;

  constructor() {};
}

export class AddProductToBasket {
  readonly type = ADD_PRODUCT_TO_BASKET;

  constructor(public payload: ProductPosition) {}
}

export class AddProductToBasketSuccess {
  readonly type = ADD_PRODUCT_TO_BASKET_SUCCESS;

  constructor(public payload: Basket) {}
}

export class AddProductToBasketError {
  readonly type = ADD_PRODUCT_TO_BASKET_ERROR;

  constructor(public payload: Error) {}
}