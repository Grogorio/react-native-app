import { IValidatedInputField, IAWSError } from '../../models'

export interface ISignInState {
  email: IValidatedInputField<string>
  password: IValidatedInputField<string>
  error: IAWSError
  isNewPasswordRequired: boolean
}
