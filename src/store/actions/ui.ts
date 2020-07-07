// tslint:disable:max-classes-per-file
import { Action } from './action'

export enum UITypeKeys {
  SET_IS_USER_SIGNED_IN = 'UI_SET_IS_USER_SIGNED_IN',
  SET_IS_SESSION_CHECKED = 'UI_SET_IS_SESSION_CHECKED',
  SET_SESSION_CHECKS = 'UI_SET_SESSION_CHECKS',
  RESET_SESSION = 'UI_RESET_SESSION',
  SET_ACTIVE_ROUTE_NAME = 'UI_SET_ACTIVE_ROUTE_NAME',
  TOGGLE_IS_MENU_VISIBLE = 'UI_TOGGLE_IS_MENU_VISIBLE',
  SET_MAX_RESERVABLE_DATE = 'UI_SET_MAX_RESERVABLE_DATE',
  SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS'
}

export interface ISetSessionChecksPayload {
  isSessionChecked: boolean
  isUserSignedIn: boolean
}

export type UIActions =
  | SetIsUserSignedInAction
  | SetIsSessionCheckedAction
  | SetSessionChecksAction
  | ResetSessionAction
  | ToggleIsMenuVisibleAction
  | SetActiveRouteNameAction
  | SetMaxReservableDateAction
  | SetConnectionStatusAction

export class SetMaxReservableDateAction extends Action<number> {
  public readonly type = UITypeKeys.SET_MAX_RESERVABLE_DATE
  constructor(public payload: number) {
    super()
  }
}

export class SetIsUserSignedInAction extends Action<boolean> {
  public readonly type = UITypeKeys.SET_IS_USER_SIGNED_IN
  constructor(public payload: boolean) {
    super()
  }
}

export class SetIsSessionCheckedAction extends Action<boolean> {
  public readonly type = UITypeKeys.SET_IS_SESSION_CHECKED
  constructor(public payload?: boolean) {
    super()
  }
}

export class SetSessionChecksAction extends Action<ISetSessionChecksPayload> {
  public readonly type = UITypeKeys.SET_SESSION_CHECKS
  constructor(public payload?: ISetSessionChecksPayload) {
    super()
  }
}

export class ResetSessionAction extends Action {
  public readonly type = UITypeKeys.RESET_SESSION
}

export class ToggleIsMenuVisibleAction extends Action {
  public readonly type = UITypeKeys.TOGGLE_IS_MENU_VISIBLE
}

export class SetActiveRouteNameAction extends Action<string> {
  public readonly type = UITypeKeys.SET_ACTIVE_ROUTE_NAME
  constructor(public payload: string) {
    super()
  }
}

export class SetConnectionStatusAction extends Action<boolean> {
  public readonly type = UITypeKeys.SET_CONNECTION_STATUS
  constructor(public payload: boolean) {
    super()
  }
}
