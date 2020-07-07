import reducer, { initialSignInState } from './sign-in'
import { storeMock, getUser, errorMock } from '../../tests'
import {
  ResetSignInFieldsAction,
  SetSignInEmailFieldAction,
  SetSignInErrorAction,
  SetSignInPasswordFieldAction,
  SetUserAction
} from '../actions'

jest.mock('@aws-amplify/api/lib')

describe('Sign in reducer', () => {
  it('should handle ResetSignInFieldsAction', () => {
    const nextState = reducer(storeMock.signIn, new ResetSignInFieldsAction())
    expect(nextState).toEqual(initialSignInState)
  })

  it('should handle SetUserAction', () => {
    const nextState = reducer(storeMock.signIn, new SetUserAction(getUser()))
    expect(nextState).toEqual({
      ...storeMock.signIn,
      email: { value: null, isValid: false },
      password: { value: null, isValid: false }
    })
  })

  it('should handle SetSignInEmailFieldAction', () => {
    const emailField = { value: 'test', isValid: false }
    const nextState = reducer(storeMock.signIn, new SetSignInEmailFieldAction(emailField))
    expect(nextState).toEqual({
      ...storeMock.signIn,
      email: emailField
    })
  })

  it('should handle SetSignInErrorAction', () => {
    const nextState = reducer(storeMock.signIn, new SetSignInErrorAction(errorMock))
    expect(nextState).toEqual({
      ...storeMock.signIn,
      email: { value: null, isValid: false },
      password: { value: null, isValid: false },
      error: errorMock
    })
  })

  it('should handle SetSignInPasswordFieldAction', () => {
    const passwordField = { value: 'test', isValid: false }
    const nextState = reducer(storeMock.signIn, new SetSignInPasswordFieldAction(passwordField))
    expect(nextState).toEqual({
      ...storeMock.signIn,
      password: passwordField
    })
  })
})
