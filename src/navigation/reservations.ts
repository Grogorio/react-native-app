import { Reservations, ReservationRepeat, ReservationDetails } from '../screens'

export const reservationsRoutes = {
  reservations: {
    screen: Reservations,
    routeName: 'reservations'
  },
  reservationDetails: {
    screen: ReservationDetails,
    routeName: 'reservationDetails'
  },
  reservationRepeat: {
    screen: ReservationRepeat,
    routeName: 'reservationRepeat'
  }
}
