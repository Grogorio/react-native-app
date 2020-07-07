import { Action } from './action'
import { IValidatedInputField, IAWSError } from '../../models'

// tslint:disable:max-classes-per-file

export enum ChangePasswordTypeKeys {
  RESET_FIELDS = 'CHANGE_PASSWORD_RESET_FIELDS',
  SET_PASSWORD = 'CHANGE_PASSWORD_SET_PASSWORD',
  SET_NEW_PASSWORD = 'CHANGE_PASSWORD_SET_NEW_PASSWORD',
  SET_ERROR = 'CHANGE_PASSWORD_SET_ERROR'
}

export type ChangePasswordActions =
  | ResetChangePasswordFieldsAction
  | SetChangePasswordPasswordAction
  | SetChangePasswordNewPasswordAction
  | SetChangePasswordErrorAction

export class ResetChangePasswordFieldsAction extends Action<void> {
  public readonly type = ChangePasswordTypeKeys.RESET_FIELDS
}

export class SetChangePasswordPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = ChangePasswordTypeKeys.SET_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetChangePasswordNewPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = ChangePasswordTypeKeys.SET_NEW_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetChangePasswordErrorAction extends Action<IAWSError> {
  public readonly type = ChangePasswordTypeKeys.SET_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}
