import { Component, OnInit, Input } from '@angular/core';
import { ProductPosition } from 'src/app/models/product-position.model';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss']
})
export class BasketProductComponent implements OnInit {

  @Input() productPosition: ProductPosition;

  constructor() { }

  ngOnInit() {
  }

}
