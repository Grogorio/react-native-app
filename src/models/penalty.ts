import { IReservation } from './reservation'

export interface IPenaltiesInfo {
  reservations: IReservation[]
  amount: number
  expiration: string,
  isLoading: boolean
}
