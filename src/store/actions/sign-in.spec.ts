import {
  SignInTypeKeys,
  ResetSignInFieldsAction,
  SetSignInEmailFieldAction,
  SetSignInErrorAction,
  SetSignInPasswordFieldAction
} from './sign-in'
import { errorMock, getField } from '../../tests'

describe('Sign in actions', () => {
  it('all SignIn actions should have the SIGN_IN prefix', () => {
    Object.getOwnPropertyNames(SignInTypeKeys).forEach((x: any) => {
      expect(SignInTypeKeys[x].startsWith('SIGN_IN')).toBeTruthy()
    })
  })

  it('should create an action to reset sign in fields', () => {
    const expectedAction = { type: SignInTypeKeys.RESET_FIELDS }
    expect(new ResetSignInFieldsAction()).toEqual(expectedAction)
  })

  it('should create an action to set sign in email field', () => {
    const field = getField('test@test.com', true)
    const expectedAction = {
      type: SignInTypeKeys.SET_EMAIL_FIELD,
      payload: field
    }
    expect(new SetSignInEmailFieldAction(field)).toEqual(expectedAction)
  })

  it('should create an action to set sign in password field', () => {
    const field = getField('pwd_testing', true)
    const expectedAction = {
      type: SignInTypeKeys.SET_PASSWORD_FIELD,
      payload: field
    }
    expect(new SetSignInPasswordFieldAction(field)).toEqual(expectedAction)
  })

  it('should create an action to set sign in error', () => {
    const expectedAction = {
      type: SignInTypeKeys.SET_ERROR,
      payload: errorMock
    }
    expect(new SetSignInErrorAction(errorMock)).toEqual(expectedAction)
  })
})
