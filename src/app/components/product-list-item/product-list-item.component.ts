import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/models/basket.model';
import { NgForm } from '@angular/forms';
import { ProductPosition } from 'src/app/models/product-position.model';
import { tap, map } from 'rxjs/operators';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { AddProductToBasket } from 'src/app/actions/basket.action';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input() product: Product
  currentBasket$: Observable<Basket> = this.store$.select('currentBasket')

  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
  }

  addProductToBasket(){

    console.log(this.form.value)
    const productPosition: ProductPosition = {
      product_id: this.product.id,
      basket_id: this.form.value.basketId,
      amount: this.form.value.amount
    }
    console.log(productPosition)
    this.store$.dispatch(new AddProductToBasket(productPosition))
  }


}
