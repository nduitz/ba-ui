import { Feature } from '../helpers/feature.enum';
import { ToggleFeature, ToggleFeatureSuccess, TOGGLE_FEATURE_SUCCESS } from '../actions/feature.action';
import { Action } from '@ngrx/store';

export type FeatureState = Feature;
export const initialState = Feature.RAILS;

function toggleFeature(state: FeatureState, action: ToggleFeatureSuccess): FeatureState {
  return action.payload
}

export function featureReducer(state: FeatureState = initialState, action: Action) {
  switch (action.type) {
    case TOGGLE_FEATURE_SUCCESS:
      return toggleFeature(state, action as ToggleFeatureSuccess)
    default:
      return state;
  }
}