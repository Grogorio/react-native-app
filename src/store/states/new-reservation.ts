import { IBusLine, IBusStop, ICalendarDay, ISchedule } from '../../models'

export interface INewReservationState {
  busLines: IBusLine[]
  pickedBusLine: IBusLine
  pickedOriginBusStop: IBusStop
  pickedDestinationBusStop: IBusStop
  pickedDate: ICalendarDay
  pickedSeats: number
  pickedPrmSeats: number
  schedules: ISchedule[]
  pickedSchedule: ISchedule
  schedulesError: Error
  capacity: number
  prmCapacity: number
}
