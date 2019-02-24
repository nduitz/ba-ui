import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  baskets: Basket[]
  currentBasket: Basket

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getAllBaskets().subscribe(data => {
      console.log(data)
      this.baskets = data;
    })
  }

  setCurrentBasket(basket: Basket) {
    this.currentBasket = basket;
  }

}
