import { IReservation } from './reservation'

export enum BusLineDirection {
  back,
  forward
}

export interface ILatLng {
  latitude: number
  longitude: number
}

export interface IDrawLatLng {
  isDisabled: boolean
  line: ILatLng[]
}

export interface IRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export interface IBusStop {
  code: number
  location: ILatLng
  name: string
  isSelected?: boolean
  isDisabled?: boolean
  isOrigin?: boolean
  isDestination?: boolean
}

export interface IBusLine {
  id: number
  name: string
  forthRoute: ILatLng[]
  backRoute: ILatLng[]
  forthStops: IBusStop[]
  backStops: IBusStop[]
  direction: BusLineDirection
  forthRegion: IRegion
  backRegion: IRegion
  description: string
  town: string
  drawStops?: IBusStop[]
  pathStops?: IBusStop[]
  drawRoute?: IDrawLatLng[]
}

export interface IBusStopSelectionOptions {
  line: IBusLine
  areStopsSelected?: boolean
  onStopSelected?: (stop: IBusStop) => void
}

export interface IBusLineMap extends IBusStopSelectionOptions {
  pickedOriginBusStop?: IBusStop
  pickedDestinationBusStop?: IBusStop
  hideCallouts?: boolean
  disableCallouts?: boolean
  hideNoUsedStops?: boolean
  showUserPosition?: boolean
  disableZoom?: boolean
  disableMovement?: boolean
}

export function getStops(line: IBusLine): IBusStop[] {
  if (!line) return []
  return line.direction === BusLineDirection.forward ? line.forthStops : line.backStops
}

export function getLastStop(line: IBusLine): IBusStop {
  const stops = getStops(line)
  if (!stops || !stops.length) return null
  return stops[stops.length - 1]
}

export function getTowards(towards: string, line: IBusLine): string {
  const lastStop = getLastStop(line)
  return `${towards} ${lastStop ? lastStop.name : ''}`
}

export function getRoute(line: IBusLine): ILatLng[] {
  if (!line) return []
  return line.direction === BusLineDirection.forward ? line.forthRoute : line.backRoute
}

export function isLatLngEqual(a: ILatLng, b: ILatLng): boolean {
  return a.latitude === b.latitude && a.longitude === b.longitude
}

export function buildDrawRoute(line: IBusLine): IDrawLatLng[] {
  const path = getRoute(line)
  const selectedStops = line.drawStops.filter(x => x.isSelected)
  if (!selectedStops.length) return [{ isDisabled: false, line: path }]
  if (selectedStops.length === 1) {
    const [stop] = selectedStops
    const lastPath = [...path]
    const firstPath = [...lastPath.splice(0, lastPath.findIndex(x => isLatLngEqual(stop.location, x))), lastPath[0]]
    return [{ isDisabled: stop.isOrigin, line: firstPath }, { isDisabled: stop.isDestination, line: lastPath }]
  } else {
    const [stop1, stop2] = selectedStops
    const enabled = [...path]
    const disabled1 = [...enabled.splice(0, enabled.findIndex(x => isLatLngEqual(stop1.location, x))), enabled[0]]
    let disabled2 = enabled.splice(enabled.findIndex(x => isLatLngEqual(stop2.location, x)) + 1)
    disabled2 = [enabled[enabled.length - 1], ...disabled2]
    return [
      { isDisabled: true, line: disabled1 },
      { isDisabled: false, line: enabled },
      { isDisabled: true, line: disabled2 }
    ]
  }
}

export function getPathStops(line: IBusLine): IBusStop[] {
  let isOriginWasted: boolean
  let isDestinationWasted: boolean
  const pathStops: IBusStop[] = []
  line.drawStops.forEach(x => {
    if ((!isOriginWasted || isDestinationWasted) && !x.isSelected) {
      x.isDisabled = true
    } else {
      x.isDisabled = false
      pathStops.push(x)
    }
    if (x.isOrigin) isOriginWasted = true
    if (x.isDestination) isDestinationWasted = true
  })
  return pathStops
}

export function setReservation(res: IReservation): IReservation {
  const busLine: IBusLine = {
    ...res.busLine,
    direction: res.direction
  }
  busLine.drawStops = getStops(busLine)

  const stops = busLine.drawStops
  const origin = stops.find(x => x.code === res.originStopCode)
  const destination = stops.find(x => x.code === res.destinationStopCode)
  origin.isOrigin = true
  origin.isSelected = true
  destination.isDestination = true
  destination.isSelected = true
  busLine.drawRoute = buildDrawRoute(busLine)
  busLine.pathStops = getPathStops(busLine)
  return {
    ...res,
    busLine,
    period: res.period ? res.period : []
  }
}

export function setReservations(res: IReservation[], flip?: boolean): IReservation[] {
  const reservations = res.map(setReservation)
  return reservations.sort((a, b) => {
    const aEpoch = new Date(a.schedule.expedition).valueOf()
    const bEpoch = new Date(b.schedule.expedition).valueOf()
    if (flip) return bEpoch - aEpoch
    return aEpoch - bEpoch
  })
}
