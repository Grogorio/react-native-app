import { SignUpActions, SignUpTypeKeys } from '../actions'
import { ISignUpState } from '../states'
import { initialValidatedInputField, generateValidatedInputField } from '../../models'

export const initialSignUpState: ISignUpState = {
  email: initialValidatedInputField,
  password: initialValidatedInputField,
  validationPassword: initialValidatedInputField,
  name: initialValidatedInputField,
  lastName: initialValidatedInputField,
  dni: initialValidatedInputField,
  municipality: initialValidatedInputField,
  telephone: generateValidatedInputField(null, true),
  isSignedUpSuccesfully: false,
  error: null,
  verificationCode: initialValidatedInputField,
  isAccountVerified: false,
  verificationError: null,
  newVerificationCodeNif: initialValidatedInputField,
  newVerificationCodeError: null,
  isNewVerificationCodeSent: false
}

const signUp = (state: ISignUpState = initialSignUpState, action: SignUpActions): ISignUpState => {
  switch (action.type) {
    case SignUpTypeKeys.SET_IS_SIGNED_UP_SUCCESFULLY:
      return {
        ...state,
        isSignedUpSuccesfully: action.payload
      }
    case SignUpTypeKeys.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SignUpTypeKeys.SET_VERIFICATION_CODE:
      return {
        ...state,
        verificationCode: action.payload,
        verificationError: null
      }
    case SignUpTypeKeys.SET_IS_ACCOUNT_VERIFIED:
      return {
        ...state,
        isAccountVerified: action.payload
      }
    case SignUpTypeKeys.SET_VERIFICATION_ERROR:
      return {
        ...state,
        verificationError: action.payload
      }
    case SignUpTypeKeys.RESET_FIELDS:
      return initialSignUpState
    // STEP 1
    case SignUpTypeKeys.SET_NAME_FIELD:
      return {
        ...state,
        name: action.payload
      }
    case SignUpTypeKeys.SET_LASTNAME_FIELD:
      return {
        ...state,
        lastName: action.payload
      }
    case SignUpTypeKeys.SET_DNI_FIELD:
      return {
        ...state,
        dni: action.payload
      }
    // STEP 2
    case SignUpTypeKeys.SET_EMAIL_FIELD:
      return {
        ...state,
        email: action.payload
      }
    case SignUpTypeKeys.SET_PASSWORD_FIELD:
      return {
        ...state,
        password: action.payload
      }
    case SignUpTypeKeys.SET_VALIDATION_PASSWORD_FIELD:
      return {
        ...state,
        validationPassword: action.payload
      }
    // STEP 3
    case SignUpTypeKeys.SET_MUNICIPALITY_FIELD:
      return {
        ...state,
        municipality: action.payload
      }
    case SignUpTypeKeys.SET_TELEPHONE_FIELD:
      return {
        ...state,
        telephone: action.payload
      }
    // NEW RESERVATION CODE
    case SignUpTypeKeys.SET_NEW_CONFIRMATION_CODE_NIF_FIELD:
      return {
        ...state,
        newVerificationCodeNif: action.payload,
        newVerificationCodeError: null
      }
    case SignUpTypeKeys.SET_NEW_CONFIRMATION_CODE_ERROR:
      return {
        ...state,
        newVerificationCodeNif: initialValidatedInputField,
        newVerificationCodeError: action.payload
      }
    case SignUpTypeKeys.SET_IS_NEW_CONFIRMATION_CODE_SENT:
      return {
        ...state,
        newVerificationCodeNif: initialValidatedInputField,
        isNewVerificationCodeSent: action.payload
      }
    default:
      return state
  }
}

export default signUp
