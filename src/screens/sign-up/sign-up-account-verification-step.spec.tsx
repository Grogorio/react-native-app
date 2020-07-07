import * as React from 'react'
import SignUpAccountVerificationStep from './sign-up-account-verification-step'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../../tests'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'
import { initialValidatedInputField, IAWSError } from '../../models'

jest.mock('../../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

const props = {
  verificationCode: initialValidatedInputField,
  email: initialValidatedInputField,
  verificationError: null as IAWSError,
  isAccountVerified: false,
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('SignUpAccountVerificationStep Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignUpAccountVerificationStep {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
