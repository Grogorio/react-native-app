import * as React from 'react'
import { Bod } from './bod'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../tests'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'

jest.mock('@aws-amplify/api/lib')

describe('SignInEmailInput Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <Bod />
      </Provider>
    )
    render = wrapper.dive()
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
