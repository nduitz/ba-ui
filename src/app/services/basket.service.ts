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
    const promise = connect("ws://localhost:8888")
      .then(({ call }) => call('test-instance/pos/main/get_baskets')({}));
    return from(promise).pipe(
      map((data) => JSON.parse(data)),
      tap((data) => {
        console.log("undefined?",data)
        if (!("Ok" in data)) {
          throwError(new Error(data))
        }
      })
    )

    // connect("ws://localhost:8888").then(
    //   ({call, close}) => {
    //     call('test-instance/pos/main/get_baskets')({product: {name: "", description: "", price: 0}}).then(data => {
    //       console.log(data)
    //     })
    //   }
    // )
    // return of()
  }

  addToBasketHolo(product_position: ProductPosition): Observable<any> {
    let params = this.buildHoloParams(product_position);
    return from(
      connect("ws://localhost:8888").then(
        ({call, close}) => {
          call('test-instant/pos/get_baskets')(params)
        }
      )
    )
  }

  private buildHoloParams(product_position: ProductPosition) {
    let basket_addr = product_position.basket_id
    let product_addr = product_position.product_id
    delete product_position.basket_id;
    delete product_position.product_id;
    delete product_position.products;

    return {
      basket_addr: basket_addr,
      product_addr: product_addr,
      product_position: product_position
    }
  }
}
