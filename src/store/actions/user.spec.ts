import { UserTypeKeys, SetUserAction } from './user'
import { getUser } from '../../tests'

describe('User actions', () => {
  it('all User actions should have the USER prefix', () => {
    Object.getOwnPropertyNames(UserTypeKeys).forEach((x: any) => {
      expect(UserTypeKeys[x].startsWith('USER_')).toBeTruthy()
    })
  })

  it('should create the action SetUserAction', () => {
    const expectedAction = {
      type: UserTypeKeys.SET_USER,
      payload: getUser()
    }
    expect(new SetUserAction(getUser())).toEqual(expectedAction)
  })
})
