import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { ReservationSchedule, ReservationSeats } from '../index'
import { IBusLine, ISchedule } from '../../models'
import { ReservationDate } from '../shared/reservations/reservation-date'
import { ReservationStops } from '../shared/reservations/reservation-stops'
import { ReservationLine } from '../shared/reservations/reservation-line'
import { getTowards } from '../../models/bus-line'
import { literalsService } from '../../services'
import { globalStyles } from '../../styles'

interface IProps {
  date: string
  busline: IBusLine
  schedule: ISchedule
  seats: number
  prmSeats: number
  onStopsPress: () => void
  onDatePress: () => void
  onSchedulePress: () => void
  onBusLinePress: () => void
  onSeatsPress: () => void
}

export class ReservationDetailsConfirmation extends React.Component<IProps> {
  public render(): React.ReactNode {
    const {
      date,
      busline,
      schedule,
      seats,
      prmSeats,
      onStopsPress,
      onDatePress,
      onSchedulePress,
      onBusLinePress,
      onSeatsPress
    } = this.props
    const towards = getTowards(literalsService.get('towards'), busline)
    return (
      <View style={[globalStyles.contentContainer, { paddingBottom: verticalScale(10) }]}>
        <ReservationLine name={busline.name} description={towards} onPress={onBusLinePress} />
        <ScrollView style={styles.detailsContainer}>
          <ReservationStops busline={busline} onPress={onStopsPress} />
          <ReservationDate date={date} onPress={onDatePress} />
          <ReservationSchedule time={schedule.expedition} onPress={onSchedulePress} />
          <ReservationSeats seats={seats} prmSeats={prmSeats} onPress={onSeatsPress} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingLeft: scale(8)
  }
})
