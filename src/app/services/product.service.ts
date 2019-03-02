import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { connect } from '@holochain/hc-web-client';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:3000/products", product).pipe(
      catchError(error => {
        console.error('[Product]API Error', error)
        return throwError(error);
      })
    )
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/products").pipe(
      catchError(error => {
        console.error('[Product]API Error:', error);
        return throwError(error);
      })
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`).pipe(
      catchError(error => {
        console.error('[Product]API Error:', error);
        return throwError(error);
      })
    );
  }

  getProductHolo(productHash: string): Observable<any> {
    const promise = connect("ws://localhost:8888")
    .then(({ call, close }) => call('test-instance/pos/main/get_product')({product_addr: productHash}));
    return from(promise).pipe(
      map((data) => JSON.parse(data)["Ok"]),
      tap((data) => {
        if (!("Ok" in data)) {
          console.log(data)
          throwError(new Error(data))
        }
      }),
      
    )
  }

  getAllProductsHolo(): Observable<any> {
    const promise = connect("ws://localhost:8888")
      .then(({ call }) => call('test-instance/pos/main/get_products')({}));
    return from(promise).pipe(
      map((data) => JSON.parse(data)),
      tap((data) => {
        if (("Err" in data)) {
          throwError(new Error(data))
        }
      })
    )
  }

  
}
