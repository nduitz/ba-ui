import { Injectable } from '@angular/core';
import { FeatureService } from '../services/feature.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as featureActions from '../actions/feature.action'
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable()
export class FeatureEffect {

  constructor(
    private featureService: FeatureService,
    private actions$: Actions,

  ){}

  @Effect()
  toggleFeature$ = this.actions$.pipe(
    tap(data => console.log(data)),
    ofType<featureActions.ToggleFeature>(featureActions.TOGGLE_FEATURE),
    map(_ => {
      return new featureActions.ToggleFeatureSuccess(this.featureService.toggleFeature())
    },
    catchError(error => of(new featureActions.ToggleFeatureError(error))))  
    )
}