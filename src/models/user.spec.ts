import { getCognitoUserAttributes } from '../tests'
import { cognitoUserAttributesToBodUser, IUser } from './user'

describe('user functions: cognitoUserAttributesToBodUser', () => {
  it('should convert an cognito user attributes to a user', () => {
    const attributes = getCognitoUserAttributes()
    const user = cognitoUserAttributesToBodUser(attributes)

    const expectedUser: IUser = {
      name: 'Anthony',
      email: 'perkins@i.am',
      telephone: '123456789',
      lastName: 'Perkins',
      dni: '36000000P',
      locale: 'ca_ES'
    }
    expect(user).toEqual(expectedUser)
  })
})
