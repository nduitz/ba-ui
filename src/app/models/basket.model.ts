import { ProductPosition } from './product-position.model';

export class Basket {
  id: number;
  name: string;
  sum: number;
  product_positions: ProductPosition[]
}