import { IBusLine, BusLineDirection } from './bus-line'
import { ISchedule } from './schedule'

export type IPeriod = number[]

export type IReservationStatus = 'active' | 'cancel' | 'fault' | 'completed' | 'CANCELLED' | 'ACTIVE'

// TODO: reservation models are not in sync with pildo!!
export interface IReservation {
  busLineId: number
  date: string
  originStopCode: number
  destinationStopCode: number
  time: string
  direction: BusLineDirection
  prmSeats: number
  seats: number
  period?: IPeriod
  busLine?: IBusLine
  schedule?: ISchedule
  id?: number
  expirationFaultDate?: string
  status?: IReservationStatus
}
