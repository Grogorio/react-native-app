import Amplify, { Auth } from 'aws-amplify'
import FCM from 'react-native-fcm'
import { environment } from '../environments'
import {
  IAuthenticationDetailsData,
  IUser,
  ISignUpData,
  ICognitoUserSession,
  IAWSUser,
  cognitoUserAttributesToBodUser,
  IAWSChallengeName
} from '../models'

class AuthenticationService {
  constructor() {
    Amplify.configure(environment.aws)
  }

  public signIn(args: IAuthenticationDetailsData): Promise<{ challengeName?: IAWSChallengeName }> {
    return Auth.signIn(args.email.toLowerCase(), args.password)
  }

  public signUp(args: IUser): Promise<any> {
    const { name, lastName, email, dni, password, telephone } = args
    const signUpData: ISignUpData = {
      username: dni,
      password,
      attributes: {
        name,
        email: email.toLowerCase(),
        phone_number: telephone,
        family_name: lastName,
        'custom:dni_nie': dni,
        locale: 'ca_ES'
      }
    }
    return Auth.signUp(signUpData)
  }

  public resendSignUpConfirmationCode(dni: string) {
    return Auth.resendSignUp(dni)
  }

  public confirmSignUp(dni: string, code: string): Promise<any> {
    return Auth.confirmSignUp(dni, code)
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
  }

  public getTokens(): Promise<ICognitoUserSession> {
    return Auth.currentSession() as Promise<ICognitoUserSession>
  }

  public requestRecoverPasswordCodeActionThunk(email: string): Promise<any> {
    return Auth.forgotPassword(email)
  }

  public requestRecoverPasswordChangeActionThunk(email: string, code: string, password: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, password)
  }

  public async completeNewPassword(user: any, password: string): Promise<any> {
    const { email_verified, ...attributes } = user.challengeParam.userAttributes as IAWSUser
    return Auth.completeNewPassword(user, password, attributes)
  }

  public async getUserAttributes(): Promise<IUser> {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const attributes = await Auth.userAttributes(user)
      return cognitoUserAttributesToBodUser(attributes)
    } catch (error) {
      throw error
    }
  }

  public async changePassword(password: string, newPassword: string): Promise<any> {
    const user = await Auth.currentAuthenticatedUser()
    return Auth.changePassword(user, password, newPassword)
  }

  public async updateAttributes(attributes: IAWSUser): Promise<IUser> {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, attributes)
      return this.getUserAttributes()
    } catch (error) {
      throw error
    }
  }

  public async getDeviceToken(): Promise<string> {
    const deviceToken = await FCM.getFCMToken()
    return deviceToken
  }
}

export default new AuthenticationService()
