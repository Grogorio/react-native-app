import * as React from 'react'
import { View, Text, ActivityIndicator, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { verticalScale } from 'react-native-size-matters'
import { globalStyles, colors, textStyles } from '../../styles'
import { IStoreState } from '../../store/states'
import { Screen, ValidatedButton, SchedulesPicker } from '../../components'
import { ISchedule, ICalendarDay, IBusStop, IBusLine, IReservation } from '../../models'
import { routes } from '../../navigation'
import { SetPickedScheduleAction, ResetNewReservationValuesAction } from '../../store/actions'
import { fetchSchedulesActionThunk } from '../../store/thunks'
import { NavigationHeader } from '../../containers'
import { literalsService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  schedules: ISchedule[]
  pickedSchedule: ISchedule
  pickedDate: ICalendarDay
  pickedOriginBusStop: IBusStop
  pickedBusLine: IBusLine
  pickedReservation: IReservation
}

class NewReservationScheduleStep extends Screen<IProps> {
  public componentDidMount() {
    const { pickedBusLine, pickedOriginBusStop, pickedDate } = this.props
    this.props.dispatch(fetchSchedulesActionThunk(pickedBusLine.id, pickedOriginBusStop.code, pickedDate.dateString))
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    if (!nextProps.pickedDate) {
      this.goBack()
    }
  }

  private get isEveryFieldValid(): boolean {
    return !!this.props.pickedSchedule
  }

  private get areSchedulesAvailable(): boolean {
    const { schedules } = this.props
    return schedules && schedules.length > 0
  }

  private get schedulesPicker(): React.ReactNode {
    const { schedules, pickedSchedule } = this.props
    if (this.areSchedulesAvailable)
      return <SchedulesPicker schedules={schedules} pickedSchedule={pickedSchedule} onChange={this.onPickerChange} />
    return <ActivityIndicator size="large" color={colors.purple} />
  }

  private get containerStyle(): StyleProp<ViewStyle> {
    if (this.areSchedulesAvailable) return globalStyles.container
    return globalStyles.fullAlignedcontainer
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          onBackPress={this.handleBackPress}
          reversed={true}
          opacityOn={true}
          actionText={literalsService.get('cancel', true)}
          onActionPress={this.handleActionPress}
        >
          <Text style={globalStyles.headerTitle}>{literalsService.get('chooseSchedule').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={globalStyles.contentContainer}>
          <View>
            <Text style={styles.scheduleMessage}>{literalsService.get('chooseBusSchedule', true)}</Text>
            <Text style={styles.scheduleMessage}>{literalsService.get('busScheduleAlert', true)}</Text>
          </View>
          <View style={this.containerStyle}>{this.schedulesPicker}</View>
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
          />
        </View>
      </View>
    )
  }

  @autobind
  private onPickerChange(schedule: ISchedule): void {
    this.props.dispatch(new SetPickedScheduleAction(schedule))
  }

  @autobind
  private handleValidatedButtonPress(): void {
    this.navigate(routes.newReservationSeatsStep.routeName, { editMode: this.editMode })
  }

  @autobind
  private handleBackPress(): void {
    this.reset(routes.newReservationDateStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleActionPress(): void {
    const { pickedReservation, dispatch } = this.props
    if (this.editMode) this.reset(routes.reservationDetails.routeName, 0, { id: pickedReservation.id })
    else this.reset(routes.reservations.routeName)
    dispatch(new ResetNewReservationValuesAction())
  }
}

const styles = StyleSheet.create({
  scheduleMessage: {
    ...textStyles.body,
    color: colors.black,
    marginBottom: verticalScale(5)
  }
})

const mapStateToProps = ({ newReservation, reservations }: IStoreState) => ({
  schedules: newReservation.schedules,
  pickedSchedule: newReservation.pickedSchedule,
  pickedDate: newReservation.pickedDate,
  pickedOriginBusStop: newReservation.pickedOriginBusStop,
  pickedBusLine: newReservation.pickedBusLine,
  pickedReservation: reservations.pickedReservation
})

export default connect(mapStateToProps)(NewReservationScheduleStep)
