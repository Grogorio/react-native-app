import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors, fontFamily } from '../styles'
import { isIOS } from '../utils'

export interface ICalendarDay {
  dateString: string
  day: number
  month: number
  year: number
  timestamp: number
}

export interface ITheme {
  backgroundColor?: string
  calendarBackground?: string
  textSectionTitleColor?: string
  selectedDayBackgroundColor?: string
  selectedDayTextColor?: string
  todayTextColor?: string
  dayTextColor?: string
  textDisabledColor?: string
  dotColor?: string
  selectedDotColor?: string
  arrowColor?: string
  monthTextColor?: string
  textDayFontFamily?: string
  textMonthFontFamily?: string
  textDayHeaderFontFamily?: string
  textDayFontSize?: number
  textMonthFontSize?: number
  textDayHeaderFontSize?: number
}

export const calendarTheme: ITheme = {
  dayTextColor: colors.black,
  textDisabledColor: colors.greyDark,
  todayTextColor: colors.purple,
  selectedDayBackgroundColor: colors.purple,
  selectedDayTextColor: colors.white,
  arrowColor: colors.black,
  monthTextColor: colors.black,
  textDayFontSize: isIOS() ? 20 : responsiveFontSize(2),
  textMonthFontSize: responsiveFontSize(3),
  textDayHeaderFontSize: responsiveFontSize(2),
  textDayHeaderFontFamily: fontFamily,
  textMonthFontFamily: fontFamily,
  textDayFontFamily: fontFamily
}
