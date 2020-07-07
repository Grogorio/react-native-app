import { NewPasswordRequiredActions, NewPasswordRequiredTypeKeys } from '../actions'
import { INewPasswordRequiredState } from '../states'
import { initialValidatedInputField } from '../../models'

const initialState: INewPasswordRequiredState = {
  password: initialValidatedInputField,
  validationPassword: initialValidatedInputField,
  cognitoUser: null
}

export default (
  state: INewPasswordRequiredState = initialState,
  action: NewPasswordRequiredActions
): INewPasswordRequiredState => {
  switch (action.type) {
    case NewPasswordRequiredTypeKeys.RESET_FIELDS:
      return initialState
    case NewPasswordRequiredTypeKeys.SET_PASSWORD:
      return { ...state, password: action.payload }
    case NewPasswordRequiredTypeKeys.SET_VERIFICATION_PASSWORD:
      return { ...state, validationPassword: action.payload }
    case NewPasswordRequiredTypeKeys.SET_COGNITO_USER:
      return { ...state, cognitoUser: action.payload }
    default:
      return state
  }
}
