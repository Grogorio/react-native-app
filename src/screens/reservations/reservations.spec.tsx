import React from 'react'
import Reservations from './reservations'
import { Provider } from 'react-redux'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'
import { mockStore, storeMock, getUser } from '../../tests'

jest.mock('../../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')

const props = {
  user: getUser(),
  navigation: null as NavigationScreenProp<NavigationRoute>
}

describe('Reservations Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <Reservations {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
