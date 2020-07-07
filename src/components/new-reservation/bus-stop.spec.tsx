import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { BusStop } from './bus-stop'
import { getBusLine } from '../../tests/mocks'
import { IBusStop } from '../../models'
import { colors } from '../../styles'

jest.mock('../../services/literals-service')

describe('BusStop Component', () => {
  let wrapper: ShallowWrapper
  let busStop: IBusStop
  let onPress: any

  beforeEach(() => {
    busStop = getBusLine().forthStops[0]
    onPress = jest.fn()
    wrapper = shallow(<BusStop stop={busStop} onPress={onPress} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should execute onPress', () => {
    const el = wrapper.find('TouchableHighlight')
    el.simulate('press')
    expect(onPress).toHaveBeenCalledWith(busStop)
  })

  it('should use stopText style if busStop is enabled', () => {
    const color = wrapper.find('Text').prop('style').color
    expect(color).toEqual(colors.black)
  })

  it('should use disabledStopText style if busStop is disabled', () => {
    const newBusStop = { ...busStop }
    newBusStop.isDisabled = true
    wrapper.setProps({ stop: newBusStop })
    const color = wrapper.find('Text').prop('style').color
    expect(color).not.toEqual('black')
  })

  xit('should use trackLine style if busStop is enabled', () => {
    const color = wrapper
      .find('View > View > View')
      .first()
      .prop('style').backgroundColor
    expect(color).toEqual('#F0BA2E')
  })

  xit('should use disabledTrackLine style if busStop is disabled', () => {
    const newBusStop = { ...busStop }
    newBusStop.isDisabled = true
    wrapper.setProps({ stop: newBusStop })
    const color = wrapper
      .find('View > View > View')
      .first()
      .prop('style').backgroundColor
    expect(color).not.toEqual('#F0BA2E')
  })

  xit('should use trackMarker style if busStop is enabled', () => {
    const style = wrapper
      .find('View > View > View')
      .at(1)
      .prop('style')
    expect(style.backgroundColor).toEqual('#F0BA2E')
    expect(style.width).toEqual(12)
  })

  xit('should use disabledTrackMarker style if busStop is disabled', () => {
    const newBusStop = { ...busStop }
    newBusStop.isDisabled = true
    wrapper.setProps({ stop: newBusStop })
    const style = wrapper
      .find('View > View > View')
      .at(1)
      .prop('style')
    expect(style.backgroundColor).toEqual('#989898')
    expect(style.width).toEqual(12)
  })

  xit('should use pickedTrackMarker style if busStop is selected', () => {
    const newBusStop = { ...busStop }
    newBusStop.isSelected = true
    wrapper.setProps({ stop: newBusStop })
    const style = wrapper
      .find('View > View > View')
      .at(1)
      .prop('style')
    expect(style.backgroundColor).toEqual('#F0BA2E')
    expect(style.width).toEqual(18)
  })
})
