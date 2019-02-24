import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Basket } from '../models/basket.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http: HttpClient) {
  }

  getAllBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>("http://localhost:3000/baskets").pipe(
      catchError(error => {
        console.error('[Product]API Error:', error);
        return throwError(error);
      })
    );
  }

  getBasket(basketId: number): Observable<Basket> {
    return this.http.get<Basket>(`http://localhost:3000/baskets/${basketId}`).pipe(
      catchError(error => {
        console.error('[Product]API Error:', error);
        return throwError(error);
      })
    );
  }
}
