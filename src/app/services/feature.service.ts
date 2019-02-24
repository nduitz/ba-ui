import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { Feature } from '../helpers/feature.enum';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  feature$: Observable<Feature> = this.store$.select('feature')

  constructor(
    private store$: Store<AppState>
  ) { }


  getFeature(){
    return Feature.HOLOCHAIN
  }
}
