import { Action } from './action'
import { IReservationsState } from '../states'
import { IReservation, ICalendarDay } from '../../models'

// tslint:disable:max-classes-per-file

export enum ReservationsTypeKeys {
  SET_RESERVATIONS = 'RESERVATIONS_SET_RESERVATIONS',
  SET_PAGINATED_RESERVATIONS = 'RESERVATIONS_SET_PAGINATED_RESERVATIONS',
  SET_PAGINATED_UPCOMING_RESERVATIONS = 'RESERVATIONS_SET_PAGINATED_UPCOMING_RESERVATIONS',
  SET_PAGINATED_PAST_RESERVATIONS = 'RESERVATIONS_SET_PAGINATED_PAST_RESERVATIONS',
  SET_RESERVATION_DETAIL = 'RESERVATIONS_SET_RESERVATION_DETAIL',
  SET_IS_FETCHING_RESERVATIONS = 'RESERVATIONS_SET_IS_FETCHING_RESERVATIONS',
  SET_IS_FETCHING_PAGINATED_RESERVATIONS = 'RESERVATIONS_SET_IS_FETCHING_PAGINATED_RESERVATIONS',
  ADD_PICKED_REPEAT_DATES = 'RESERVATIONS_ADD_PICKED_REPEAT_DATES',
  REMOVE_PICKED_REPEAT_DATES = 'RESERVATIONS_REMOVE_PICKED_REPEAT_DATES',
  SET_DISABLED_REPEAT_DATES = 'RESERVATIONS_SET_DISABLED_REPEAT_DATES',
  RESET_RECURRENCE_VALUES = 'RESERVATIONS_RESET_RECURRENCE_VALUES'
}

export type ReservationsActions =
  | SetReservationsAction
  | SetReservationDetailAction
  | SetIsFetchingReservationsAction
  | SetPaginatedReservationsAction
  | SetPaginatedUpComingReservationsAction
  | SetPaginatedPastReservationsAction
  | SetIsFetchingPaginatedReservationsAction
  | AddPickedRepeatDatesAction
  | RemovePickedRepeatDatesAction
  | ResetRecurrenceValuesAction
  | SetDisabledRepeatDatesAction

export class SetReservationsAction extends Action<IReservationsState> {
  public readonly type = ReservationsTypeKeys.SET_RESERVATIONS
  constructor(public payload: IReservationsState) {
    super()
  }
}

export class SetPaginatedReservationsAction extends Action<IReservationsState> {
  public readonly type = ReservationsTypeKeys.SET_PAGINATED_RESERVATIONS
  constructor(public payload: IReservationsState) {
    super()
  }
}

export class SetPaginatedUpComingReservationsAction extends Action<IReservationsState> {
  public readonly type = ReservationsTypeKeys.SET_PAGINATED_UPCOMING_RESERVATIONS
  constructor(public payload: IReservationsState) {
    super()
  }
}

export class SetPaginatedPastReservationsAction extends Action<IReservationsState> {
  public readonly type = ReservationsTypeKeys.SET_PAGINATED_PAST_RESERVATIONS
  constructor(public payload: IReservationsState) {
    super()
  }
}

export class SetReservationDetailAction extends Action<IReservation> {
  public readonly type = ReservationsTypeKeys.SET_RESERVATION_DETAIL
  constructor(public payload: IReservation) {
    super()
  }
}

export class SetIsFetchingReservationsAction extends Action<boolean> {
  public readonly type = ReservationsTypeKeys.SET_IS_FETCHING_RESERVATIONS
  constructor(public payload: boolean) {
    super()
  }
}

export class SetIsFetchingPaginatedReservationsAction extends Action<boolean> {
  public readonly type = ReservationsTypeKeys.SET_IS_FETCHING_PAGINATED_RESERVATIONS
  constructor(public payload: boolean) {
    super()
  }
}

export class AddPickedRepeatDatesAction extends Action<ICalendarDay> {
  public readonly type = ReservationsTypeKeys.ADD_PICKED_REPEAT_DATES
  constructor(public payload: ICalendarDay) {
    super()
  }
}

export class RemovePickedRepeatDatesAction extends Action<ICalendarDay> {
  public readonly type = ReservationsTypeKeys.REMOVE_PICKED_REPEAT_DATES
  constructor(public payload: ICalendarDay) {
    super()
  }
}

export class SetDisabledRepeatDatesAction extends Action<string[]> {
  public readonly type = ReservationsTypeKeys.SET_DISABLED_REPEAT_DATES
  constructor(public payload: string[]) {
    super()
  }
}

export class ResetRecurrenceValuesAction extends Action<void> {
  public readonly type = ReservationsTypeKeys.RESET_RECURRENCE_VALUES
}
