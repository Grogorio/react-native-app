import * as React from 'react'
import SignUpEmailInput from './email-input'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../../tests'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'

jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

const props = {
  field: {
    isValid: false,
    value: null as string
  },
  placeholder: 'placeholder test',
  check: false
}

describe('SignUpEmailInput Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignUpEmailInput {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
