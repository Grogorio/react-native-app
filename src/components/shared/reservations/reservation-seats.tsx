import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { textStyles, colors } from '../../../styles'
import { Image } from '../image'
import { literalsService } from '../../../services'

interface IProps {
  seats: number
  prmSeats: number
  onPress?: () => void
}

export class ReservationSeats extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { seats, prmSeats, onPress } = this.props
    return (
      <TouchableOpacity style={styles.reservationSeats} onPress={onPress}>
        <View style={styles.group}>
          <Image name={'seat'} size={{ width: 20, height: 20 }} />
          <Text style={styles.groupText}>
            {seats + prmSeats} {literalsService.get('seatsReserved')}
          </Text>
        </View>
        <Text style={styles.captionText}>
          {seats} {literalsService.get('standardSeats')}, {prmSeats} {literalsService.get('prmSeats')}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  reservationSeats: {
    flexDirection: 'column',
    marginBottom: verticalScale(20)
  },
  group: {
    flexDirection: 'row',
    height: verticalScale(25)
  },
  groupText: {
    ...textStyles.body,
    color: colors.black,
    marginLeft: 18
  },
  captionText: {
    ...textStyles.caption,
    color: colors.greyDark,
    marginLeft: 38
  },
  mini: {
    paddingLeft: 38,
    color: colors.greyDark,
    ...textStyles.caption
  }
})
