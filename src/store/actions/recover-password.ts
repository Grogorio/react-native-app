import { IValidatedInputField, IAWSError } from '../../models'
import { Action } from './action'

// tslint:disable:max-classes-per-file

export enum RecoverPasswordTypeKeys {
  RESET_FIELDS = 'RECOVER_PASSWORD_RESET_FIELDS',
  SET_DNI = 'RECOVER_PASSWORD_SET_DNI',
  SET_NEW_PASSWORD = 'RECOVER_PASSWORD_SET_NEW_PASSWORD',
  SET_VALIDATION_NEW_PASSWORD = 'RECOVER_PASSWORD_SET_VALIDATION_NEW_PASSWORD',
  SET_IS_CODE_SENT = 'RECOVER_PASSWORD_SET_IS_CODE_SENT',
  SET_CODE = 'RECOVER_PASSWORD_SET_CODE',
  SET_IS_PASSWORD_RECOVERED = 'RECOVER_PASSWORD_SET_IS_PASSWORD_RECOVERED',
  SET_ERROR = 'RECOVER_PASSWORD_SET_ERROR'
}

export type RecoverPasswordActions =
  | SetDniAction
  | SetNewPasswordAction
  | SetValidationNewPasswordAction
  | SetIsCodeSentAction
  | SetCodeAction
  | SetIsPasswordRecoveredAction
  | ResetRecoverPasswordFieldsAction
  | SetRecoverPasswordErrorAction

export class ResetRecoverPasswordFieldsAction extends Action<void> {
  public readonly type = RecoverPasswordTypeKeys.RESET_FIELDS
}

export class SetDniAction extends Action<IValidatedInputField<string>> {
  public readonly type = RecoverPasswordTypeKeys.SET_DNI
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetNewPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = RecoverPasswordTypeKeys.SET_NEW_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetValidationNewPasswordAction extends Action<IValidatedInputField<string>> {
  public readonly type = RecoverPasswordTypeKeys.SET_VALIDATION_NEW_PASSWORD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetIsCodeSentAction extends Action<boolean> {
  public readonly type = RecoverPasswordTypeKeys.SET_IS_CODE_SENT
  constructor(public payload: boolean) {
    super()
  }
}

export class SetIsPasswordRecoveredAction extends Action<boolean> {
  public readonly type = RecoverPasswordTypeKeys.SET_IS_PASSWORD_RECOVERED
  constructor(public payload: boolean) {
    super()
  }
}

export class SetCodeAction extends Action<IValidatedInputField<string>> {
  public readonly type = RecoverPasswordTypeKeys.SET_CODE
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetRecoverPasswordErrorAction extends Action<IAWSError> {
  public readonly type = RecoverPasswordTypeKeys.SET_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}
