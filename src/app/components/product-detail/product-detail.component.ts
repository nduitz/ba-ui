import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProduct(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.product = data
    })
  }

}
