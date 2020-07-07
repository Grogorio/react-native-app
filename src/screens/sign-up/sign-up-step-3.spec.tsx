import * as React from 'react'
import SignUpStep3 from './sign-up-step-3'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../../tests'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'
import { initialValidatedInputField } from '../../models'

jest.mock('../../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

const props = {
  municipality: initialValidatedInputField,
  telephone: initialValidatedInputField,
  signUp: storeMock.signUp,
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('SignUpStep3 Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignUpStep3 {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
