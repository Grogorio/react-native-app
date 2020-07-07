import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { StepIndicator } from './step-indicator'

jest.mock('../../services/literals-service')

describe('StepIndicator Component', () => {
  const props = {
    amount: 3,
    active: 1
  }
  let wrapper: ShallowWrapper<any, any>
  let render: ShallowWrapper<any, any>

  beforeEach(() => {
    wrapper = shallow(<StepIndicator {...props} />)
    render = wrapper.dive()
  })

  it('renders without crashing', () => {
    expect(render).toBeTruthy()
  })
})
