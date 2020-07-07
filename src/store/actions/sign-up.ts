// tslint:disable:max-classes-per-file
import { IValidatedInputField, IAWSError } from '../../models'
import { Action } from './action'

export enum SignUpTypeKeys {
  SET_IS_SIGNED_UP_SUCCESFULLY = 'SIGN_UP_SET_IS_SIGNED_UP_SUCCESFULLY',
  SET_ERROR = 'SIGN_UP_SET_ERROR',
  SET_EMAIL_FIELD = 'SIGN_UP_SET_EMAIL_FIELD',
  SET_PASSWORD_FIELD = 'SIGN_UP_SET_PASSWORD_FIELD',
  SET_VALIDATION_PASSWORD_FIELD = 'SIGN_UP_SET_VALIDATION_PASSWORD_FIELD',
  SET_NAME_FIELD = 'SIGN_UP_SET_NAME_FIELD',
  SET_LASTNAME_FIELD = 'SIGN_UP_SET_LASTNAME_FIELD',
  SET_DNI_FIELD = 'SIGN_UP_SET_DNI_FIELD',
  SET_MUNICIPALITY_FIELD = 'SIGN_UP_SET_MUNICIPALITY_FIELD',
  SET_TELEPHONE_FIELD = 'SIGN_UP_SET_TELEPHONE_FIELD',
  SET_VERIFICATION_CODE = 'SIGN_UP_SET_VERIFICATION_CODE',
  SET_IS_ACCOUNT_VERIFIED = 'SIGN_UP_SET_IS_ACCOUNT_VERIFIED',
  SET_VERIFICATION_ERROR = 'SIGN_UP_SET_VERIFICATION_ERROR',
  SET_IS_NEW_CONFIRMATION_CODE_SENT = 'SIGN_UP_SET_IS_NEW_CONFIRMATION_CODE_SENT',
  SET_NEW_CONFIRMATION_CODE_NIF_FIELD = 'SIGN_UP_SET_NEW_CONFIRMATION_CODE_NIF_FIELD',
  SET_NEW_CONFIRMATION_CODE_ERROR = 'SIGN_UP_SET_NEW_CONFIRMATION_CODE_ERROR',
  RESET_FIELDS = 'SIGN_UP_RESET_FIELDS'
}

export type SignUpActions =
  | SetSignUpIsSignedUpSuccesfullyAction
  | SetSignUpIsAccountVerifiedAction
  | SetSignUpErrorAction
  | SetSignUpVerificationErrorAction
  | SetSignUpVerificationCodeAction
  | ResetSignUpFieldsAction
  | SetSignUpNameFieldAction
  | SetSignUpLastNameFieldAction
  | SetSignUpDniFieldAction
  | SetSignUpEmailFieldAction
  | SetSignUpPasswordFieldAction
  | SetSignUpValidationPasswordFieldAction
  | SetSignUpMunicipalityFieldAction
  | SetSignUpTelephoneFieldAction
  | SetSignUpNewConfirmationCodeNifFieldAction
  | SetSignUpIsNewConfirmationCodeSentFieldAction
  | SetSignUpNewConfirmationCodeErrorAction

// FLAGS *************************************
export class SetSignUpIsSignedUpSuccesfullyAction extends Action<boolean> {
  public readonly type = SignUpTypeKeys.SET_IS_SIGNED_UP_SUCCESFULLY
  constructor(public payload: boolean) {
    super()
  }
}

export class SetSignUpIsAccountVerifiedAction extends Action<boolean> {
  public readonly type = SignUpTypeKeys.SET_IS_ACCOUNT_VERIFIED
  constructor(public payload: boolean) {
    super()
  }
}

// ERRORS *********************************
export class SetSignUpErrorAction extends Action<IAWSError> {
  public readonly type = SignUpTypeKeys.SET_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}

export class SetSignUpVerificationErrorAction extends Action<IAWSError> {
  public readonly type = SignUpTypeKeys.SET_VERIFICATION_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}

export class SetSignUpVerificationCodeAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_VERIFICATION_CODE
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class ResetSignUpFieldsAction extends Action {
  public readonly type = SignUpTypeKeys.RESET_FIELDS
}

// STEP 1 ***************************************
export class SetSignUpNameFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_NAME_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpLastNameFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_LASTNAME_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpDniFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_DNI_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

// STEP 2 **************************************
export class SetSignUpEmailFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_EMAIL_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpPasswordFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_PASSWORD_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpValidationPasswordFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_VALIDATION_PASSWORD_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

// STEP 3 ************************************
export class SetSignUpMunicipalityFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_MUNICIPALITY_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpTelephoneFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_TELEPHONE_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

// NEW CONFIRMATION CODE ************************************
export class SetSignUpNewConfirmationCodeNifFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = SignUpTypeKeys.SET_NEW_CONFIRMATION_CODE_NIF_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetSignUpIsNewConfirmationCodeSentFieldAction extends Action<boolean> {
  public readonly type = SignUpTypeKeys.SET_IS_NEW_CONFIRMATION_CODE_SENT
  constructor(public payload: boolean) {
    super()
  }
}

export class SetSignUpNewConfirmationCodeErrorAction extends Action<IAWSError> {
  public readonly type = SignUpTypeKeys.SET_NEW_CONFIRMATION_CODE_ERROR
  constructor(public payload: IAWSError) {
    super()
  }
}
