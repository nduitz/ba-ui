import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ProductsState, productsReducer, currentProductReducer, CurrentProductState } from './product.reducer';
import { CurrentBasketState, basketsReducer, currentBasketReducer, BasketsState } from './basket.reducer';

export interface AppState {
  products: ProductsState;
  currentProduct: CurrentProductState;
  baskets: BasketsState;
  currentBasket: CurrentBasketState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  currentProduct: currentProductReducer,
  baskets: basketsReducer,
  currentBasket: currentBasketReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
