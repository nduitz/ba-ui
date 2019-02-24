import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { Basket } from '../models/basket.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProductPosition } from '../models/product-position.model';
import { connect } from '@holochain/hc-web-client';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient,
  ) {}

  getAllBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>("http://localhost:3000/baskets").pipe(
      catchError(error => {
        console.error('[Basket]API Error:', error);
        return throwError(error);
      })
    );
  }

  getBasket(basketId: number): Observable<Basket> {
    return this.http.get<Basket>(`http://localhost:3000/baskets/${basketId}`).pipe(
      catchError(error => {
        console.error('[Basket]API Error:', error);
        return throwError(error);
      })
    );
  }

  createBasket(basket: Basket): Observable<Basket> {
    return this.http.post<Basket>(`http://localhost:3000/baskets/`,basket).pipe(
      catchError(error => {
        console.error('[Basket]API Error:', error);
        return throwError(error);
      })
    );
  }

  addToBasket(product_position: ProductPosition): Observable<Basket> {
    console.log(product_position)
    return this.http.post<Basket>('http://localhost:3000/baskets/product/', product_position).pipe(
      catchError(error => {
        console.log('[Basket]API Error:', error);
        return throwError(error);
      })
    )
  }

  getAllBasketsHolo(): Observable<any> {
    return from(
      connect("ws://localhost:8888").then(
        ({call, close}) => {
          call('test-instant/pos/get_baskets')
        }
      )
    )
  }
}
