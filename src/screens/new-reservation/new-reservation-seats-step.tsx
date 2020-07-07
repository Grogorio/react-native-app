import * as React from 'react'
import { View, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { IStoreState } from '../../store/states'
import { Screen, ValidatedButton, QuantityInput } from '../../components'
import { routes } from '../../navigation'
import { NavigationHeader } from '../../containers'
import { literalsService } from '../../services'
import { SetPickedSeatsAction, SetPickedPrmSeatsAction, ResetNewReservationValuesAction } from '../../store/actions'
import { fetchCapacityActionThunk } from '../../store/thunks'
import { ISchedule, IBusStop, IReservation } from '../../models'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  pickedSeats: number
  pickedPrmSeats: number
  pickedSchedule: ISchedule
  pickedDestinationBusStop: IBusStop
  capacity: number
  prmCapacity: number
  pickedReservation: IReservation
}

class NewReservationSeatsStep extends Screen<IProps> {
  public componentDidMount() {
    const { pickedSchedule, pickedDestinationBusStop, pickedSeats, pickedPrmSeats } = this.props
    this.props.dispatch(
      fetchCapacityActionThunk(pickedSchedule.id, pickedDestinationBusStop.code, pickedSeats, pickedPrmSeats)
    )
  }

  private get isSomeSeatPicked(): boolean {
    const { pickedPrmSeats, pickedSeats } = this.props
    return pickedSeats > 0 || pickedPrmSeats > 0
  }

  public render(): React.ReactNode {
    const { capacity, prmCapacity, pickedSeats, pickedPrmSeats } = this.props
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          onBackPress={this.handleBackPress}
          reversed={true}
          opacityOn={true}
          actionText={literalsService.get('cancel', true)}
          onActionPress={this.handleActionPress}
        >
          <Text style={globalStyles.headerTitle}>{literalsService.get('chooseSeats').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={globalStyles.contentContainer}>
          <QuantityInput
            amount={pickedSeats}
            maxAmount={capacity}
            onChange={this.handleSeatsChange}
            label={literalsService.get('standardSeats', true)}
            caption={literalsService.get('seatsLeft', true)}
            amountReachedWarning={literalsService.get('noSeatsAvailable', true)}
          />
          <QuantityInput
            amount={pickedPrmSeats}
            maxAmount={prmCapacity}
            onChange={this.handlePrmSeatsChange}
            label={literalsService.get('prmSeats', true)}
            caption={literalsService.get('seatsLeft', true)}
            amountReachedWarning={literalsService.get('noPrmSeatsAvailable', true)}
          />
        </View>
        <ValidatedButton
          label={literalsService.get('next').toUpperCase()}
          onPress={this.handleValidatedButtonPress}
          isDisabled={!this.isSomeSeatPicked}
        />
      </View>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    this.navigate(routes.newReservationConfirmationStep.routeName, { editMode: this.editMode })
  }

  @autobind
  private handleBackPress(): void {
    this.reset(routes.newReservationScheduleStep.routeName)
  }

  @autobind
  private handleSeatsChange(amount: number): void {
    this.props.dispatch(new SetPickedSeatsAction(amount))
  }

  @autobind
  private handlePrmSeatsChange(amount: number): void {
    this.props.dispatch(new SetPickedPrmSeatsAction(amount))
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
  pickedSeats: newReservation.pickedSeats,
  pickedPrmSeats: newReservation.pickedPrmSeats,
  pickedSchedule: newReservation.pickedSchedule,
  pickedDestinationBusStop: newReservation.pickedDestinationBusStop,
  capacity: newReservation.capacity,
  prmCapacity: newReservation.prmCapacity,
  pickedReservation: reservations.pickedReservation
})

export default connect(mapStateToProps)(NewReservationSeatsStep)
