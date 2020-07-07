import React from 'react'
import { verticalScale } from 'react-native-size-matters'
import { View, StyleSheet, Text } from 'react-native'
import { IReservation } from '../../models'
import { ReservationDetailsCard } from '../shared'
import { colors, textStyles, IColor } from '../../styles'
import { daysFromToday } from '../../utils'
import { literalsService } from '../../services'

interface IProps {
  reservation: IReservation
  color: IColor
}
// tslint:disable:max-line-length
export class Penalty extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { color, reservation } = this.props
    return (
      <View style={styles.penalty}>
        <ReservationDetailsCard reservation={reservation} color={color} />
        <Text style={styles.expirationText}>{literalsService.get('expiresIn', true)} {daysFromToday(reservation.expirationFaultDate)} {literalsService.get('days', false)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  penalty: {
    width: '100%',
    paddingVertical: verticalScale(16),
    borderColor: colors.grey,
    borderBottomWidth: 2
  },
  expirationText: {
    ...textStyles.caption,
    color: colors.greyDark,
    marginTop: verticalScale(16)
  }
})
