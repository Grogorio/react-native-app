import { IValidatedInputField } from '../../models'
import { Action } from './action'

// tslint:disable:max-classes-per-file

export enum NewPasswordRequiredTypeKeys {
  RESET_FIELDS = 'NEW_PASSWORD_REQUIRED_RESET_FIELDS',
  SET_PASSWORD = 'NEW_PASSWORD_REQUIRED_SET_PASSWORD',
  SET_VERIFICATION_PASSWORD = 'NEW_PASSWORD_REQUIRED_SET_VERIFICATION_PASSWORD',
  SET_COGNITO_USER = 'NEW_PASSWORD_REQUIRED_SET_COGNITO_USER'
}

export type NewPasswordRequiredActions =
  | ResetNewPasswordRequiredFieldsAction
  | SetNewPasswordRequiredPasswordAction
  | SetNewPasswordRequiredVerificationPasswordAction
  | SetNewPasswordRequiredCognitoUserAction

export class ResetNewPasswordRequiredFieldsAction extends Action<void> {
  public readonly type = NewPasswordRequiredTypeKeys.RESET_FIELDS
}

export class SetNewPasswordRequiredPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = NewPasswordRequiredTypeKeys.SET_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetNewPasswordRequiredVerificationPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = NewPasswordRequiredTypeKeys.SET_VERIFICATION_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetNewPasswordRequiredCognitoUserAction extends Action<any> {
  public readonly type = NewPasswordRequiredTypeKeys.SET_COGNITO_USER
  constructor(public payload: any) {
    super()
  }
}
