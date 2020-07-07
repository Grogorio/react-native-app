import { CognitoUserSession, CognitoIdToken } from 'amazon-cognito-identity-js'

export interface IAuthenticationConfiguration {
  identityPoolId: string
  region: string
  userPoolId: string
  userPoolWebClientId: string
}

export interface IAuthenticationDetailsData {
  email: string
  password: string
}

export type IAWSChallengeName =
  | 'SMS_MFA'
  | 'SOFTWARE_TOKEN_MFA'
  | 'SELECT_MFA_TYPE'
  | 'MFA_SETUP'
  | 'PASSWORD_VERIFIER'
  | 'CUSTOM_CHALLENGE'
  | 'DEVICE_SRP_AUTH'
  | 'DEVICE_PASSWORD_VERIFIER'
  | 'ADMIN_NO_SRP_AUTH'
  | 'NEW_PASSWORD_REQUIRED'

export type IAWSCodeError =
  | 'UsernameExistsException'
  | 'InvalidParameterException'
  | 'LimitExceededException'
  | 'UserNotFoundException'
  | 'NotAuthorizedException'
  | 'CodeMismatchException'

export interface IAWSError {
  code: IAWSCodeError
  message: string
  name: string
}

export interface ISignUpData {
  username: string
  password: string
  attributes: IAWSUser
}

export interface IAWSUser {
  name: string
  email: string
  phone_number: string
  family_name: string
  'custom:dni_nie': string
  locale: string
  email_verified?: string
}

export interface ICognitoUserSession extends CognitoUserSession {
  accessToken: ICognitoAccessToken
  idToken: ICognitoIdToken
  refreshToken: {
    token: string
  }
}

export interface ICognitoAccessToken extends CognitoIdToken {
  jwtToken: string
  payload: IAccessToken
}

export interface IBaseToken {
  exp: number
  iat: number
  sub: string
  token_use: string
  event_id: boolean
  iss: string
}

export interface IAccessToken extends IBaseToken {
  client_id: boolean
  jti: string
  scope: string
  username: string
}

export interface ICognitoIdToken extends CognitoIdToken {
  jwtToken: string
  payload: IIdToken
}

export interface IIdToken extends IBaseToken {
  aud: string
  auth_time: string
  email: string
  email_verified: boolean
}
