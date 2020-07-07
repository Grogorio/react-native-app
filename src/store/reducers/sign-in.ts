import { SignInTypeKeys, UserTypeKeys, SignInActions, SetUserAction } from '../actions'
import { ISignInState } from '../states'
import { initialValidatedInputField } from '../../models'

export const initialSignInState: ISignInState = {
  email: initialValidatedInputField,
  password: initialValidatedInputField,
  error: null,
  isNewPasswordRequired: false
}

const signIn = (state: ISignInState = initialSignInState, action: SignInActions | SetUserAction): ISignInState => {
  switch (action.type) {
    case SignInTypeKeys.RESET_FIELDS:
    case UserTypeKeys.SET_USER:
      return initialSignInState
    case SignInTypeKeys.SET_EMAIL_FIELD:
      return {
        ...state,
        email: action.payload,
        error: null
      }
    case SignInTypeKeys.SET_PASSWORD_FIELD:
      return {
        ...state,
        password: action.payload,
        error: null
      }
    case SignInTypeKeys.SET_ERROR:
      return {
        ...state,
        email: initialValidatedInputField,
        password: initialValidatedInputField,
        error: action.payload
      }
    case SignInTypeKeys.SET_IS_NEW_PASSWORD_REQUIRED:
      return {
        ...state,
        email: initialValidatedInputField,
        password: initialValidatedInputField,
        error: null,
        isNewPasswordRequired: action.payload
      }
    default:
      return state
  }
}

export default signIn
