import { Feature } from '../helpers/feature.enum';

export const TOGGLE_FEATURE = '[feature] toggle feature';
export const TOGGLE_FEATURE_SUCCESS = '[feature] toggle feature success';
export const TOGGLE_FEATURE_ERROR = '[feature] toggle feature error';;

export class ToggleFeature {
  readonly type = TOGGLE_FEATURE;

  constructor() {}
}

export class ToggleFeatureSuccess {
  readonly type = TOGGLE_FEATURE_SUCCESS;

  constructor(public payload: Feature) {}
}

export class ToggleFeatureError {
  readonly type = TOGGLE_FEATURE_ERROR;

  constructor(public payload: Error) {}
}