import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ProductsState, productsReducer, currentProductReducer, CurrentProductState } from './product.reducer';
import { CurrentBasketState, basketsReducer, currentBasketReducer, BasketsState } from './basket.reducer';
import { FeatureState, featureReducer } from './feature.reduce';

export interface AppState {
  products: ProductsState;
  currentProduct: CurrentProductState;
  baskets: BasketsState;
  currentBasket: CurrentBasketState;
  feature: FeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  currentProduct: currentProductReducer,
  baskets: basketsReducer,
  currentBasket: currentBasketReducer,
  feature: featureReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
