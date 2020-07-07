import React from 'react'
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
  AppState,
  AppStateStatus,
  BackHandler,
  Alert
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters'
import { IStoreState } from '../../store/states'
import { routes } from '../../navigation'
import { IUser, IReservation, ITabOption, IPenaltiesInfo, INotification } from '../../models'
import {
  fetchPaginatedReservationsActionThunk,
  fetchPaginatedUpComingPastReservationsActionThunk,
  fetchPaginatedPastReservationsActionThunk,
  fetchPenaltiesActionThunk
} from '../../store/thunks'
import {
  Screen,
  ReservationCard,
  Image,
  Tabs,
  MenuView,
  IScreenState,
  HowToRepeatModal,
  TouchableHighlightDisable
} from '../../components'
import { globalStyles, colors, textStyles } from '../../styles'
import { NavigationHeader, Menu } from '../../containers'
import { literalsService, userService } from '../../services'
import { environment } from '../../environments'
import { SetIsFetchingReservationsAction } from '../../store/actions'

interface IScreenParams {
  reservationId: number
  notification: INotification
}

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  user: IUser
  upcomingReservations: IReservation[]
  pastReservations: IReservation[]
  isMenuVisible: boolean
  isFetchingReservations: boolean
  isFetchingPaginatedReservations: boolean
  penaltiesInfo: IPenaltiesInfo
}

interface IState extends IScreenState {
  page: number
  shouldShowRepeatModal: boolean
}

