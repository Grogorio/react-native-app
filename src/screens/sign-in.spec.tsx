import * as React from 'react'
import SignIn from './sign-in'
import { Provider } from 'react-redux'
import { mockStore, storeMock, getUser } from '../tests'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'
import { initialValidatedInputField, IAWSError } from '../models'

jest.mock('../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')

const props = {
  user: getUser(),
  email: initialValidatedInputField,
  password: initialValidatedInputField,
  signInError: null as IAWSError,
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('SignIn Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignIn {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
