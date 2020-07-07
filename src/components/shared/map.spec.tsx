import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Map } from './map'
import { getBusLine } from '../../tests/mocks'
import { IBusLine, getStops, buildDrawRoute } from '../../models'
import { colors } from '../../styles'

jest.mock('../../services/literals-service')

describe('Map Component', () => {
  let wrapper: ShallowWrapper
  let busLine: IBusLine
  let onPress: any

  beforeEach(() => {
    busLine = getBusLine()
    busLine.drawStops = getStops(busLine)
    busLine.drawRoute = buildDrawRoute(busLine)
    onPress = jest.fn()
    wrapper = shallow(<Map line={busLine} onStopSelected={onPress} />)
  })

  it('renders without crashing', () => {
    const map = wrapper.dive().find('MapView')
    expect(wrapper).toBeTruthy()
    expect(map.length).toBe(1)
  })

  it('should use google as map provider', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.provider).toEqual('google')
  })

  it('should not show the map if no line selected', () => {
    wrapper.setProps({ line: null })
    const el = wrapper.find('View')
    expect(el.length).toBe(0)
  })

  it('should set the zoomEnabled property to false when disableZoom is true', () => {
    wrapper.setProps({ disableZoom: true })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.zoomEnabled).toBeFalsy()
  })

  it('should set the zoomEnabled property to true when disableZoom is false', () => {
    wrapper.setProps({ disableZoom: false })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.zoomEnabled).toBeTruthy()
  })

  it('should set some properties to false when disableMovement is true', () => {
    wrapper.setProps({ disableMovement: true })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.pitchEnabled).toBeFalsy()
    expect(map.props.scrollEnabled).toBeFalsy()
    expect(map.props.rotateEnabled).toBeFalsy()
    expect(map.props.moveOnMarkerPress).toBeFalsy()
  })

  it('should set some properties to true when disableMovement is false', () => {
    wrapper.setProps({ disableMovement: false })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.pitchEnabled).toBeTruthy()
    expect(map.props.scrollEnabled).toBeTruthy()
    expect(map.props.rotateEnabled).toBeTruthy()
    expect(map.props.moveOnMarkerPress).toBeTruthy()
  })

  it('should set the showsUserLocation property to true when showUserPosition is true', () => {
    wrapper.setProps({ showUserPosition: true })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.showsUserLocation).toBeTruthy()
  })

  it('should set the showsUserLocation property to false when showUserPosition is false', () => {
    wrapper.setProps({ showUserPosition: false })
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.showsUserLocation).toBeFalsy()
  })

  it('should set initialRegion to line region', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.initialRegion).toEqual(busLine.forthRegion)
  })

  it('should set cache to true', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.cacheEnabled).toBeTruthy()
  })

  it('should set initial loading animation to true', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.loadingEnabled).toBeTruthy()
  })

  it('should disable the scale button', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.showsScale).toBeFalsy()
  })

  it('should disable the "my location" button', () => {
    const map = wrapper
      .dive()
      .find('MapView')
      .getElement()
    expect(map.props.showsMyLocationButton).toBeFalsy()
  })

  describe('Polylines:', () => {
    it('should render one polyline', () => {
      const el = wrapper.dive().find('MapPolyline')
      expect(el.length).toEqual(1)
    })

    it('should use drawRoute.line array to set polylines coordinates', () => {
      const el = wrapper.dive().find('MapPolyline')
      expect(el.getElement().props.coordinates).toEqual(busLine.drawRoute[0].line)
    })

    it('should use yellow color to draw the initial polyline', () => {
      const el = wrapper.dive().find('MapPolyline')
      expect(el.getElement().props.strokeColor).toEqual(colors.yellow)
    })

    it('should use greyDark color to draw the polyline if it is disabled', () => {
      busLine.drawRoute[0].isDisabled = true
      wrapper.setProps({ line: busLine })
      const el = wrapper.dive().find('MapPolyline')
      expect(el.getElement().props.strokeColor).toEqual(colors.greyDark)
    })

    it('should use 5 strokeWidth', () => {
      const el = wrapper.dive().find('MapPolyline')
      expect(el.getElement().props.strokeWidth).toEqual(5)
    })
  })

  xdescribe('Markers:', () => {
    it('should render 8 markers', () => {
      const el = wrapper.dive().find('MapMarker')
      expect(el.length).toEqual(8)
    })

    it('should set coordinate to equal location', () => {
      const el = wrapper.dive().find('MapMarker')
      expect(el.at(0).getElement().props.coordinate).toEqual(busLine.drawStops[0].location)
    })

    it('should set the key to equal the name', () => {
      const el = wrapper.dive().find('MapMarker')
      expect(el.at(0).getElement().key).toEqual(busLine.drawStops[0].name)
    })

    it('should set the anchor y to 0.5 if it is not a Destination stop', () => {
      const el = wrapper.dive().find('MapMarker')
      expect(el.at(0).getElement().props.anchor.y).toEqual(0.5)
    })

    it('should set the anchor y to 1 if it is a Destination stop', () => {
      busLine.drawStops[3].isDestination = true
      wrapper.setProps({ line: busLine })
      const el = wrapper.dive().find('MapMarker')
      expect(el.at(3).getElement().props.anchor.y).toEqual(1)
    })

    it('should show all the markers if hideNoUsedStops is set to false', () => {
      busLine.drawStops[0].isDestination = true
      busLine.drawStops[0].isSelected = true
      busLine.drawStops[3].isDestination = true
      busLine.drawStops[3].isSelected = true
      wrapper.setProps({ line: busLine, hideNoUsedStops: false })
      const el = wrapper.dive().find('MapMarker')
      expect(el.length).toEqual(8)
    })

    it('should show only the selected markers if hideNoUsedStops is set to true', () => {
      busLine.drawStops[0].isDestination = true
      busLine.drawStops[0].isSelected = true
      busLine.drawStops[3].isDestination = true
      busLine.drawStops[3].isSelected = true
      wrapper.setProps({ line: busLine, hideNoUsedStops: true })
      const el = wrapper.dive().find('MapMarker')
      expect(el.length).toEqual(2)
    })

    describe('Callouts:', () => {
      it('should draw a callout for every marker', () => {
        const el = wrapper.dive().find('MapCallout')
        expect(el.length).toEqual(8)
      })

      it('should have tooltip set to true', () => {
        const el = wrapper.dive().find('MapCallout')
        for (let i = 0; i < 8; i++) {
          const c = el.at(i).getElement()
          expect(c.props.tooltip).toEqual(true)
        }
      })

      it('should call the onStopSelected callback when a callout is pressed', () => {
        const el = wrapper
          .dive()
          .find('MapCallout')
          .at(0)
          .dive()
        el.simulate('press')
        expect(onPress).toHaveBeenCalledWith(busLine.forthStops[0])
      })
    })
  })
})
