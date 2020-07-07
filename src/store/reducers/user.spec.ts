import reducer from './user'
import { storeMock, getUser } from '../../tests'
import { SetUserAction, ResetSessionAction } from '../actions'

describe('User reducer', () => {
  it('should set a new user when SetUserAction is called', () => {
    const user = getUser()
    const nextState = reducer(storeMock.user, new SetUserAction(user))
    expect(nextState).toEqual(user)
  })

  it('should set null when ResetSessionAction is called', () => {
    const nextState = reducer(storeMock.user, new ResetSessionAction())
    expect(nextState).toBeNull()
  })

  it('should return the same state in case the action type is unknown', () => {
    const action: any = { type: 'fake-action' }
    const nextState = reducer(storeMock.user, action)
    expect(nextState).toEqual(storeMock.user)
  })
})