class Reservations extends Screen<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { ...super.state, page: 0, shouldShowRepeatModal: false }
  }

  public async componentDidMount(): Promise<void> {
    Keyboard.dismiss()
    this.initialize()
    this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress)
    })
    this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBackPress)
    })
  }

  public componentWillUnmount(): void {
    super.UNSAFE_componentWillMount()
    AppState.removeEventListener('change', this.handleAppStateStatus)
  }

  public async UNSAFE_componentWillReceiveProps(nextProps: IProps): Promise<void> {
    if (!nextProps.user) this.reset(routes.welcome.routeName)
  }

  private get tabOptions(): ITabOption[] {
    const { pastReservations, upcomingReservations } = this.props
    return [
      {
        key: 'next-reservation',
        content: this.renderReservations(upcomingReservations),
        title: literalsService.get('nextReservations'),
        onScrollBottom: this.handleUpComingScrollBottom
      },
      {
        key: 'past-reservation',
        content: this.renderReservations(pastReservations),
        title: literalsService.get('pastReservations'),
        onScrollBottom: this.handlePastScrollBottom
      }
    ]
  }

  private get isUserPenalized(): boolean {
    const penaltiesInfo = this.props.penaltiesInfo
    return penaltiesInfo && !!penaltiesInfo.amount
  }

  private get newReservationButtonStyle(): StyleProp<ViewStyle> {
    if (this.isUserPenalized) return [styles.newReservationButton, { opacity: 0.5 }]
    return styles.newReservationButton
  }

  public render(): React.ReactNode {
    if (!this.isRenderable) return null
    const { isFetchingPaginatedReservations, navigation, isMenuVisible } = this.props
    const { isConnected } = this.state
    const tabOptions = this.tabOptions
    return (
      <MenuView isMenuVisible={isMenuVisible}>
        <Menu navigation={navigation} />
        <View style={globalStyles.greyScreen}>
          {this.connectionStatus}
          <NavigationHeader actionIcon="faceHappyWhite" onActionPress={this.goToPenalties} />
          <HowToRepeatModal
            isVisible={this.state.shouldShowRepeatModal}
            onPress={this.handleHowToRepeatModalPress}
            onClose={this.handleHowToRepeatModalClose}
          />
          <Tabs
            options={tabOptions}
            defaultOption={tabOptions[0]}
            isLoading={isFetchingPaginatedReservations}
            notification={this.screenParams.notification}
            resetScreenParams={this.resetScreenParams}
            refreshScrollView={this.refreshScrollView}
          />
          <TouchableHighlightDisable
            style={this.newReservationButtonStyle}
            onPress={this.goToNewReservation}
            underlayColor={colors.orange}
            disabled={this.isUserPenalized || !isConnected}
          >
            <View style={styles.newReservationButtonContainer}>
              <Image name="plusWhite" style={styles.newReservationButtonImage} size={{ width: 20, height: 20 }} />
              <Text style={styles.newReservationButtonText}>{literalsService.get('newReservation').toUpperCase()}</Text>
            </View>
          </TouchableHighlightDisable>
        </View>
      </MenuView>
    )
  }

  private async initialize(): Promise<void> {
    const dispatch = this.props.dispatch
    AppState.addEventListener('change', this.handleAppStateStatus)
    dispatch(new SetIsFetchingReservationsAction(true))
    dispatch(fetchPaginatedReservationsActionThunk(this.state.page))
    dispatch(fetchPenaltiesActionThunk())
    await this.defineIsUserExperienced()
  }

  private async defineIsUserExperienced(): Promise<void> {
    const isUserExperienced = await userService.getIsUserExperienced()
    const reservationId = (this.screenParams as IScreenParams).reservationId
    this.setState({ shouldShowRepeatModal: !isUserExperienced && !!reservationId })
  }

  private renderReservations(reservations: IReservation[]): React.ReactNode {
    const { isFetchingReservations } = this.props
    if (isFetchingReservations) return this.spinner
    else if (reservations.length)
      return reservations.map((r, i) => <ReservationCard key={i} reservation={r} onPress={this.goToReservation} />)
    return (
      <View style={styles.noReservationsContainer}>
        <Image style={styles.noReservationsImage} name={'busStop'} size={{ width: 184, height: 108 }} />
        <Text style={styles.noReservationsTitle}>{literalsService.get('noReservations')}</Text>
        <Text style={styles.noReservationsDescription}>{literalsService.get('startUsing')}</Text>
      </View>
    )
  }

  @autobind
  private handleAppStateStatus(status: AppStateStatus): void {
    const dispatch = this.props.dispatch
    if (status === 'active') {
      dispatch(new SetIsFetchingReservationsAction(true))
      dispatch(fetchPaginatedReservationsActionThunk(this.state.page))
    } else {
      this.setState({ page: 0 })
    }
  }

  @autobind
  private handleHardwareBackPress(): boolean {
    Alert.alert(
      null,
      literalsService.get('sureExit', true),
      [
        {
          text: literalsService.get('cancel', true),
          style: 'cancel'
        },
        {
          text: literalsService.get('yes', true),
          onPress: () => BackHandler.exitApp()
        }
      ],
      { cancelable: false }
    )
    return true
  }

  @autobind
  private resetScreenParams(): void {
    this.props.navigation.setParams({ notification: null })
  }

  @autobind
  private goToPenalties() {
    this.navigate(routes.penalties.routeName)
    AppState.removeEventListener('change', this.handleAppStateStatus)
  }

  @autobind
  private goToNewReservation() {
    this.navigate(routes.newReservationBusLineStep.routeName)
  }

  @autobind
  private goToReservation(reservation: IReservation) {
    this.navigate(routes.reservationDetails.routeName, { id: reservation.id })
  }

  @autobind
  private handleHowToRepeatModalPress() {
    this.setState({ shouldShowRepeatModal: false })
    const reservationId = (this.screenParams as IScreenParams).reservationId
    this.navigate(routes.reservationDetails.routeName, { id: reservationId })
  }

  @autobind
  private handleHowToRepeatModalClose() {
    this.setState({ shouldShowRepeatModal: false })
  }

  @autobind
  private handleUpComingScrollBottom(): void {
    const { page } = this.state
    const { upcomingReservations } = this.props
    const nextPage = page + 1
    if (
      upcomingReservations.length < environment.reservationsPaginationSize ||
      upcomingReservations.length < nextPage * environment.reservationsPaginationSize
    )
      return

    this.props.dispatch(fetchPaginatedUpComingPastReservationsActionThunk(nextPage))
    this.setState({ page: nextPage })
  }

  @autobind
  private handlePastScrollBottom(): void {
    const { page } = this.state
    const { pastReservations } = this.props
    const nextPage = page + 1
    if (
      pastReservations.length < environment.reservationsPaginationSize ||
      pastReservations.length < nextPage * environment.reservationsPaginationSize
    )
      return

    this.props.dispatch(fetchPaginatedPastReservationsActionThunk(nextPage))
    this.setState({ page: nextPage })
  }

  @autobind
  private refreshScrollView(): void {
    const { dispatch } = this.props
    this.setState({ page: 0 }, () => {
      dispatch(fetchPaginatedReservationsActionThunk(this.state.page))
    })
  }
}

const styles = StyleSheet.create({
  newReservationButton: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: colors.purple,
    height: verticalScale(44),
    bottom: verticalScale(20),
    width: 'auto',
    borderRadius: verticalScale(44),
    alignItems: 'center',
    paddingHorizontal: scale(20),
    zIndex: 2000,
    elevation: 2000
  },
  newReservationButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  newReservationButtonText: {
    ...textStyles.button,
    color: colors.white
  },
  newReservationButtonImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: scale(12)
  },
  noReservationsContainer: {
    flex: 1,
    backgroundColor: colors.greyLight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noReservationsImage: {
    marginBottom: verticalScale(40)
  },
  noReservationsTitle: {
    ...textStyles.title,
    color: colors.greyDark,
    marginBottom: verticalScale(10)
  },
  noReservationsDescription: {
    ...textStyles.body,
    color: colors.greyDark,
    width: Dimensions.get('window').width - scale(60),
    textAlign: 'center'
  }
})

const mapStateToProps = ({ user, reservations, ui, penaltiesInfo }: IStoreState) => ({
  user,
  penaltiesInfo,
  upcomingReservations: reservations.upComing,
  pastReservations: reservations.past,
  isFetchingReservations: reservations.isFetchingReservations,
  isFetchingPaginatedReservations: reservations.isFetchingPaginatedReservations,
  isMenuVisible: ui.isMenuVisible
})

export default connect(mapStateToProps)(Reservations)
