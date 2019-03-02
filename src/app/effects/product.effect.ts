import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as productActions from '../actions/product.action';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductService } from '../services/product.service';
import { AppState } from '../reducers';
import { FeatureService } from '../services/feature.service';
import { Feature } from '../helpers/feature.enum';

@Injectable()
export class ProductEffect {

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private store$: Store<AppState>,
    private featureService: FeatureService
  ) {}

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType<productActions.CreateProduct>(productActions.CREATE_PRODUCT),
    switchMap(action => this.productService.createProduct(action.payload).pipe(
      map(data => {
        return new productActions.CreateProductSuccess(data)
      }),
      catchError(error => of(new productActions.CreateProductError(error)))
    ))
  )

  @Effect()
  getAllProducts$ = this.actions$.pipe(
    ofType<productActions.GetAllProducts>(productActions.GET_ALL_PRODUCTS),
    switchMap(action => 
      this.featureService.getFeature() == Feature.HOLOCHAIN ?
        this.productService.getAllProductsHolo().pipe(
          map(data => {
            return new productActions.GetAllProductsSuccess(data)
          }),
          catchError(error => of(new productActions.GetAllProductsError(error)))
        ):
        this.productService.getAllProducts().pipe(
          map(data => {
            return new productActions.GetAllProductsSuccess(data)
          }),
          catchError(error => of(new productActions.GetAllProductsError(error)))
        )
    )
  )

  @Effect()
  getProduct$ = this.actions$.pipe(
    tap(data => console.log(data)),
    ofType<productActions.GetProduct>(productActions.GET_PRODUCT),
    switchMap(action => 
      this.featureService.getFeature() == Feature.HOLOCHAIN ?
        this.productService.getProductHolo(action.payload).pipe(
          map(data => {
            return new productActions.GetProductSuccess(data)
          }),
          catchError(error => of(new productActions.GetProductError(error)))
        ):
        this.productService.getProduct(parseInt(action.payload)).pipe(
          map(data => {
            return new productActions.GetProductSuccess(data)
          }),
          catchError(error => of(new productActions.GetProductError(error)))
        )
    ),
    
    
  )

}
