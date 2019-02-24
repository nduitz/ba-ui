import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/models/basket.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { GetAllBaskets, GetBasket } from 'src/app/actions/basket.action';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  baskets$: Observable<Basket[]> = this.store$.select('baskets');
  currentBasket$: Observable<Basket> = this.store$.select('currentBasket')

  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.store$.dispatch(new GetAllBaskets());
  }

  setCurrentBasket(basket: Basket) {
    this.store$.dispatch(new GetBasket(basket.id))
  }

}
