import {
  NewReservationBusLineStep,
  NewReservationBusStopsStep,
  NewReservationDateStep,
  NewReservationScheduleStep,
  NewReservationConfirmationStep,
  NewReservationSeatsStep
} from '../screens'

export const newReservationRoutes = {
  newReservationBusLineStep: {
    screen: NewReservationBusLineStep,
    routeName: 'newReservationBusLineStep'
  },
  newReservationBusStopsStep: {
    screen: NewReservationBusStopsStep,
    routeName: 'newReservationBusStopsStep'
  },
  newReservationDateStep: {
    screen: NewReservationDateStep,
    routeName: 'newReservationDateStep'
  },
  newReservationScheduleStep: {
    screen: NewReservationScheduleStep,
    routeName: 'newReservationScheduleStep'
  },
  newReservationSeatsStep: {
    screen: NewReservationSeatsStep,
    routeName: 'newReservationSeatsStep'
  },
  newReservationConfirmationStep: {
    screen: NewReservationConfirmationStep,
    routeName: 'newReservationConfirmationStep'
  }
}
