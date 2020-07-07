import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { autobind } from 'core-decorators'
import { scale } from 'react-native-size-matters'
import { PeriodicityWeeklyPickerDay } from './periodicity-weekly-picker-day'
import { addOrRemoveDuplicatedValues } from '../../utils'
import { IPeriod } from '../../models'
import { literalsService } from '../../services'

interface IProps {
  onWeeklyPickerChange: (period: IPeriod) => void
  pickedPeriod: IPeriod
}

export class PeriodicityWeeklyPicker extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { pickedPeriod } = this.props
    return (
      <View style={styles.week}>
        <PeriodicityWeeklyPickerDay
          day={1}
          literal={literalsService.get('twoLetterMonday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={2}
          literal={literalsService.get('twoLetterTuesday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={3}
          literal={literalsService.get('twoLetterWednesday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={4}
          literal={literalsService.get('twoLetterThursday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={5}
          literal={literalsService.get('twoLetterThursday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={6}
          literal={literalsService.get('twoLetterSaturday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
        <PeriodicityWeeklyPickerDay
          day={7}
          literal={literalsService.get('twoLetterSunday')}
          onPress={this.onDayPress}
          pickedPeriod={pickedPeriod}
        />
      </View>
    )
  }

  @autobind
  private onDayPress(day: number) {
    const nextPeriod = addOrRemoveDuplicatedValues(this.props.pickedPeriod, day)
    this.props.onWeeklyPickerChange(nextPeriod)
  }
}

const styles = StyleSheet.create({
  week: {
    width: Dimensions.get('window').width - scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
