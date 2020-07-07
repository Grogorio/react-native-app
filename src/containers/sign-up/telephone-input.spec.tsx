import * as React from 'react'
import SignUpTelephoneInput from './telephone-input'
import { Provider } from 'react-redux'
import { mockStore, storeMock } from '../../tests'
import { shallow, ShallowWrapper } from 'enzyme'
import { MockStore } from 'redux-mock-store'

// jest.mock('aws-amplify')
jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

const props = {
  field: {
    isValid: false,
    value: null as string
  },
  placeholder: 'placeholder test'
}

describe('SignUpTelephoneInput Component', () => {
  let wrapper: ShallowWrapper
  let render: ShallowWrapper
  let store: MockStore<any>

  beforeEach(() => {
    store = mockStore(storeMock)
    wrapper = shallow(
      <Provider store={store}>
        <SignUpTelephoneInput {...props} />
      </Provider>
    )
    render = wrapper.dive({ context: { store } })
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
