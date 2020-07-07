import { IValidatedInputField, IAWSError } from '../../models'

export interface IChangePasswordState {
  password: IValidatedInputField<string>
  newPassword: IValidatedInputField<string>
  error: IAWSError
}
