import { BaseHttpService } from './base-http-service'
import { IReservation, IReservationStatus } from '../../models'
import { IReservationsState } from '../../store/states'
import { environment } from '../../environments'

class ReservationService extends BaseHttpService {
  public async postReservation(reservation: IReservation): Promise<any> {
    return this.post('reservations', reservation).then(body => body)
  }

  public async updateReservation(id: number, reservation: IReservation): Promise<any> {
    return this.put(`reservations/${id}`, reservation)
  }

  public async repeatReservation(id: number, dates: string[]): Promise<any> {
    return this.post(`reservations/${id}`, { dates })
  }

  public async getReservations(): Promise<IReservationsState> {
    return this.get(`reservations`).then(body => body)
  }

  public async getPaginatedReservations(page: number): Promise<any> {
    return this.get(`reservations?page=${page}&size=${environment.reservationsPaginationSize}`).then(body => body)
  }

  public async getDisabledRepeatDates(id: number): Promise<string[]> {
    return this.get(`reservations/${id}/check`).then(body => body.dates)
  }

  public async getUpComingPaginatedReservations(page: number): Promise<any> {
    return this.get(`reservations?status=active&page=${page}&size=${environment.reservationsPaginationSize}`).then(
      body => body
    )
  }

  public async getPastPaginatedReservations(page: number): Promise<any> {
    return this.get(`reservations?status=completed&page=${page}&size=${environment.reservationsPaginationSize}`).then(
      body => body
    )
  }

  public async getReservation(id: number): Promise<IReservation> {
    return this.get(`reservations/${id}`).then(body => body)
  }

  public async updateReservationStatus(id: number, status: IReservationStatus): Promise<any> {
    return this.patch(`reservations/${id}`, status)
  }

  public async deleteReservation(id: number): Promise<any> {
    return this.delete(`reservations/${id}`)
  }
}

export default new ReservationService()
