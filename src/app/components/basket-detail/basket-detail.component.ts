import { Component, OnInit, Input } from '@angular/core';
import { Basket } from 'src/app/models/basket.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.scss']
})
export class BasketDetailComponent implements OnInit {

  @Input() basket: Basket;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getBasket(this.basket.id).subscribe(data => {
      console.log(data)
      this.basket = data;
    })
  }

}
