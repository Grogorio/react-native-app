import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { NewReservationBusLineStep } from './new-reservation-bus-line-step'
import { IBusLine } from '../../models'
import { getBusLine, storeProps } from '../../tests'
import { SetPickedBusLineAction, ResetNewReservationValuesAction } from '../../store/actions'
import { routes } from '../../navigation'

jest.mock('../../navigation/index.ts')
jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

xdescribe('NewReservationBusLineStep Screen', () => {
  let wrapper: ShallowWrapper
  let busLines: IBusLine[]

  beforeEach(() => {
    busLines = [getBusLine()]
    const props: any = {
      busLines: [],
      pickedBusLine: null,
      ...storeProps
    }
    wrapper = shallow(<NewReservationBusLineStep {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should call dispatch on load', () => {
    expect(storeProps.dispatch).toHaveBeenCalled()
  })

  it('should render a list of lines', () => {
    wrapper.setProps({ busLines })
    const el = wrapper.find('BusLine')
    expect(el.length).toBeGreaterThan(0)
  })

  it('should render an Activity Indicator if no lines are available', () => {
    wrapper.setProps({ busLines: [] })
    const elAct = wrapper.find('ActivityIndicator')
    const elBusLines = wrapper.find('BusLine')
    expect(elAct.length).toBeGreaterThan(0)
    expect(elBusLines.length).toEqual(0)
  })

  it('should dispatch a SetPickedBusLineAction when a busline is clicked', () => {
    wrapper.setProps({ busLines })
    const el = wrapper
      .dive()
      .find('BusLine')
      .at(0)
      .dive()
      .find('ReservationLine')

    el.simulate('press')
    const action = new SetPickedBusLineAction(busLines[0])
    expect(storeProps.dispatch).toHaveBeenCalledWith(action)
  })

  it('should dispatch a ResetNewReservationValuesAction when a busline is clicked', () => {
    wrapper.setProps({ busLines })
    const el = wrapper
      .dive()
      .find('View')
      .at(0)
    el.getElement().props.children[0].props.onBackPress()
    const action = new ResetNewReservationValuesAction()
    expect(storeProps.dispatch).toHaveBeenCalledWith(action)
  })

  it('should navigate to next step when a line is picked', () => {
    wrapper.setProps({ busLines })
    wrapper.setProps({ pickedBusLine: busLines[0] })
    expect(storeProps.navigation.navigate).toHaveBeenCalledWith(routes.newReservationBusStopsStep.routeName, undefined)
  })
})
