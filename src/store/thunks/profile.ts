import { IActionThunk, IAWSUser } from '../../models'
import { authenticationService, userService } from '../../services'
import { SetUserAction, SetChangePasswordErrorAction } from '../actions'

export function updateAttributesActionThunk(attributes: IAWSUser, isEmailModified?: boolean): IActionThunk {
  return async dispatch => {
    try {
      const updatedUser = await authenticationService.updateAttributes(attributes)
      dispatch(new SetUserAction(updatedUser))
      if (isEmailModified) await userService.verifyEmail()
    } catch (error) {
      throw error
    }
  }
}

export function changePasswordActionThunk(password: string, newPassword: string, callback: () => void): IActionThunk {
  return async dispatch => {
    try {
      await authenticationService.changePassword(password, newPassword)
      callback()
    } catch (error) {
      dispatch(new SetChangePasswordErrorAction(error))
    }
  }
}
