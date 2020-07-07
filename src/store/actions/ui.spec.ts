import {
  UITypeKeys,
  ResetSessionAction,
  SetIsSessionCheckedAction,
  SetIsUserSignedInAction,
  SetSessionChecksAction
} from './ui'

describe('UI actions', () => {
  it('all UI actions should have the UI prefix', () => {
    Object.getOwnPropertyNames(UITypeKeys).forEach((x: any) => {
      expect(UITypeKeys[x].startsWith('UI_')).toBeTruthy()
    })
  })

  it('should create the action ResetSessionAction', () => {
    const expectedAction = { type: UITypeKeys.RESET_SESSION }
    expect(new ResetSessionAction()).toEqual(expectedAction)
  })

  it('should create the action SetIsSessionCheckedAction', () => {
    const expectedAction = {
      type: UITypeKeys.SET_IS_SESSION_CHECKED,
      payload: true
    }
    expect(new SetIsSessionCheckedAction(true)).toEqual(expectedAction)
  })

  it('should create the action SetIsUserSignedInAction', () => {
    const expectedAction = {
      type: UITypeKeys.SET_IS_USER_SIGNED_IN,
      payload: true
    }
    expect(new SetIsUserSignedInAction(true)).toEqual(expectedAction)
  })

  it('should create the action SetSessionChecksAction', () => {
    const expectedAction = {
      type: UITypeKeys.SET_SESSION_CHECKS,
      payload: {
        isSessionChecked: true,
        isUserSignedIn: true
      }
    }
    expect(
      new SetSessionChecksAction({
        isSessionChecked: true,
        isUserSignedIn: true
      })
    ).toEqual(expectedAction)
  })
})
