import * as React from 'react'
import { View, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { IStoreState } from '../../store/states'
import { Screen, ValidatedButton, ReservationDetailsConfirmation, Map } from '../../components'
import { ICalendarDay, IBusLine, IBusStop, ISchedule, IReservation } from '../../models'
import { routes } from '../../navigation'
import { NavigationHeader } from '../../containers'
import { literalsService, reservationService } from '../../services'
import { ResetNewReservationValuesAction } from '../../store/actions'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  pickedDate: ICalendarDay
  pickedBusLine: IBusLine
  pickedOriginBusStop: IBusStop
  pickedDestinationBusStop: IBusStop
  pickedSchedule: ISchedule
  pickedSeats: number
  pickedPrmSeats: number
  editingReservation: IReservation
  pickedReservation: IReservation
}

class NewReservationConfirmationStep extends Screen<IProps> {
  private get headerProps(): {} {
    if (this.screenParams && this.screenParams.editMode)
      return {
        onExitPress: this.handleExitPress
      }
    else
      return {
        onBackPress: this.handleBackPress
      }
  }

  private get isEveryFieldValid(): boolean {
    const {
      pickedDate,
      pickedBusLine,
      pickedSchedule,
      pickedOriginBusStop,
      pickedDestinationBusStop,
      pickedSeats,
      pickedPrmSeats
    } = this.props
    return (
      !!pickedDate &&
      !!pickedBusLine &&
      !!pickedSchedule &&
      !!pickedOriginBusStop &&
      !!pickedDestinationBusStop &&
      (pickedSeats > 0 || pickedPrmSeats > 0)
    )
  }

  private get isSomeFieldEdited(): boolean {
    const {
      pickedDate,
      pickedBusLine,
      pickedSchedule,
      pickedOriginBusStop,
      pickedDestinationBusStop,
      editingReservation,
      pickedSeats,
      pickedPrmSeats
    } = this.props

    if (!editingReservation) return false

    return (
      editingReservation.busLineId !== pickedBusLine.id ||
      editingReservation.originStopCode !== pickedOriginBusStop.code ||
      editingReservation.destinationStopCode !== pickedDestinationBusStop.code ||
      editingReservation.time !== pickedSchedule.time ||
      editingReservation.date !== pickedDate.dateString ||
      editingReservation.seats !== pickedSeats ||
      editingReservation.prmSeats !== pickedPrmSeats
    )
  }

  private get validateButtonText(): string {
    if (this.screenParams && this.screenParams.editMode) return literalsService.get('save').toUpperCase()
    return literalsService.get('reserve').toUpperCase()
  }

  public render(): React.ReactNode {
    const { pickedDate, pickedBusLine, pickedSchedule, pickedSeats, pickedPrmSeats } = this.props
    if (!this.isEveryFieldValid) return null
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          {...this.headerProps}
          reversed={true}
          opacityOn={true}
          actionText={literalsService.get('cancel', true)}
          onActionPress={this.editMode ? null : this.handleActionPress}
        >
          <Text style={globalStyles.headerTitle}>{literalsService.get('routeDetails').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={globalStyles.container}>
          <Map line={pickedBusLine} disableCallouts={true} />
        </View>
        <ReservationDetailsConfirmation
          date={pickedDate.dateString}
          busline={pickedBusLine}
          schedule={pickedSchedule}
          seats={pickedSeats}
          prmSeats={pickedPrmSeats}
          onStopsPress={this.handleStopsPress}
          onDatePress={this.handleDatePress}
          onSchedulePress={this.handleSchedulePress}
          onBusLinePress={this.handleBusLinePress}
          onSeatsPress={this.handleSeatsPress}
        />
        <ValidatedButton
          label={this.validateButtonText}
          onPress={this.handleValidatedButtonPress}
          isDisabled={this.editMode && !this.isSomeFieldEdited}
        />
      </View>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const {
      pickedBusLine,
      pickedDate,
      pickedSchedule,
      pickedOriginBusStop,
      pickedDestinationBusStop,
      editingReservation,
      pickedSeats,
      pickedPrmSeats
    } = this.props

    const reservation: IReservation = {
      busLineId: pickedBusLine.id,
      date: pickedDate.dateString,
      destinationStopCode: pickedDestinationBusStop.code,
      direction: pickedBusLine.direction,
      originStopCode: pickedOriginBusStop.code,
      time: pickedSchedule.time,
      prmSeats: pickedPrmSeats,
      seats: pickedSeats
    }

    this.editMode ? this.updateReservation(editingReservation.id, reservation) : this.postReservation(reservation)
  }

  private async postReservation(reservation: IReservation): Promise<void> {
    try {
      const postedReservation = await reservationService.postReservation(reservation)
      this.reset(routes.reservations.routeName, 0, {
        reservationId: postedReservation.id,
        notification: { label: literalsService.get('reservationSaved', true) }
      })
      this.props.dispatch(new ResetNewReservationValuesAction())
    } catch (error) {
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationNotSaved', true), isError: true }
      })
      this.props.dispatch(new ResetNewReservationValuesAction())
    }
  }

  private async updateReservation(id: number, reservation: IReservation): Promise<void> {
    try {
      const updatedReservation = await reservationService.updateReservation(id, reservation)
      this.reset(routes.reservations.routeName, 0, {
        reservationId: updatedReservation.id,
        notification: { label: literalsService.get('reservationUpdated', true) }
      })
      this.props.dispatch(new ResetNewReservationValuesAction())
    } catch (error) {
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationNotUpdated', true), isError: true }
      })
      this.props.dispatch(new ResetNewReservationValuesAction())
    }
  }

  @autobind
  private handleBackPress(): void {
    this.reset(routes.newReservationSeatsStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleExitPress(): void {
    this.reset(routes.reservations.routeName)
  }

  @autobind
  private handleStopsPress(): void {
    this.reset(routes.newReservationBusStopsStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleDatePress(): void {
    this.reset(routes.newReservationDateStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleSchedulePress(): void {
    this.reset(routes.newReservationScheduleStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleBusLinePress(): void {
    this.reset(routes.newReservationBusLineStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleSeatsPress(): void {
    this.reset(routes.newReservationSeatsStep.routeName, 0, { editMode: this.editMode })
  }

  @autobind
  private handleActionPress(): void {
    const { pickedReservation, dispatch } = this.props
    if (this.editMode) this.reset(routes.reservationDetails.routeName, 0, { id: pickedReservation.id })
    else this.reset(routes.reservations.routeName)
    dispatch(new ResetNewReservationValuesAction())
  }
}

const mapStateToProps = ({ newReservation, reservations }: IStoreState) => ({
  pickedDate: newReservation.pickedDate,
  pickedBusLine: newReservation.pickedBusLine,
  pickedOriginBusStop: newReservation.pickedOriginBusStop,
  pickedDestinationBusStop: newReservation.pickedDestinationBusStop,
  pickedSchedule: newReservation.pickedSchedule,
  pickedSeats: newReservation.pickedSeats,
  pickedPrmSeats: newReservation.pickedPrmSeats,
  editingReservation: reservations.pickedReservation,
  pickedReservation: reservations.pickedReservation
})

export default connect(mapStateToProps)(NewReservationConfirmationStep)
