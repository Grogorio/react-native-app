import * as React from 'react'
import { Text } from 'react-native'
import { shallow, ShallowWrapper } from 'enzyme'
import { Provider } from 'react-redux'
import { MockStore } from 'redux-mock-store'
import { NavigationHeader } from './navigation-header'
import { mockStore, storeMock } from '../../tests'

jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

describe('NavigationHeader Component', () => {
  const props = {
    isMenuVisible: false
  }
  let wrapper: ShallowWrapper<any, any>
  let render: ShallowWrapper<any, any>
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <NavigationHeader {...props}>
          <Text>testing</Text>
        </NavigationHeader>
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
