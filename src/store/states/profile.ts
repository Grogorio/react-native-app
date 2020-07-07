import { IValidatedInputField } from '../../models'

export interface IProfileState {
  email: IValidatedInputField<string>
  name: IValidatedInputField<string>
  lastName: IValidatedInputField<string>
  dni: IValidatedInputField<string>
  telephone: IValidatedInputField<string>
}
