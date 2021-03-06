import { ProductPosition } from './product-position.model';
import { BasketState } from '../helpers/basket-state.enum';

export class Basket {
  id: string;
  name: string;
  sum: number;
  state: BasketState;
  product_positions: ProductPosition[]
}