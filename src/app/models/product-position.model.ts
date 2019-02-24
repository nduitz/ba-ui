import { Product } from './product.model';

export class ProductPosition {
  basket_id?: number;
  product_id?: number;
  amount?: number;
  products?: Product
}