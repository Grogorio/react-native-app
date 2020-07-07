import reducer, { initialSignUpState } from './sign-up'
import { storeMock, errorMock, getField } from '../../tests'
import {
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
} from '../actions/sign-up'

jest.mock('@aws-amplify/api/lib')

describe('Sign up reducer', () => {
  it('should handle ResetSignUpFieldsAction', () => {
    const nextState = reducer(storeMock.signUp, new ResetSignUpFieldsAction())
    expect(nextState).toEqual(initialSignUpState)
  })

  it('should handle SetIsAccountVerifiedAction', () => {
    const nextState = reducer(storeMock.signUp, new SetSignUpIsAccountVerifiedAction(true))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      isAccountVerified: true
    })
  })

  it('should handle SetIsSignedUpSuccesfullyAction', () => {
    const nextState = reducer(storeMock.signUp, new SetSignUpIsSignedUpSuccesfullyAction(true))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      isSignedUpSuccesfully: true
    })
  })

  it('should handle SetSignUpDniFieldAction', () => {
    const field = getField('12345678W', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpDniFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      dni: field
    })
  })

  it('should handle SetSignUpEmailFieldAction', () => {
    const field = getField('test@testing.com', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpEmailFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      email: field
    })
  })

  it('should handle SetSignUpErrorAction', () => {
    const nextState = reducer(storeMock.signUp, new SetSignUpErrorAction(errorMock))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      error: errorMock
    })
  })

  it('should handle SetSignUpLastNameFieldAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpLastNameFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      lastName: field
    })
  })

  it('should handle SetSignUpMunicipalityFieldAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpMunicipalityFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      municipality: field
    })
  })

  it('should handle SetSignUpNameFieldAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpNameFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      name: field
    })
  })

  it('should handle SetSignUpPasswordFieldAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpPasswordFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      password: field
    })
  })

  it('should handle SetSignUpTelephoneFieldAction', () => {
    const field = getField('666666666', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpTelephoneFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      telephone: field
    })
  })

  it('should handle SetSignUpValidationPasswordFieldAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpValidationPasswordFieldAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      validationPassword: field
    })
  })

  it('should handle SetSignUpVerificationErrorAction', () => {
    const nextState = reducer(storeMock.signUp, new SetSignUpVerificationErrorAction(errorMock))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      verificationError: errorMock
    })
  })

  it('should handle SetVerificationCodeAction', () => {
    const field = getField('testing', true)
    const nextState = reducer(storeMock.signUp, new SetSignUpVerificationCodeAction(field))
    expect(nextState).toEqual({
      ...storeMock.signUp,
      verificationCode: field
    })
  })
})
