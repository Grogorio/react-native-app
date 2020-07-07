// tslint:disable:max-classes-per-file
import { IBusLine, IBusStop, ICalendarDay, ISchedule, IReservation } from '../../models'
import { Action } from './action'

export enum NewReservationTypeKeys {
  RESET_VALUES = 'NEW_RESERVATION_RESET_VALUES',
  TOGGLE_PICKED_BUS_LINE_DIRECTION = 'NEW_RESERVATION_TOGGLE_PICKED_BUS_LINE_DIRECTION',
  SET_BUS_LINES = 'NEW_RESERVATION_SET_BUS_LINES',
  SET_PICKED_BUS_LINE = 'NEW_RESERVATION_SET_PICKED_BUS_LINE',
  SET_PICKED_BUS_STOP = 'NEW_RESERVATION_SET_PICKED_BUS_STOP',
  SET_PICKED_DATE = 'NEW_RESERVATION_SET_PICKED_DATE',
  SET_SCHEDULES = 'NEW_RESERVATION_SET_SCHEDULES',
  SET_PICKED_SEATS = 'NEW_RESERVATION_SET_PICKED_SEATS',
  SET_PICKED_PRM_SEATS = 'NEW_RESERVATION_SET_PICKED_PRM_SEATS',
  SET_PICKED_SCHEDULE = 'NEW_RESERVATION_SET_PICKED_SCHEDULE',
  SET_SCHEDULES_ERROR = 'NEW_RESERVATION_SET_SCHEDULES_ERROR',
  SET_FIELDS_FROM_RESERVATION = 'NEW_RESERVATION_SET_FIELDS_FROM_RESERVATION',
  SET_CAPACITIES = 'NEW_RESERVATION_SET_CAPACITIES'
}

export type NewReservationActions =
  | ResetNewReservationValuesAction
  | TogglePickedBusLineDirectionAction
  | SetBusLinesAction
  | SetPickedBusLineAction
  | SetPickedBusStopAction
  | SetPickedDateAction
  | SetSchedulesAction
  | SetPickedScheduleAction
  | SetSchedulesErrorAction
  | SetFieldsFromReservationAction
  | SetPickedSeatsAction
  | SetPickedPrmSeatsAction
  | SetCapacitiesAction

export class ResetNewReservationValuesAction extends Action {
  public readonly type = NewReservationTypeKeys.RESET_VALUES
}

export class TogglePickedBusLineDirectionAction extends Action {
  public readonly type = NewReservationTypeKeys.TOGGLE_PICKED_BUS_LINE_DIRECTION
}

export class SetBusLinesAction extends Action<IBusLine[]> {
  public readonly type = NewReservationTypeKeys.SET_BUS_LINES
  constructor(public payload: IBusLine[]) {
    super()
  }
}

export class SetPickedBusLineAction extends Action<IBusLine> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_BUS_LINE
  constructor(public payload: IBusLine = null) {
    super()
  }
}

export class SetPickedBusStopAction extends Action<IBusStop> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_BUS_STOP
  constructor(public payload: IBusStop) {
    super()
  }
}

export class SetPickedDateAction extends Action<ICalendarDay> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_DATE
  constructor(public payload: ICalendarDay) {
    super()
  }
}

export class SetSchedulesAction extends Action<ISchedule[]> {
  public readonly type = NewReservationTypeKeys.SET_SCHEDULES
  constructor(public payload: ISchedule[]) {
    super()
  }
}

export class SetPickedScheduleAction extends Action<ISchedule> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_SCHEDULE
  constructor(public payload: ISchedule) {
    super()
  }
}

export class SetPickedSeatsAction extends Action<number> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_SEATS
  constructor(public payload: number) {
    super()
  }
}

export class SetPickedPrmSeatsAction extends Action<number> {
  public readonly type = NewReservationTypeKeys.SET_PICKED_PRM_SEATS
  constructor(public payload: number) {
    super()
  }
}

export class SetSchedulesErrorAction extends Action<Error> {
  public readonly type = NewReservationTypeKeys.SET_SCHEDULES_ERROR
  constructor(public payload: Error) {
    super()
  }
}

export class SetFieldsFromReservationAction extends Action<IReservation> {
  public readonly type = NewReservationTypeKeys.SET_FIELDS_FROM_RESERVATION
  constructor(public payload: IReservation) {
    super()
  }
}

export class SetCapacitiesAction extends Action<{ capacity: number; prmCapacity: number }> {
  public readonly type = NewReservationTypeKeys.SET_CAPACITIES
  constructor(public payload: { capacity: number; prmCapacity: number }) {
    super()
  }
}
