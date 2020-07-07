import * as React from 'react'
import { View, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { IStoreState } from '../../store/states'
import { Screen, Calendar, ValidatedButton } from '../../components'
import { SetPickedDateAction, ResetNewReservationValuesAction } from '../../store/actions'
import { ICalendarDay, IReservation } from '../../models'
import { routes } from '../../navigation'
import { NavigationHeader } from '../../containers'
import { literalsService } from '../../services'
import { fetchMaxReservableDate } from '../../store/thunks'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  pickedDate: ICalendarDay
  maxReservableDate: string
  schedulesError: Error
  pickedReservation: IReservation
}

class NewReservationDateStep extends Screen<IProps> {
  private get isEveryFieldValid(): boolean {
    return !!this.props.pickedDate
  }

  private get schedulesErrorMessage(): React.ReactNode {
    if (!this.props.schedulesError) return null
    return <Text style={globalStyles.errorText}>{literalsService.get('noSchedulesFound', true)}</Text>
  }

  public componentDidMount(): void {
    this.props.dispatch(fetchMaxReservableDate())
  }

  public render(): React.ReactNode {
    const { pickedDate, maxReservableDate } = this.props
    if (!maxReservableDate) return this.spinner
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          onBackPress={this.handleBackPress}
          reversed={true}
          opacityOn={true}
          actionText={literalsService.get('cancel', true)}
          onActionPress={this.handleActionPress}
        >
          <Text style={globalStyles.headerTitle}>{literalsService.get('chooseDate').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={globalStyles.contentContainer}>
          {this.schedulesErrorMessage}
          <Calendar pickedDates={[pickedDate]} onDayPress={this.onDayPress} maxDate={maxReservableDate} />
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
            style={{ marginTop: 'auto' }}
          />
        </View>
      </View>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    this.navigate(routes.newReservationScheduleStep.routeName, { editMode: this.editMode })
  }

  @autobind
  private onDayPress(day: ICalendarDay): void {
    this.props.dispatch(new SetPickedDateAction(day))
  }

  @autobind
  private handleBackPress(): void {
    this.reset(routes.newReservationBusStopsStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleActionPress(): void {
    const { pickedReservation, dispatch } = this.props
    if (this.editMode) this.reset(routes.reservationDetails.routeName, 0, { id: pickedReservation.id })
    else this.reset(routes.reservations.routeName)
    dispatch(new ResetNewReservationValuesAction())
  }
}

const mapStateToProps = ({ newReservation, ui, reservations }: IStoreState) => ({
  pickedDate: newReservation.pickedDate,
  schedulesError: newReservation.schedulesError,
  maxReservableDate: ui.maxReservableDate,
  pickedReservation: reservations.pickedReservation
})

export default connect(mapStateToProps)(NewReservationDateStep)
