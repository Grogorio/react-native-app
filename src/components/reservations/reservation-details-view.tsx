import React from 'react'
import { View } from 'react-native'
import { IReservation } from '../../models'
import { ReservationSchedule, ReservationStops, ReservationSeats } from '../shared'
import { ReservationDate } from '../shared/reservations/reservation-date'
import { globalStyles } from '../../styles'

interface IProps {
  reservation: IReservation
}

export class ReservationDetailsView extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { reservation } = this.props
    return (
      <View style={[globalStyles.contentContainer, { flex: 0 }]}>
        <ReservationDate date={reservation.date} />
        <ReservationSchedule time={reservation.schedule.expedition} />
        <ReservationSeats seats={reservation.seats} prmSeats={reservation.prmSeats} />
        <ReservationStops busline={reservation.busLine} />
      </View>
    )
  }
}
