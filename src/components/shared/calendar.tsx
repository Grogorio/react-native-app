import * as React from 'react'
import { StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native'
import { autobind } from 'core-decorators'
import { scale } from 'react-native-size-matters'
import { Calendar as RNCalendar, LocaleConfig } from '@valudio/react-native-calendars'
import { ICalendarDay, calendarTheme } from '../../models'
import { dateToYYYYMMDD } from '../../utils'
import { colors } from '../../styles'
import { literalsService } from '../../services'

interface IProps {
  pickedDates: ICalendarDay[]
  onDayPress: (day: ICalendarDay) => void
  disabledDates?: string[]
  minDate?: string
  maxDate?: string
  style?: StyleProp<ViewStyle>
}

export class Calendar extends React.Component<IProps> {
  public componentDidMount() {
    LocaleConfig.defaultLocale = literalsService.getLanguage()
  }

  // public UNSAFE_componentWillMount() {
  //   LocaleConfig.defaultLocale = literalsService.getLanguage()
  // }

  private get markedDates(): {} {
    const { pickedDates } = this.props
    if (!pickedDates || !Array.isArray(pickedDates)) return

    const markedDates: any = {}
    pickedDates.forEach(x => {
      if (x) return (markedDates[x.dateString] = { selected: true, selectedColor: colors.purple })
    })
    return markedDates
  }

  private get disabledDates(): {} {
    const { disabledDates } = this.props
    if (!disabledDates || !Array.isArray(disabledDates)) return

    const disabledMarkedDates: any = {}
    disabledDates.forEach(x => {
      if (x) return (disabledMarkedDates[x] = { disabled: true, disableTouchEvent: true })
    })
    return disabledMarkedDates
  }

  private get minDate(): string {
    const minDate = this.props.minDate
    if (minDate) return minDate
    return dateToYYYYMMDD(new Date())
  }

  public render(): React.ReactNode {
    return (
      <RNCalendar
        style={[styles.calendar, this.props.style]}
        minDate={this.minDate}
        maxDate={this.props.maxDate}
        markedDates={{ ...this.markedDates, ...this.disabledDates }}
        onDayPress={this.onDayPress}
        theme={calendarTheme}
        hideExtraDays={true}
        firstDay={1}
      />
    )
  }

  @autobind
  private onDayPress(day: ICalendarDay): void {
    this.props.onDayPress(day)
  }
}

const styles = StyleSheet.create({
  calendar: {
    width: Dimensions.get('window').width - scale(40),
    backgroundColor: 'transparent'
  }
})
