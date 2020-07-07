import { ProfileActions, ProfileTypeKeys, UserActions, UserTypeKeys } from '../actions'
import { IProfileState } from '../states'
import { generateValidatedInputField, initialValidatedInputField } from '../../models'

const initialState: IProfileState = {
  name: initialValidatedInputField,
  email: initialValidatedInputField,
  lastName: initialValidatedInputField,
  dni: initialValidatedInputField,
  telephone: initialValidatedInputField
}

const profile = (state: IProfileState = initialState, action: ProfileActions | UserActions): IProfileState => {
  switch (action.type) {
    case UserTypeKeys.SET_USER:
      const { name, email, lastName, dni, telephone } = action.payload
      return {
        name: generateValidatedInputField(name, true),
        email: generateValidatedInputField(email, true),
        lastName: generateValidatedInputField(lastName, true),
        dni: generateValidatedInputField(dni, true),
        telephone: generateValidatedInputField(telephone, true)
      }
    case ProfileTypeKeys.SET_NAME_FIELD:
      return { ...state, name: action.payload }
    case ProfileTypeKeys.SET_LASTNAME_FIELD:
      return { ...state, lastName: action.payload }
    case ProfileTypeKeys.SET_EMAIL_FIELD:
      return { ...state, email: action.payload }
    case ProfileTypeKeys.SET_DNI_FIELD:
      return { ...state, dni: action.payload }
    case ProfileTypeKeys.SET_TELEPHONE_FIELD:
      return { ...state, telephone: action.payload }
    default:
      return state
  }
}

export default profile
