import { getStops, BusLineDirection, IBusLine, getRoute, getLastStop, isLatLngEqual, buildDrawRoute } from './bus-line'
import { getBusLine } from '../tests/mocks'

describe('busline functions', () => {
  let busLine: IBusLine

  beforeEach(() => {
    busLine = getBusLine()
  })

  describe('getStops:', () => {
    it('should return the stops if direction is forward', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.forward }
      const stops = getStops(line)
      expect(stops).toEqual(line.forthStops)
    })

    it('should return the backStops if direction is back', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.back }
      const stops = getStops(line)
      expect(stops).toEqual(line.backStops)
    })

    it('should return and empty array if line is null', () => {
      const stops = getStops(null)
      expect(stops).toEqual([])
    })
  })

  describe('getLastStop:', () => {
    it('should return the last stop if direction is forward', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.forward }
      const stop = getLastStop(line)
      expect(stop).toEqual(line.forthStops[line.forthStops.length - 1])
    })

    it('should return the last stop if direction is back', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.back }
      const stop = getLastStop(line)
      expect(stop).toEqual(line.backStops[line.backStops.length - 1])
    })

    it('should return null if line is null', () => {
      const stops = getLastStop(null)
      expect(stops).toBeNull()
    })
  })

  describe('getRoute:', () => {
    it('should return the route if direction is forward', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.forward }
      const route = getRoute(line)
      expect(route).toEqual(line.forthRoute)
    })

    it('should return the backRoute if direction is back', () => {
      const line: IBusLine = { ...busLine, direction: BusLineDirection.back }
      const route = getRoute(line)
      expect(route).toEqual(line.backRoute)
    })

    it('should return and empty array if line is null', () => {
      const route = getRoute(null)
      expect(route).toEqual([])
    })
  })

  describe('isLatLngEqual:', () => {
    it('should return true if lat and long are equal', () => {
      const res = isLatLngEqual({ latitude: 1, longitude: 2 }, { latitude: 1, longitude: 2 })
      expect(res).toBeTruthy()
    })

    it('should return false if lat is not equal', () => {
      const res = isLatLngEqual({ latitude: 2, longitude: 2 }, { latitude: 1, longitude: 2 })
      expect(res).toBeFalsy()
    })

    it('should return false if long is not equal', () => {
      const res = isLatLngEqual({ latitude: 1, longitude: 1 }, { latitude: 1, longitude: 2 })
      expect(res).toBeFalsy()
    })

    it('should return false if lat and long art not equal', () => {
      const res = isLatLngEqual({ latitude: 1, longitude: 1 }, { latitude: 2, longitude: 2 })
      expect(res).toBeFalsy()
    })
  })

  describe('buildDrawRoute:', () => {
    let line: IBusLine
    beforeEach(() => {
      line = { ...busLine, direction: BusLineDirection.forward }
      line.drawStops = getStops(line)
    })

    it('should return only one line if no selected busStops', () => {
      const res = buildDrawRoute(line)
      expect(res.length).toEqual(1)
      expect(res[0]).toEqual({ isDisabled: false, line: getRoute(line) })
    })

    it('should return 2 lines if one busStop is selected', () => {
      line.drawStops[3].isSelected = true
      const res = buildDrawRoute(line)
      expect(res.length).toEqual(2)
      expect(res[0].line.length).toEqual(4)
      expect(res[1].line.length).toEqual(7)
      expect(res[0].line[3]).toEqual(res[1].line[0])
    })

    it('should return 3 lines if origin and destination are selected', () => {
      line.drawStops[3].isSelected = true
      line.drawStops[6].isSelected = true
      const res = buildDrawRoute(line)
      expect(res.length).toEqual(3)
      expect(res[0].line.length).toEqual(4)
      expect(res[1].line.length).toEqual(6)
      expect(res[2].line.length).toEqual(2)
      expect(res[0].line[3]).toEqual(res[1].line[0])
      expect(res[1].line[5]).toEqual(res[2].line[0])
    })
  })
})
