import { ChangePasswordActions, ChangePasswordTypeKeys } from '../actions'
import { IChangePasswordState } from '../states'
import { initialValidatedInputField } from '../../models'

const initialState: IChangePasswordState = {
  password: initialValidatedInputField,
  newPassword: initialValidatedInputField,
  error: null
}

export default (state: IChangePasswordState = initialState, action: ChangePasswordActions): IChangePasswordState => {
  switch (action.type) {
    case ChangePasswordTypeKeys.RESET_FIELDS:
      return initialState
    case ChangePasswordTypeKeys.SET_PASSWORD:
      return { ...state, password: action.payload, error: null }
    case ChangePasswordTypeKeys.SET_NEW_PASSWORD:
      return { ...state, newPassword: action.payload, error: null }
    case ChangePasswordTypeKeys.SET_ERROR:
      return {
        password: initialValidatedInputField,
        newPassword: initialValidatedInputField,
        error: action.payload
      }
    default:
      return state
  }
}
