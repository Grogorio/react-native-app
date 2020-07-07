import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { BusStopList } from './bus-stop-list'
import { BusStop } from './bus-stop'
import { getBusLine } from '../../tests/mocks'
import { IBusLine, BusLineDirection } from '../../models'

jest.mock('@aws-amplify/api/lib')
jest.mock('../../services/literals-service')

describe('BusStopList Component', () => {
  let wrapper: ShallowWrapper
  let busLine: IBusLine
  let onPress: any

  beforeEach(() => {
    busLine = getBusLine()
    onPress = jest.fn()
    wrapper = shallow(<BusStopList line={busLine} onStopSelected={onPress} />)
  })

  it('renders without crashing', () => {
    const el = wrapper.find('ScrollView')
    expect(wrapper).toBeTruthy()
    expect(el.length).toBe(1)
  })

  it('should not show the scrolloview if no line selected', () => {
    wrapper.setProps({ line: null })
    const el = wrapper.find('ScrollView')
    expect(el.length).toBe(0)
  })

  it('should render some busStops', () => {
    const el = wrapper.find('BusStop')
    expect(el.length).toBeGreaterThan(0)
  })

  it('should execute onPress when a busStop is selected', () => {
    const el = wrapper.dive().find('BusStop')
    const stop = el.at(0).dive()
    stop.simulate('press')
    expect(onPress).toHaveBeenCalledWith(busLine.forthStops[0])
  })

  it('should not execute onPress if not available', () => {
    wrapper.setProps({ onStopSelected: null })
    const el = wrapper.dive().find('BusStop')
    const stop = el.at(0).dive()
    stop.simulate('press')
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders the backStops if the line directions is back', () => {
    busLine.direction = BusLineDirection.back
    wrapper.setProps({ line: busLine })
    const el = wrapper.dive().find('BusStop')
    const stop = el.at(0).dive()
    stop.simulate('press')
    expect(onPress).toHaveBeenCalledWith(busLine.backStops[0])
  })
})
