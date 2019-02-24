import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { GetProduct } from 'src/app/actions/product.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> = this.store$.select('currentProduct');

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.store$.dispatch(
      new GetProduct(parseInt(this.route.snapshot.paramMap.get('id')))
    )
  }

}
