import { Injectable } from '@angular/core';
import { Observable, throwError, from, fromEvent, of } from 'rxjs';
import { Basket } from '../models/basket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { ProductPosition } from '../models/product-position.model';
import { connect } from '@holochain/hc-web-client';
import { BasketState } from '../helpers/basket-state.enum';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient,
  ) {}

  getAllBaskets(state: BasketState): Observable<Basket[]> {
    let basketState = state.toString()
    let params: HttpParams = new HttpParams().set('state', basketState)
    return this.http.get<Basket[]>("http://localhost:3000/baskets", {params: params}).pipe(
      catchError(error => {
        console.error('[Basket]API Error:', error);
        return throwError(error);
      })
    );
  }

  getBasket(basketId: string): Observable<Basket> {
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
        return throwError(error);
      })
    )
  }


  getBasketHolo(basketId: string): Observable<any> {
    const promise = connect("ws://localhost:8888")
      .then(({ call }) => call('test-instance/pos/main/get_basket')({basket_addr: basketId}));
    return from(promise).pipe(
      map((data) => JSON.parse(data)["Ok"]),
      tap((data) => {
        if (!("Ok" in data)) {
          throwError(new Error(data))
        }
      })
    )
  }

  getAllBasketsHolo(): Observable<any> {
    const promise = connect("ws://localhost:8888")
      .then(({ call }) => call('test-instance/pos/main/get_baskets')({}));
    return from(promise).pipe(
      map((data) => JSON.parse(data)),
      tap((data) => {
        if (!("Ok" in data)) {
          throwError(new Error(data))
        }
      })
    )
  }

  addToBasketHolo(product_position: ProductPosition): Observable<any> {
    let params = this.buildHoloParams(product_position);
    console.log(params)
    const promise = connect("ws://localhost:8888")
      .then(({ call }) => call('test-instance/pos/main/add_product')(params));
    return from(promise).pipe(
      map((data) => JSON.parse(data)["Ok"]),
      tap((data) => {
        if (!("Ok" in data)) {
          throwError(new Error(data))
        }
      })
    )
  }

  private buildHoloParams(product_position: ProductPosition) {
    let basket_addr = product_position.basket_id
    let product_addr = product_position.product_id
    delete product_position.basket_id;
    delete product_position.product_id;
    delete product_position.products;

    return {
      product_addr: product_addr,
      basket_addr: basket_addr,
      position: {
        amount: product_position.amount,
        timestamp: Date.now().toString()
      }
    }
  }
}
