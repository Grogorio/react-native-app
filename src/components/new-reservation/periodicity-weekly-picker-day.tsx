import * as React from 'react'
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { IPeriod } from '../../models'
import { colors, textStyles } from '../../styles'

interface IProps {
  day: number
  literal: string
  pickedPeriod: IPeriod
  onPress: (day: number) => void
}

export class PeriodicityWeeklyPickerDay extends React.Component<IProps> {
  private get isPicked(): boolean {
    const { pickedPeriod, day } = this.props
    return pickedPeriod && pickedPeriod.indexOf(day) > -1
  }

  private get dayStyle(): StyleProp<ViewStyle> {
    if (this.isPicked) return styles.pickedDay
    return styles.day
  }

  private get dayTextStyle(): StyleProp<TextStyle> {
    if (this.isPicked) return styles.pickedDayText
    return styles.dayText
  }

  public render(): React.ReactNode {
    return (
      <TouchableOpacity style={this.dayStyle} onPress={this.handlePress}>
        <Text style={this.dayTextStyle}>{this.props.literal}</Text>
      </TouchableOpacity>
    )
  }

  @autobind
  private handlePress() {
    const { day, onPress } = this.props
    onPress(day)
  }
}

const styles = StyleSheet.create({
  day: {
    height: verticalScale(36),
    width: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(36)
  },
  dayText: {
    ...textStyles.body,
    color: colors.black
  },
  pickedDay: {
    height: verticalScale(36),
    width: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
    borderRadius: scale(36)
  },
  pickedDayText: {
    ...textStyles.title,
    color: colors.white
  }
})
