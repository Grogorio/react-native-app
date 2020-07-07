import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { AutocompleteInput, IState } from './autocomplete-input'
import { IInputProps } from '.'

jest.mock('@aws-amplify/api/lib')
jest.mock('../../../services/literals-service')

const initialState: IState = {
  isSearchValueValid: false,
  searchValue: null,
  isFocused: false
}

const props: IInputProps = {
  field: {
    isValid: false,
    value: null
  },
  placeholder: 'placeholder test'
}

describe('AutocompleteInput Component', () => {
  let spy: any
  let wrapper: ShallowWrapper<IInputProps, IState>
  let render: ShallowWrapper<IInputProps, IState>

  beforeEach(() => {
    wrapper = shallow(<AutocompleteInput {...props} />)
    spy = spyOn(wrapper.instance(), 'handleChange').and.callThrough()
    wrapper.instance().forceUpdate()
    wrapper.setState(initialState)
    render = wrapper.dive()
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })

  it('should have a render function', () => {
    expect(render.instance().render).toBeDefined()
  })
})
