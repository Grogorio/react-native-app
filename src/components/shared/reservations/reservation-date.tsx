import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { textStyles, colors } from '../../../styles'
import { toLocaleDateString } from '../../../utils/utils'
import { Image } from '../image'

interface IProps {
  date: string
  onPress?: () => void
}

export class ReservationDate extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { date, onPress } = this.props
    return (
      <TouchableOpacity style={styles.calendar} onPress={onPress}>
        <View style={styles.group}>
          <Image name={'calendarYellow'} size={{ width: 20, height: 20 }} />
          <Text style={styles.groupText}>{toLocaleDateString(date)}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    height: verticalScale(25)
  },
  groupText: {
    ...textStyles.body,
    color: colors.black,
    marginLeft: 18
  },
  calendar: {
    flexDirection: 'column',
    marginBottom: verticalScale(20)
  }
})
