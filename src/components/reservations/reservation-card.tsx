import React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { colors } from '../../styles'
import { IReservation } from '../../models'
import { Map, ReservationDetailsCard } from '../shared'
import { literalsService } from '../../services'

interface IProps {
  reservation: IReservation
  onPress: (r: IReservation) => void
}

export class ReservationCard extends React.Component<IProps> {
  private get cancelledLabel() {
    if (this.props.reservation.status !== 'CANCELLED') return
    return (
      <View style={styles.notification}>
        <Text style={{ color: colors.white }}>{literalsService.get('canceledReservation', true)}</Text>
      </View>
    )
  }

  public render(): React.ReactNode {
    const { reservation } = this.props
    return (
      <TouchableOpacity onPress={this.onReservationPress} style={{ marginBottom: verticalScale(16) }}>
        <View style={styles.reservation}>
          <Map
            line={reservation.busLine}
            disableZoom={true}
            disableMovement={true}
            hideNoUsedStops={true}
            hideCallouts={true}
          />
          {this.cancelledLabel}
          <View style={styles.details}>
            <ReservationDetailsCard reservation={reservation} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  @autobind
  private onReservationPress() {
    const { onPress, reservation } = this.props
    if (!onPress) return
    onPress(reservation)
  }
}

const styles = StyleSheet.create({
  reservation: {
    backgroundColor: colors.white,
    borderRadius: 4,
    width: Dimensions.get('window').width - scale(20),
    flexDirection: 'column',
    padding: 4,
    height: verticalScale(260)
  },
  details: {
    paddingRight: scale(20),
    paddingLeft: scale(20),
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(16)
  },
  notification: {
    position: 'absolute',
    top: 15,
    left: 5,
    backgroundColor: colors.pinkDark,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingRight: 16,
    paddingLeft: 12,
    height: 28,
    justifyContent: 'center',
    flex: 1
  }
})
