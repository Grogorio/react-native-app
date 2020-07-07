import { CognitoUserAttribute } from 'amazon-cognito-identity-js'

export type ILocale = 'ca_ES' | 'es_ES'

export interface IUser {
  email: string
  name: string
  lastName: string
  dni: string
  telephone?: string
  locale: ILocale
  password?: string
}

export interface IUnsubscriptionReason {
  key: string
  label: string
}

export function cognitoUserAttributesToBodUser(attributes: CognitoUserAttribute[]): IUser {
  return {
    email: getUserAttribute(attributes, 'email'),
    name: getUserAttribute(attributes, 'name'),
    telephone: getUserAttribute(attributes, 'phone_number'),
    lastName: getUserAttribute(attributes, 'family_name') || getUserAttribute(attributes, 'custom:last_name'),
    dni: getUserAttribute(attributes, 'custom:dni_nie'),
    locale: getUserAttribute(attributes, 'locale') as ILocale
  }
}

export function getUserAttribute(attributes: CognitoUserAttribute[], key: string) {
  const attribute = attributes.find(a => a.getName() === key)
  return attribute ? attribute.getValue() : null
}
