import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, throwError } from 'rxjs';
import { Feature } from '../helpers/feature.enum';
import { map, take, catchError } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private feature: Feature;

  constructor(
    private store$: Store<AppState>
  ) { }

  toggleFeature(): Feature {
    let newFeature: Feature;
    if (this.getFeature() == Feature.RAILS) {
      newFeature = Feature.HOLOCHAIN
    }
    else {
      newFeature = Feature.RAILS
    }
    console.log(newFeature);

    if (newFeature == undefined ){
      throwError(new Error("future is undefined"))
    } else {
      return newFeature;
    }
  }

  getFeature(): Feature{
    this.store$.pipe(
      select('feature'),
      take(1)
    ).subscribe((feature: Feature) => {
      this.feature = feature;
      },
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
    return this.feature;
  }
}
