import { Component, OnInit, Input } from '@angular/core';
import { Basket } from 'src/app/models/basket.model';
import { BasketService } from 'src/app/services/basket.service';
import { ClearCurrentBasket, GetBasket } from 'src/app/actions/basket.action';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.scss']
})
export class BasketDetailComponent implements OnInit {

  @Input() basket: Basket;
  basket$: Observable<Basket> = this.store$.select('currentBasket')

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(new GetBasket(this.basket.id));
  }

  resetCurrentBasket() {
    this.store$.dispatch(new ClearCurrentBasket());
  }
}
