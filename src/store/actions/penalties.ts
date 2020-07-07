import { IPenaltiesInfo } from '../../models'
import { Action } from './action'

// tslint:disable:max-classes-per-file

export enum PenaltiesTypeKeys {
  SET_IS_FETCHING_PENALTIES = 'SET_IS_FETCHING_PENALTIES',
  SET_PENALTIES = 'PENALTIES_SET_PENALTIES',
  RESET_PENALTIES = 'RESET_PENALTIES'
}

export type PenaltiesActions =
  | SetPenaltiesAction
  | SetIsFetchingPenaltiesAction
  | ResetPenaltiesAction

export class SetPenaltiesAction extends Action<IPenaltiesInfo> {
  public readonly type = PenaltiesTypeKeys.SET_PENALTIES
  constructor(public payload: IPenaltiesInfo) {
    super()
  }
}

export class SetIsFetchingPenaltiesAction extends Action {
  public readonly type = PenaltiesTypeKeys.SET_IS_FETCHING_PENALTIES
  constructor() {
    super()
  }
}

export class ResetPenaltiesAction extends Action {
  public readonly type = PenaltiesTypeKeys.RESET_PENALTIES
}
