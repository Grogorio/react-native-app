import {
  SignUpTypeKeys,
  ResetSignUpFieldsAction,
  SetSignUpIsAccountVerifiedAction,
  SetSignUpIsSignedUpSuccesfullyAction,
  SetSignUpDniFieldAction,
  SetSignUpEmailFieldAction,
  SetSignUpErrorAction,
  SetSignUpLastNameFieldAction,
  SetSignUpMunicipalityFieldAction,
  SetSignUpNameFieldAction,
  SetSignUpPasswordFieldAction,
  SetSignUpTelephoneFieldAction,
  SetSignUpValidationPasswordFieldAction,
  SetSignUpVerificationErrorAction,
  SetSignUpVerificationCodeAction
} from './sign-up'
import { initialValidatedInputField } from '../../models'
import { errorMock } from '../../tests'

describe('Sign up actions', () => {
  it('all SignUp actions should have the SIGN_UP prefix', () => {
    Object.getOwnPropertyNames(SignUpTypeKeys).forEach((x: any) => {
      expect(SignUpTypeKeys[x].startsWith('SIGN_UP')).toBeTruthy()
    })
  })

  it('should create the action ResetSignUpFieldsAction', () => {
    const expectedAction = { type: SignUpTypeKeys.RESET_FIELDS }
    expect(new ResetSignUpFieldsAction()).toEqual(expectedAction)
  })

  it('should create the action SetIsAccountVerifiedAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_IS_ACCOUNT_VERIFIED,
      payload: true
    }
    expect(new SetSignUpIsAccountVerifiedAction(true)).toEqual(expectedAction)
  })

  it('should create the action SetIsSignedUpSuccesfullyAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_IS_SIGNED_UP_SUCCESFULLY,
      payload: true
    }
    expect(new SetSignUpIsSignedUpSuccesfullyAction(true)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpDniFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_DNI_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpDniFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpEmailFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_EMAIL_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpEmailFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpErrorAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_ERROR,
      payload: errorMock
    }
    expect(new SetSignUpErrorAction(errorMock)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpLastNameFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_LASTNAME_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpLastNameFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpMunicipalityFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_MUNICIPALITY_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpMunicipalityFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpNameFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_NAME_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpNameFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpPasswordFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_PASSWORD_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpPasswordFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpTelephoneFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_TELEPHONE_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpTelephoneFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpValidationPasswordFieldAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_VALIDATION_PASSWORD_FIELD,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpValidationPasswordFieldAction(initialValidatedInputField)).toEqual(expectedAction)
  })

  it('should create the action SetSignUpVerificationErrorAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_VERIFICATION_ERROR,
      payload: errorMock
    }
    expect(new SetSignUpVerificationErrorAction(errorMock)).toEqual(expectedAction)
  })

  it('should create the action SetVerificationCodeAction', () => {
    const expectedAction = {
      type: SignUpTypeKeys.SET_VERIFICATION_CODE,
      payload: initialValidatedInputField
    }
    expect(new SetSignUpVerificationCodeAction(initialValidatedInputField)).toEqual(expectedAction)
  })
})
