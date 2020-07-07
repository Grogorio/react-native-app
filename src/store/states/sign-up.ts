import { IValidatedInputField, IAWSError } from '../../models'

export interface ISignUpState {
  // FIELDS
  email: IValidatedInputField<string>
  password: IValidatedInputField<string>
  validationPassword: IValidatedInputField<string>
  name: IValidatedInputField<string>
  lastName: IValidatedInputField<string>
  dni: IValidatedInputField<string>
  municipality: IValidatedInputField<string>
  telephone: IValidatedInputField<string>
  verificationCode: IValidatedInputField<string>
  newVerificationCodeNif: IValidatedInputField<string>
  // FLAGS
  isSignedUpSuccesfully: boolean
  isAccountVerified: boolean
  isNewVerificationCodeSent: boolean
  // ERRORS
  error: IAWSError
  verificationError: IAWSError
  newVerificationCodeError: IAWSError
}
