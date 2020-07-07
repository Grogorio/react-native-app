import { IValidatedInputField } from '../../models'

export interface INewPasswordRequiredState {
  password: IValidatedInputField<string>
  validationPassword: IValidatedInputField<string>
  cognitoUser: any
}
