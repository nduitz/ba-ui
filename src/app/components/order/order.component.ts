import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Basket } from 'src/app/models/basket.model';
import { HoloMockProduct } from 'src/app/models/holo-mock-product.model';
import { HoloMockBasket } from 'src/app/models/holo-mock-basket.model';
import { map } from 'rxjs/operators';
import { InitMockService } from 'src/app/services/init-mock.service';
import { HoloMockData } from 'src/app/models/holo-mock-data.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]> = this.store$.select('products')
  baskets$: Observable<Basket[]> = this.store$.select('baskets')

  constructor(
    private store$: Store<AppState>,
    private initMockService: InitMockService,

  ) { }

  ngOnInit() {
  }

  initHolochain() {
    let products: HoloMockProduct[];
    let baskets: HoloMockBasket[];

    this.products$.subscribe(data => {
      products = data
    }
    );

    this.baskets$.subscribe(data => {
      baskets = data
      }
    );

    products.forEach(product =>{
      delete product["id"]
    })

    baskets.forEach(basket =>{
      delete basket["id"]
    })

    let mockParams: HoloMockData = {
      products: products,
      baskets: baskets,
      positions: []
    }
    
    this.initMockService.initHolo(mockParams)
  }

  getProducts() {
    this.initMockService.getProducts()
  }

  getBaskets() {
    this.initMockService.getBaskets()
  }
}
