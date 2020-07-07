import { UserActions, UserTypeKeys, UITypeKeys, ResetSessionAction } from '../actions'
import { IUserState } from '../states'

const initialState: IUserState = null

const user = (state: IUserState = initialState, action: UserActions | ResetSessionAction): IUserState => {
  switch (action.type) {
    case UserTypeKeys.SET_USER:
      return action.payload
    case UITypeKeys.RESET_SESSION:
      return null
    default:
      return state
  }
}

export default user
