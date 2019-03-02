import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as basketActions from '../actions/basket.action';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { BasketService } from '../services/basket.service';
import { FeatureService } from '../services/feature.service';
import { Feature } from '../helpers/feature.enum';
import { Basket } from '../models/basket.model';
import { JsonPipe } from '@angular/common';

@Injectable()
export class BasketEffect {

  constructor(
    private basketService: BasketService,
    private actions$: Actions,
    private featureService: FeatureService
  ) {}

  @Effect()
  createBasket$ = this.actions$.pipe(
    ofType<basketActions.CreateBasket>(basketActions.CREATE_BASKET),
    switchMap(action => this.basketService.createBasket(action.payload).pipe(
      map(data => {
        return new basketActions.CreateBasketSuccess(data)
      }),
      catchError(error => of(new basketActions.CreateBasketError(error)))
    ))
  )

  @Effect()
  getAllBaskets$ = this.actions$.pipe(
    ofType<basketActions.GetAllBaskets>(basketActions.GET_ALL_BASKETS),
    switchMap(action =>
      this.featureService.getFeature() == Feature.HOLOCHAIN ?
        this.basketService.getAllBasketsHolo():
        this.basketService.getAllBaskets(action.payload)
    ),
    map(data => new basketActions.GetAllBasketsSuccess(data)),
    catchError(error => of(new basketActions.GetAllBasketsError(error)))
  )

  @Effect()
  getBasket$ = this.actions$.pipe(
    ofType<basketActions.GetBasket>(basketActions.GET_BASKET),
    switchMap(action => 
      this.featureService.getFeature() == Feature.HOLOCHAIN ?
      this.basketService.getBasketHolo(action.payload).pipe(
        map(data => {
          return new basketActions.GetBasketSuccess(data)
        }),
        catchError(error => of(new basketActions.GetBasketError(error)))
      ):
      this.basketService.getBasket(action.payload).pipe(
        map(data => {
          return new basketActions.GetBasketSuccess(data)
        }),
        catchError(error => of(new basketActions.GetBasketError(error)))
      )
    )
  )
  
  @Effect()
  addProductToBasket$ = this.actions$.pipe(
    ofType<basketActions.AddProductToBasket>(basketActions.ADD_PRODUCT_TO_BASKET),
    tap(action => console.log(action.payload)),
    switchMap(action => 
      this.featureService.getFeature() == Feature.HOLOCHAIN ?
        this.basketService.addToBasketHolo(action.payload).pipe(
          map(data => {
            return new basketActions.AddProductToBasketSuccess(data)
          }),
          catchError(error => of(new basketActions.AddProductToBasketError(error)))
        ):
        this.basketService.addToBasket(action.payload).pipe(
          map(data => {
            return new basketActions.AddProductToBasketSuccess(data)
          }),
          catchError(error => of(new basketActions.AddProductToBasketError(error)))
        )
    )
  )
}
