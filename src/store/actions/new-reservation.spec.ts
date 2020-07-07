import {
  ResetNewReservationValuesAction,
  SetBusLinesAction,
  SetPickedBusLineAction,
  SetPickedBusStopAction,
  SetPickedDateAction,
  SetPickedScheduleAction,
  SetSchedulesAction,
  NewReservationTypeKeys
} from './new-reservation'
import { getBusLine, getCalendarDay, getSchedule } from '../../tests'

describe('New reservation actions', () => {
  it('all NewReservation actions should have the NEW_RESERVATION prefix', () => {
    Object.getOwnPropertyNames(NewReservationTypeKeys).forEach((x: any) => {
      expect(NewReservationTypeKeys[x].startsWith('NEW_RESERVATION_')).toBeTruthy()
    })
  })

  it('should create the action ResetNewReservationValuesAction', () => {
    const expectedAction = { type: NewReservationTypeKeys.RESET_VALUES }
    expect(new ResetNewReservationValuesAction()).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationBusLinesAction', () => {
    const buslines = [getBusLine(), getBusLine()]
    const expectedAction = {
      type: NewReservationTypeKeys.SET_BUS_LINES,
      payload: buslines
    }
    expect(new SetBusLinesAction(buslines)).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationPickedBusLineAction', () => {
    const busline = getBusLine()
    const expectedAction = {
      type: NewReservationTypeKeys.SET_PICKED_BUS_LINE,
      payload: busline
    }
    expect(new SetPickedBusLineAction(busline)).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationPickedBusStopAction', () => {
    const busStop = getBusLine().forthStops[0]
    const expectedAction = {
      type: NewReservationTypeKeys.SET_PICKED_BUS_STOP,
      payload: busStop
    }
    expect(new SetPickedBusStopAction(busStop)).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationPickedDateAction', () => {
    const calendarDay = getCalendarDay()
    const expectedAction = {
      type: NewReservationTypeKeys.SET_PICKED_DATE,
      payload: calendarDay
    }
    expect(new SetPickedDateAction(calendarDay)).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationPickedScheduleAction', () => {
    const schedule = getSchedule()
    const expectedAction = {
      type: NewReservationTypeKeys.SET_PICKED_SCHEDULE,
      payload: schedule
    }
    expect(new SetPickedScheduleAction(schedule)).toEqual(expectedAction)
  })

  it('should create the action SetNewReservationSchedulesAction', () => {
    const schedules = [getSchedule(), getSchedule(), getSchedule()]
    const expectedAction = {
      type: NewReservationTypeKeys.SET_SCHEDULES,
      payload: schedules
    }
    expect(new SetSchedulesAction(schedules)).toEqual(expectedAction)
  })
})
