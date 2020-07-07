import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { textStyles, colors } from '../../../styles'
import { noMilli } from '../../../utils/utils'
import { Image } from '../image'

interface IProps {
  time: string
  onPress?: () => void
}

export class ReservationSchedule extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { time, onPress } = this.props
    return (
      <TouchableOpacity style={styles.group} onPress={onPress}>
        <Image name={'clockYellow'} size={{ width: 20, height: 20 }} />
        <Text style={styles.groupText}>{noMilli(time)}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    height: verticalScale(25),
    marginBottom: verticalScale(20)
  },
  groupText: {
    ...textStyles.body,
    color: colors.black,
    marginLeft: 18
  }
})
