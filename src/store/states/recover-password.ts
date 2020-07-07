import { IValidatedInputField, IAWSError } from '../../models'

export interface IRecoverPasswordState {
  dni: IValidatedInputField<string>
  newPassword: IValidatedInputField<string>
  validationNewPassword: IValidatedInputField<string>
  code: IValidatedInputField<string>
  isCodeSent: boolean
  isPasswordRecovered: boolean
  error: IAWSError
}
