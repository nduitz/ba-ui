import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
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

  
}
