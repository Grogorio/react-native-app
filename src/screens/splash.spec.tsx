import * as React from 'react'
import Splash from './splash'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../tests'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'

jest.mock('../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')
jest.mock('../services/literals-service')

const props = {
  isSessionChecked: false,
  isUserSignedIn: false,
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('Splash Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <Splash {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
