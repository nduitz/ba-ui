import { Product } from '../models/product.model';

export const CREATE_PRODUCT = '[product] create product';
export const CREATE_PRODUCT_SUCCESS = '[product] create product success';
export const CREATE_PRODUCT_ERROR = '[product] create product error';

export const GET_ALL_PRODUCTS = '[product] get all products';
export const GET_ALL_PRODUCTS_SUCCESS = '[product] get all products success';
export const GET_ALL_PRODUCTS_ERROR = '[product] get all products error';

export const GET_PRODUCT = '[product] get product';
export const GET_PRODUCT_SUCCESS = '[product] get product success';
export const GET_PRODUCT_ERROR = '[product] get product error';

export class CreateProduct {
  readonly type = CREATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class CreateProductSuccess {
  readonly type = CREATE_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class CreateProductError {
  readonly type = CREATE_PRODUCT_ERROR;

  constructor(public payload: Error) {}
}

export class GetAllProducts {
  readonly type = GET_ALL_PRODUCTS;

  constructor() {};
}

export class GetAllProductsSuccess {
  readonly type = GET_ALL_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {};
}

export class GetAllProductsError {
  readonly type = GET_ALL_PRODUCTS_ERROR;

  constructor(public payload: Error) {};
}

export class GetProduct {
  readonly type = GET_PRODUCT;

  constructor(public payload: number) {};
}

export class GetProductSuccess {
  readonly type = GET_PRODUCT_SUCCESS;

  constructor(public payload: Product) {};
}

export class GetProductError {
  readonly type = GET_PRODUCT_ERROR;

  constructor(public payload: Error) {};
}