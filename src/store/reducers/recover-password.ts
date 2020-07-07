import { RecoverPasswordActions, RecoverPasswordTypeKeys } from '../actions'
import { IRecoverPasswordState } from '../states'
import { initialValidatedInputField } from '../../models'

const initialState: IRecoverPasswordState = {
  dni: initialValidatedInputField,
  newPassword: initialValidatedInputField,
  validationNewPassword: initialValidatedInputField,
  code: initialValidatedInputField,
  isCodeSent: false,
  isPasswordRecovered: false,
  error: null
}

export default (state: IRecoverPasswordState = initialState, action: RecoverPasswordActions): IRecoverPasswordState => {
  switch (action.type) {
    case RecoverPasswordTypeKeys.RESET_FIELDS:
      return initialState
    case RecoverPasswordTypeKeys.SET_DNI:
      return { ...state, dni: action.payload, error: null }
    case RecoverPasswordTypeKeys.SET_NEW_PASSWORD:
      return { ...state, newPassword: action.payload, error: null }
    case RecoverPasswordTypeKeys.SET_VALIDATION_NEW_PASSWORD:
      return { ...state, validationNewPassword: action.payload, error: null }
    case RecoverPasswordTypeKeys.SET_CODE:
      return { ...state, code: action.payload, error: null }
    case RecoverPasswordTypeKeys.SET_IS_CODE_SENT:
      return { ...state, isCodeSent: action.payload }
    case RecoverPasswordTypeKeys.SET_IS_PASSWORD_RECOVERED:
      return { ...state, isPasswordRecovered: action.payload }
    case RecoverPasswordTypeKeys.SET_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
