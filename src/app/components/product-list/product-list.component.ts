import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { GetAllProducts } from 'src/app/actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> = this.store$.select('products');

  constructor(private productService: ProductService, private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(new GetAllProducts())
  }

}
