import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { ToggleFeature } from './actions/feature.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rails-ui';

  constructor(
    private store$: Store<AppState>
  ) {

  }

  toggleFeature() {
    this.store$.dispatch(new ToggleFeature())
  }
}

