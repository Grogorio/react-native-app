import { IValidatedInputField, IAWSError } from '../../models'
import { Action } from './action'

// tslint:disable:max-classes-per-file

export enum SignInTypeKeys {
  RESET_FIELDS = 'SIGN_IN_RESET_FIELDS',
  SET_EMAIL_FIELD = 'SIGN_IN_SET_EMAIL_FIELD',
  SET_PASSWORD_FIELD = 'SIGN_IN_SET_PASSWORD_FIELD',
  SET_ERROR = 'SIGN_IN_SET_ERROR',
  SET_IS_NEW_PASSWORD_REQUIRED = 'SIGN_IN_SET_IS_NEW_PASSWORD_REQUIRED'
}

export type SignInActions =
  | ResetSignInFieldsAction
  | SetSignInEmailFieldAction
  | SetSignInPasswordFieldAction
  | SetSignInErrorAction
  | SetSignInIsNewPasswordRequiredAction

export class ResetSignInFieldsAction extends Action {
  public readonly type = SignInTypeKeys.RESET_FIELDS
}

export class SetSignInEmailFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignInTypeKeys.SET_EMAIL_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignInPasswordFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignInTypeKeys.SET_PASSWORD_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignInErrorAction extends Action<IAWSError> {
  public readonly type = SignInTypeKeys.SET_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}

export class SetSignInIsNewPasswordRequiredAction extends Action<boolean> {
  public readonly type = SignInTypeKeys.SET_IS_NEW_PASSWORD_REQUIRED
  constructor(public payload: boolean) {
    super()
  }
}
