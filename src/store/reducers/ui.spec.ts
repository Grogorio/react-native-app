import reducer, { initialUIState } from './ui'
import { storeMock } from '../../tests'
import {
  ResetSessionAction,
  SetIsSessionCheckedAction,
  SetIsUserSignedInAction,
  SetSessionChecksAction
} from '../actions/ui'

jest.mock('@aws-amplify/api/lib')

describe('UI reducer', () => {
  it('should handle ResetSessionAction', () => {
    const nextState = reducer(storeMock.ui, new ResetSessionAction())
    expect(nextState).toEqual(initialUIState)
  })

  it('should handle SetIsSessionCheckedAction', () => {
    const nextState = reducer(storeMock.ui, new SetIsSessionCheckedAction(true))
    expect(nextState).toEqual({
      ...storeMock.ui,
      isSessionChecked: true
    })
  })

  it('should handle SetIsUserSignedInAction', () => {
    const nextState = reducer(storeMock.ui, new SetIsUserSignedInAction(true))
    expect(nextState).toEqual({
      ...storeMock.ui,
      isUserSignedIn: true
    })
  })

  it('should handle SetSessionChecksAction', () => {
    const nextState = reducer(
      storeMock.ui,
      new SetSessionChecksAction({
        isSessionChecked: true,
        isUserSignedIn: true
      })
    )
    expect(nextState).toEqual({
      ...storeMock.ui,
      isSessionChecked: true,
      isUserSignedIn: true
    })
  })

  it('should return the same state in case the action type is unknown', () => {
    const action: any = { type: 'fake-action' }
    const nextState = reducer(storeMock.ui, action)
    expect(nextState).toEqual(storeMock.ui)
  })
})
