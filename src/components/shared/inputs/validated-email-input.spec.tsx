import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ValidatedEmailInput } from './validated-email-input'
import { IInputProps } from './index'

jest.mock('@aws-amplify/api/lib')
jest.mock('../../../services/literals-service')

const props: IInputProps = {
  field: {
    isValid: false,
    value: null
  },
  placeholder: 'placeholder test'
}

describe('ValidatedEmailInput Component', () => {
  let wrapper: ShallowWrapper<IInputProps>
  let render: ShallowWrapper<IInputProps>

  beforeEach(() => {
    wrapper = shallow(<ValidatedEmailInput {...props} />)
    render = wrapper.dive()
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })

  it('should have a render function', () => {
    expect(render.instance().render).toBeDefined()
  })
})
