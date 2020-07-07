import { NewReservationActions, NewReservationTypeKeys } from '../actions'
import { INewReservationState } from '../states'
import { IBusStop, IBusLine, getStops, BusLineDirection, buildDrawRoute, IReservation, ISchedule } from '../../models'

type State = INewReservationState

export const initialNewReservationState: State = {
  busLines: [],
  pickedBusLine: null,
  pickedOriginBusStop: null,
  pickedDestinationBusStop: null,
  pickedDate: null,
  schedules: [],
  pickedSchedule: null,
  schedulesError: null,
  pickedPrmSeats: 0,
  pickedSeats: 0,
  capacity: 0,
  prmCapacity: 0
}

class PositionCalc {
  public origin: IBusStop
  public destination: IBusStop
  public stops: IBusStop[] = []
  public selectedIndexes: number[] = []
  public pathStops: IBusStop[] = []
  private removedStop: IBusStop

  constructor(stops: IBusStop[], stop: IBusStop) {
    stops.forEach((x, i) => {
      let curr = x
      if (curr.code === stop.code) {
        if (!stop.isSelected) this.removedStop = curr
        curr = stop
      }
      if (curr.isSelected) this.selectedIndexes.push(i)
      this.stops.push({ ...curr })
    })
    this.calculate()
  }

  private setPositionStatus(index: number, isOrigin: boolean): IBusStop {
    const stop = this.stops[index]
    if (isOrigin) {
      stop.isOrigin = true
    } else {
      stop.isDestination = true
    }
    stop.isSelected = true
    return stop
  }

  private calculate() {
    this.reset()
    if (this.selectedIndexes.length === 2) {
      const oIndex = this.selectedIndexes[0]
      const dIndex = this.selectedIndexes[1]
      this.origin = this.setPositionStatus(oIndex, true)
      this.destination = this.setPositionStatus(dIndex, false)
      this.stops.forEach((x, i) => {
        if (i < oIndex || i > dIndex) {
          x.isDisabled = true
        } else {
          x.isDisabled = false
          this.pathStops.push(x)
        }
      })
    } else if (this.selectedIndexes.length === 1) {
      const isOrigin = !this.removedStop || this.removedStop.isDestination
      const index = this.selectedIndexes[0]
      if (isOrigin) {
        this.origin = this.setPositionStatus(index, true)
        this.destination = null
        this.stops.forEach((x, i) => (x.isDisabled = i < index))
      } else {
        this.destination = this.setPositionStatus(index, false)
        this.origin = null
        this.stops.forEach((x, i) => (x.isDisabled = i > index))
      }
    } else {
      this.origin = null
      this.destination = null
      this.stops[this.stops.length - 1].isDisabled = true
    }
    this.removedStop = null
  }

  private reset() {
    this.stops.forEach(x => {
      x.isDisabled = false
      x.isOrigin = false
      x.isDestination = false
      x.isSelected = false
    })
    this.pathStops = []
  }
}

function updatePickedBusLineStatus(state: State, stop: IBusStop): State {
  if (stop.isDisabled || (state.pickedOriginBusStop && state.pickedDestinationBusStop && !stop.isSelected)) return state
  const newStop: IBusStop = { ...stop, isSelected: !stop.isSelected }
  const line = state.pickedBusLine
  const stops = getStops(line)
  const calc = new PositionCalc(stops, newStop)
  const pickedBusLine: IBusLine =
    line.direction === BusLineDirection.forward
      ? { ...state.pickedBusLine, forthStops: calc.stops }
      : { ...state.pickedBusLine, backStops: calc.stops }
  pickedBusLine.drawStops = calc.stops
  pickedBusLine.drawRoute = buildDrawRoute(pickedBusLine)
  pickedBusLine.pathStops = calc.pathStops
  return {
    ...state,
    pickedOriginBusStop: calc.origin,
    pickedDestinationBusStop: calc.destination,
    pickedBusLine,
    pickedDate: null,
    pickedSchedule: null,
    schedules: []
  }
}

function setPickedBusLine(state: State, line: IBusLine): State {
  if (!line) return { ...state, pickedBusLine: null, pickedOriginBusStop: null, pickedDestinationBusStop: null }
  const newStops = resetStops(line.forthStops, true)
  const newLine: IBusLine = {
    ...line,
    forthStops: newStops,
    direction: BusLineDirection.forward,
    drawStops: newStops,
    pathStops: []
  }
  newLine.drawRoute = buildDrawRoute(newLine)
  return {
    ...state,
    pickedBusLine: newLine,
    pickedOriginBusStop: null,
    pickedDestinationBusStop: null,
    pickedDate: null,
    pickedSchedule: null,
    schedules: []
  }
}

