import React from 'react'
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { colors, textStyles, IColor } from '../../styles'
import { HHMMSStoHHMM, dateToFormat } from '../../utils'
import { IReservation, getStops } from '../../models'
import { Image } from '../shared'
import { LineNumber } from './line-number'

interface IProps {
  reservation: IReservation
  color?: IColor
}

export class ReservationDetailsCard extends React.Component<IProps> {
  private get dateTextStyle(): StyleProp<TextStyle> {
    const color = this.props.color
    return {
      ...textStyles.caption,
      color: color ? color : colors.greyDark,
      marginBottom: 14
    }
  }

  public render(): React.ReactNode {
    const { schedule, date, originStopCode, destinationStopCode, busLine } = this.props.reservation
    const color = this.props.color
    const stops = getStops(busLine)
    const originStop = stops.find(x => x.code === originStopCode)
    const destinationStop = stops.find(x => x.code === destinationStopCode)
    return (
      <View style={styles.reservationContainer}>
        <View style={styles.reservationInfoContainer}>
          <Text style={this.dateTextStyle}>
            {dateToFormat(date)} - {HHMMSStoHHMM(schedule.expedition)}
          </Text>
          <View style={styles.stop}>
            <Image style={styles.stopIcon} name="dotSelected" size={{ width: 20, height: 20 }} />
            <Text style={styles.stopText}>{originStop.code} - {originStop.name}</Text>
          </View>
          <View style={styles.dashed} />
          <View style={[styles.stop, { marginTop: 4 }]}>
            <Image style={styles.stopIcon} name="pin" size={{ width: 20, height: 20 }} />
            <Text style={styles.stopText}>{destinationStop.code} - {destinationStop.name}</Text>
          </View>
        </View>
        <View style={styles.busNumberContainer}>
          <LineNumber
            lineNumber={busLine.name}
            style={{ backgroundColor: color ? color : colors.yellow, marginTop: -10 }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reservationContainer: {
    flexDirection: 'row'
  },
  reservationInfoContainer: {
    flex: 1
  },
  busNumberContainer: {
    width: moderateScale(36)
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stopIcon: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  stopText: {
    ...textStyles.title,
    color: colors.black
  },
  dashed: {
    borderLeftWidth: 1,
    borderRadius: 1,
    borderColor: colors.greyDark,
    marginLeft: 12,
    height: 10
  }
})
