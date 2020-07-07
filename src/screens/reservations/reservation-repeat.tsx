import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { NavigationScreenProps } from 'react-navigation'
import { Screen, Calendar, ValidatedButton } from '../../components'
import { NavigationHeader } from '../../containers'
import { globalStyles, textStyles, colors } from '../../styles'
import { literalsService, reservationService } from '../../services'
import { ICalendarDay, IReservation } from '../../models'
import { IStoreState } from '../../store/states'
import {
  RemovePickedRepeatDatesAction,
  AddPickedRepeatDatesAction,
  ResetRecurrenceValuesAction
} from '../../store/actions'
import { routes } from '../../navigation'
import { fetchDisabledRepeatDates, fetchMaxReservableDate } from '../../store/thunks'
import { dateToYYYYMMDD } from '../../utils'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  pickedRepeatDates: ICalendarDay[]
  disabledRepeatDates: string[]
  pickedReservation: IReservation
  maxReservableDate: string
}

class ReservationRepeat extends Screen<IProps> {
  public componentDidMount(): void {
    this.props.dispatch(fetchMaxReservableDate())
    this.props.dispatch(fetchDisabledRepeatDates(this.props.pickedReservation.id))
  }

  private get isSomeDatePicked(): boolean {
    return !!this.props.pickedRepeatDates.length
  }

  private get minDate(): string {
    return dateToYYYYMMDD(new Date())
  }

  public render(): React.ReactNode {
    const { pickedRepeatDates, disabledRepeatDates, maxReservableDate } = this.props
    if (!maxReservableDate || disabledRepeatDates === undefined) return this.spinner
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onBackPress={this.handleBackPress} reversed={true} backIcon={'close'} opacityOn={true} />
        <View style={globalStyles.contentContainer}>
          <Text style={styles.message}>{literalsService.get('pickCalendar', true)}:</Text>
          <Calendar
            pickedDates={pickedRepeatDates}
            disabledDates={disabledRepeatDates}
            onDayPress={this.handleDayPress}
            minDate={this.minDate}
            maxDate={maxReservableDate}
            style={{ marginTop: 50 }}
          />
          <ValidatedButton
            label={literalsService.get('reserve').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isSomeDatePicked}
            style={{ marginTop: 'auto' }}
          />
        </View>
      </View>
    )
  }

  @autobind
  private handleDayPress(day: ICalendarDay): void {
    const { dispatch, pickedRepeatDates } = this.props
    const isAlreadyPicked = !!pickedRepeatDates.find(x => x.dateString === day.dateString)
    if (isAlreadyPicked) dispatch(new RemovePickedRepeatDatesAction(day))
    else dispatch(new AddPickedRepeatDatesAction(day))
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private async handleValidatedButtonPress(): Promise<void> {
    const { dispatch, pickedRepeatDates, pickedReservation } = this.props
    const dates = pickedRepeatDates.map(x => x.dateString)

    try {
      await reservationService.repeatReservation(pickedReservation.id, dates)
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationRepeated', true) }
      })
      dispatch(new ResetRecurrenceValuesAction())
    } catch (error) {
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationNotRepeated', true), isError: true }
      })
      dispatch(new ResetRecurrenceValuesAction())
    }
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    color: colors.greyDark
  }
})

const mapStateToProps = ({ reservations, ui }: IStoreState) => ({
  pickedReservation: reservations.pickedReservation,
  pickedRepeatDates: reservations.pickedRepeatDates,
  disabledRepeatDates: reservations.disabledRepeatDates,
  maxReservableDate: ui.maxReservableDate
})

export default connect(mapStateToProps)(ReservationRepeat)
