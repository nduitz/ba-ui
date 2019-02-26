import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/models/basket.model';
import { Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { GetAllBaskets, GetBasket } from 'src/app/actions/basket.action';
import { BasketState } from 'src/app/helpers/basket-state.enum';
import { map, switchMap, tap } from 'rxjs/operators';
import { GetAllProducts } from 'src/app/actions/product.action';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  baskets$: Observable<Basket[]> = this.store$.select('baskets');
  currentBasket$: Observable<Basket> = this.store$.select('currentBasket')

  constructor(
    private store$: Store<AppState>,
    private basketService: BasketService
  ) { }

  ngOnInit() {
    this.store$.dispatch(new GetAllBaskets());
  }

  setCurrentBasket(basket: Basket) {
    this.store$.dispatch(new GetBasket(basket.id))
  }

  getBasketsWithState(basketState: BasketState) {
    this.store$.dispatch(new GetAllBaskets(basketState));
  }
}
