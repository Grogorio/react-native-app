import { BaseHttpService } from './base-http-service'
import { IPenaltiesInfo, setReservations } from '../../models'

class PenaltiesService extends BaseHttpService {
  public async getPenalties(): Promise<IPenaltiesInfo> {
    return Promise.all([this.get('users/me'), this.get('reservations?status=fault')]).then(([user, { past }]) => {
      return {
        amount: Math.floor(past.length / 4),
        expiration: user.penalty,
        reservations: setReservations(past),
        isLoading: false
      }
    })
  }
}

export default new PenaltiesService()
