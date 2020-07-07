import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles, colors, textStyles } from '../../styles'
import { IStoreState } from '../../store/states'
import { Screen, Map, ReservationDetailsView, IActionSheet, LineNumber } from '../../components'
import { IReservation } from '../../models'
import { fetchReservationThunk } from '../../store/thunks'
import { NavigationHeader } from '../../containers'
import { actionSheetService, literalsService, reservationService, paramsService } from '../../services'
import { routes } from '../../navigation'
import { SetFieldsFromReservationAction } from '../../store/actions'
import { isReservationPast } from '../../utils'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  reservation: IReservation
}

interface IState {
  isNavigatorReseting: boolean
  minHoursBeforeAction: number
  isConnected: boolean
}

class ReservationDetails extends Screen<IProps, IState> {
  private actions: IActionSheet<any>[]

  private get canceledBanner(): React.ReactNode {
    const reservation = this.props.reservation
    if (!reservation || this.props.reservation.status !== 'CANCELLED') return null
    return (
      <View style={styles.canceledBanner}>
        <Text style={styles.canceledTitle}>{literalsService.get('canceledReservation', true)}</Text>
        <Text style={styles.canceledCaption}>{literalsService.get('dueToProblemsCanceled', true)}</Text>
      </View>
    )
  }

  constructor(props: IProps) {
    super(props)
    this.state = { ...this.state, minHoursBeforeAction: null }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps): void {
    if (!nextProps.reservation) return
    const reservation = nextProps.reservation
    const minHoursBeforeAction = this.state.minHoursBeforeAction
    this.actions = [
      {
        value: 'cancelReservation',
        literal: literalsService.get('cancelReservation', true),
        hidden: isReservationPast(reservation, minHoursBeforeAction)
      },
      {
        value: 'edit',
        literal: literalsService.get('edit', true),
        hidden: isReservationPast(reservation, minHoursBeforeAction)
      },
      { value: 'repeat', literal: literalsService.get('repeat', true) }
    ]
  }

  public async componentDidMount(): Promise<void> {
    const id: number = this.props.navigation.state.params.id
    if (id == null) return // double equals compares undefined & null as the same so don't remove it
    this.props.dispatch(fetchReservationThunk(id))
    const minHoursBeforeAction = await paramsService.getMinHoursBeforeAction()
    this.setState({ minHoursBeforeAction })
  }

  public render(): React.ReactNode {
    const reservation = this.props.reservation
    const minHoursBeforeAction = this.state.minHoursBeforeAction
    if (!reservation || !minHoursBeforeAction) return this.spinner
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          onBackPress={this.handleBackPress}
          reversed={true}
          backIcon={'close'}
          actionIcon={'options'}
          onActionPress={reservation.status !== 'cancel' ? this.handleActionPress : null}
        >
          <LineNumber lineNumber={reservation.busLine.name} />
        </NavigationHeader>
        <View style={styles.mapContainer}>
          {this.canceledBanner}
          <Map line={reservation.busLine} disableCallouts={true} />
        </View>
        <ReservationDetailsView reservation={reservation} />
      </View>
    )
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private handleActionPress(): void {
    actionSheetService.show(this.actions, this.onActionPress)
  }

  @autobind
  private onActionPress(action: IActionSheet<any>): void {
    if (!action) return

    const [deleteAction, editAction, repeatAction] = this.actions
    if (action === deleteAction) this.handleCancelReservation()
    else if (action === editAction) this.handleEditReservation()
    else if (action === repeatAction) this.handleRepeatReservation()
  }

  private handleEditReservation() {
    const { dispatch, reservation } = this.props
    dispatch(new SetFieldsFromReservationAction(reservation))
    this.navigate(routes.newReservationConfirmationStep.routeName, { editMode: true })
  }

  private async handleCancelReservation() {
    try {
      await reservationService.deleteReservation(this.props.reservation.id)
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationDeleted', true) }
      })
    } catch (error) {
      this.reset(routes.reservations.routeName, 0, {
        notification: { label: literalsService.get('reservationNotDeleted', true), isError: true }
      })
    }
  }

  private handleRepeatReservation() {
    this.navigate(routes.reservationRepeat.routeName)
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    position: 'relative'
  },
  canceledBanner: {
    height: 96,
    width: Dimensions.get('window').width,
    backgroundColor: `${colors.pinkDark}90`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  canceledTitle: {
    ...textStyles.title,
    color: colors.white
  },
  canceledCaption: {
    ...textStyles.caption,
    color: colors.white
  }
})

const mapStateToProps = ({ reservations }: IStoreState) => ({
  reservation: reservations.pickedReservation
})

export default connect(mapStateToProps)(ReservationDetails)
