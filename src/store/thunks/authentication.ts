import { authenticationService, userService, storageService } from '../../services'
import { IAuthenticationDetailsData, IActionThunk, IUser, IAWSError, ICognitoUserSession } from '../../models'
import {
  SetSessionChecksAction,
  ResetSessionAction,
  SetUserAction,
  SetSignUpIsSignedUpSuccesfullyAction,
  SetSignUpErrorAction,
  SetSignUpIsAccountVerifiedAction,
  SetSignUpVerificationErrorAction,
  ResetSignUpFieldsAction,
  SetIsCodeSentAction,
  SetIsPasswordRecoveredAction,
  SetRecoverPasswordErrorAction,
  SetSignUpNewConfirmationCodeErrorAction,
  SetSignUpIsNewConfirmationCodeSentFieldAction,
  SetNewPasswordRequiredCognitoUserAction,
  ResetPenaltiesAction
} from '../actions'
import { SetSignInErrorAction, SetSignInIsNewPasswordRequiredAction } from '../actions/sign-in'

export function signInActionThunk(payload: IAuthenticationDetailsData): IActionThunk {
  return async dispatch => {
    // TODO: improve
    try {
      const cognitoUser = await authenticationService.signIn(payload)
      if (cognitoUser && cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch(new SetSignInIsNewPasswordRequiredAction(true))
        dispatch(new SetNewPasswordRequiredCognitoUserAction(cognitoUser))
      } else {
        const user = await authenticationService.getUserAttributes()
        const deviceToken = await authenticationService.getDeviceToken()
        await userService.sendDeviceToken(deviceToken)
        await storageService.cleanAutoSignInValues()
        dispatch(new SetUserAction(user))
      }
    } catch (error) {
      try {
        const user = await authenticationService.getUserAttributes()
        dispatch(new SetUserAction(user))
        throw new Error(error)
      } catch (_error) {
        dispatch(new SetSignInErrorAction(error))
      }
    }
  }
}

export function signUpActionThunk(payload: IUser): IActionThunk {
  return dispatch => {
    authenticationService
      .signUp(payload)
      .then(() => {
        dispatch(new SetSignUpIsSignedUpSuccesfullyAction(true))
      })
      .catch((error: IAWSError) => {
        dispatch(new SetSignUpErrorAction(error))
      })
  }
}

export function signOutActionThunk(): IActionThunk {
  return async dispatch => {
    await userService.sendDeviceToken('')
    await authenticationService.signOut()
    dispatch(new ResetPenaltiesAction())
    dispatch(new ResetSessionAction())
  }
}

export function requestRecoverPasswordCodeActionThunk(email: string): IActionThunk {
  return async dispatch => {
    authenticationService
      .requestRecoverPasswordCodeActionThunk(email)
      .then(() => dispatch(new SetIsCodeSentAction(true)))
      .catch((error: IAWSError) => dispatch(new SetRecoverPasswordErrorAction(error)))
  }
}

export function requestRecoverPasswordChangeActionThunk(email: string, code: string, password: string): IActionThunk {
  return async dispatch => {
    authenticationService
      .requestRecoverPasswordChangeActionThunk(email, code, password)
      .then(() => dispatch(new SetIsPasswordRecoveredAction(true)))
      .catch((error: IAWSError) => dispatch(new SetRecoverPasswordErrorAction(error)))
  }
}

export function confirmSignUpActionThunk(dni: string, code: string): IActionThunk {
  return dispatch => {
    authenticationService
      .confirmSignUp(dni, code)
      .then(() => {
        dispatch(new ResetSignUpFieldsAction())
        dispatch(new SetSignUpIsAccountVerifiedAction(true))
      })
      .catch((error: IAWSError) => dispatch(new SetSignUpVerificationErrorAction(error)))
  }
}

export function resendSignUpConfirmationCodeActionThunk(email: string): IActionThunk {
  return async dispatch => {
    try {
      await authenticationService.resendSignUpConfirmationCode(email)
      dispatch(new SetSignUpIsNewConfirmationCodeSentFieldAction(true))
    } catch (error) {
      dispatch(new SetSignUpNewConfirmationCodeErrorAction(error))
    }
  }
}

export function checkSessionActionThunk(): IActionThunk {
  return async dispatch => {
    let tokens: ICognitoUserSession
    let user: IUser

    try {
      tokens = await authenticationService.getTokens()
    } catch (error) {
      tokens = null
    }

    if (tokens) {
      try {
        user = await authenticationService.getUserAttributes()
        dispatch(new SetUserAction(user))
      } catch (error) {
        user = null
      }
    }

    dispatch(
      new SetSessionChecksAction({
        isSessionChecked: true,
        isUserSignedIn: !!tokens && !!user
      })
    )
  }
}
