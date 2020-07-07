import { IReservation, ICalendarDay } from '../../models'

export interface IReservationsState {
  upComing: IReservation[]
  past: IReservation[]
  isFetchingReservations: boolean
  isFetchingPaginatedReservations: boolean
  pickedReservation?: IReservation
  pickedRepeatDates?: ICalendarDay[]
  disabledRepeatDates?: string[]
}