function togglePickedBusLineDirection(state: State): State {
  const pickedBusLine = { ...state.pickedBusLine }
  if (pickedBusLine.direction === BusLineDirection.forward) {
    pickedBusLine.direction = BusLineDirection.back
    pickedBusLine.forthStops = resetStops(pickedBusLine.forthStops)
    pickedBusLine.backStops = resetStops(pickedBusLine.backStops, true)
    pickedBusLine.drawStops = pickedBusLine.backStops
  } else {
    pickedBusLine.direction = BusLineDirection.forward
    pickedBusLine.forthStops = resetStops(pickedBusLine.forthStops, true)
    pickedBusLine.backStops = resetStops(pickedBusLine.backStops)
    pickedBusLine.drawStops = pickedBusLine.forthStops
  }
  pickedBusLine.pathStops = []
  pickedBusLine.drawRoute = buildDrawRoute(pickedBusLine)
  return { ...state, pickedBusLine, pickedOriginBusStop: null, pickedDestinationBusStop: null }
}

function resetStops(stops: IBusStop[], disableLast: boolean = false): IBusStop[] {
  const newStops = stops.map(x => resetStop(x))
  const lastIndex = newStops.length - 1
  const lastStop: IBusStop = { ...newStops[lastIndex] }
  if (disableLast) {
    lastStop.isDisabled = true
  }
  newStops[lastIndex] = lastStop
  return newStops
}

function resetStop(stop: IBusStop): IBusStop {
  return { ...stop, isDisabled: false, isSelected: false, isDestination: false, isOrigin: false }
}

function fieldsFromReservation(state: State, reservation: IReservation): State {
  const joinedStops = [...reservation.busLine.forthStops, ...reservation.busLine.backStops]
  return {
    ...state,
    pickedBusLine: reservation.busLine,
    pickedDate: {
      day: null,
      dateString: reservation.date,
      month: null,
      timestamp: new Date(reservation.date).valueOf(),
      year: null
    },
    pickedSchedule: reservation.schedule,
    pickedDestinationBusStop: joinedStops.find(s => s.code === reservation.destinationStopCode),
    pickedOriginBusStop: joinedStops.find(s => s.code === reservation.originStopCode),
    pickedPrmSeats: reservation.prmSeats,
    pickedSeats: reservation.seats
  }
}

function setSchedules(state: State, schedules: ISchedule[]): State {
  const sortedSchedules = schedules.sort((a, b) => parseInt(a.time, 0) - parseInt(b.time, 0))
  return {
    ...state,
    schedules: sortedSchedules,
    pickedSchedule: sortedSchedules[0],
    pickedSeats: 0,
    pickedPrmSeats: 0
  }
}

export default (
  state: INewReservationState = initialNewReservationState,
  action: NewReservationActions
): INewReservationState => {
  switch (action.type) {
    case NewReservationTypeKeys.RESET_VALUES:
      return initialNewReservationState
    case NewReservationTypeKeys.SET_BUS_LINES:
      return { ...state, busLines: action.payload }
    case NewReservationTypeKeys.TOGGLE_PICKED_BUS_LINE_DIRECTION:
      return togglePickedBusLineDirection(state)
    case NewReservationTypeKeys.SET_PICKED_BUS_LINE:
      return setPickedBusLine(state, action.payload)
    case NewReservationTypeKeys.SET_PICKED_BUS_STOP:
      return updatePickedBusLineStatus(state, action.payload)
    case NewReservationTypeKeys.SET_PICKED_DATE:
      return { ...state, pickedDate: action.payload, schedulesError: null, schedules: [] }
    case NewReservationTypeKeys.SET_SCHEDULES:
      return setSchedules(state, action.payload)
    case NewReservationTypeKeys.SET_PICKED_SCHEDULE:
      return { ...state, pickedSchedule: action.payload }
    case NewReservationTypeKeys.SET_SCHEDULES_ERROR:
      return { ...state, schedulesError: action.payload, pickedDate: null }
    case NewReservationTypeKeys.SET_FIELDS_FROM_RESERVATION:
      return fieldsFromReservation(state, action.payload)
    case NewReservationTypeKeys.SET_PICKED_SEATS:
      return { ...state, pickedSeats: action.payload }
    case NewReservationTypeKeys.SET_PICKED_PRM_SEATS:
      return { ...state, pickedPrmSeats: action.payload }
    case NewReservationTypeKeys.SET_CAPACITIES:
      return { ...state, capacity: action.payload.capacity, prmCapacity: action.payload.prmCapacity }
    default:
      return state
  }
}
