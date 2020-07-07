import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ValidatedPasswordInput } from './validated-password-input'
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

describe('ValidatedPasswordInput Component', () => {
  let wrapper: ShallowWrapper<IInputProps>
  let render: ShallowWrapper<IInputProps>

  beforeEach(() => {
    wrapper = shallow(<ValidatedPasswordInput {...props} />)
    render = wrapper.dive()
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })

  it('should have a render function', () => {
    expect(render.instance().render).toBeDefined()
  })
})
