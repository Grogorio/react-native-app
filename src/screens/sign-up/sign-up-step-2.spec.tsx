import * as React from 'react'
import SignUpStep1 from './sign-up-step-2'
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
  name: initialValidatedInputField,
  lastName: initialValidatedInputField,
  dni: initialValidatedInputField,
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('SignUpStep2 Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignUpStep1 {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
