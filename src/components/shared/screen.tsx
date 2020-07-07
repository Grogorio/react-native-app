import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { NavigationActions, NavigationScreenProps, NavigationParams } from 'react-navigation'
import { DispatchProp } from 'react-redux'
import { SetActiveRouteNameAction, SetConnectionStatusAction } from '../../store/actions'
import { globalStyles, osPaddingTop } from '../../styles'
import { Spinner } from './spinner'
import { verticalScale } from 'react-native-size-matters'
import { literalsService } from '../../services'
import { routes } from '../../navigation'

export interface IScreenState {
  isNavigatorReseting: boolean
  isConnected: boolean
}

interface IScreenIProps extends NavigationScreenProps, DispatchProp<any> {}

// tslint:disable-next-line:max-line-length
export abstract class Screen<P extends IScreenIProps, S extends IScreenState = IScreenState> extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      isNavigatorReseting: false,
      isConnected: true
    } as any
  }
  public UNSAFE_componentWillMount() {
    NetInfo.addEventListener(this.handleConnectivityChange)
  }

  protected reset(routeName: string, index: number = 0, params?: NavigationParams) {
    const { navigation, dispatch } = this.props
    navigation.dispatch(
      NavigationActions.reset({
        index,
        actions: [ NavigationActions.navigate({ routeName, params }) ]
      })
    )
    dispatch(new SetActiveRouteNameAction(routeName))
  }

  protected get screenParams(): any {
    const { navigation } = this.props
    return navigation.state.params || {}
  }

  protected get editMode(): boolean {
    return !!this.screenParams && this.screenParams.editMode
  }

  protected replace(routeName: string) {
    const { navigation, dispatch } = this.props
    navigation.replace(routeName)
    dispatch(new SetActiveRouteNameAction(routeName))
  }

  protected navigate(routeName: string, params?: NavigationParams) {
    const { navigation, dispatch } = this.props
    navigation.navigate(routeName, params)
    dispatch(new SetActiveRouteNameAction(routeName))
  }

  protected goBack() {
    const { dispatch, navigation } = this.props
    navigation.goBack()
    dispatch(new SetActiveRouteNameAction(''))
  }

  protected handleUserSignedIn(havePenalties: boolean): void {
    const routeName = havePenalties ? routes.penalties.routeName : routes.reservations.routeName
    // console.log(routeName)
    this.reset(routeName)
  }

  public get isRenderable() {
    return !this.state.isNavigatorReseting
  }

  public get spinner(): React.ReactNode {
    return (
      <View style={globalStyles.fullAlignedcontainer}>
        <Spinner />
      </View>
    )
  }

  public get connectionStatus(): React.ReactNode {
    return !this.state.isConnected && (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>{literalsService.get('noConnection')}</Text>
      </View>
    )
  }

  private handleConnectivityChange = (connectionInfo: any): void => {
    const { dispatch } = this.props
    this.setState({ isConnected: connectionInfo.type !== 'none' }, () => {
      dispatch(new SetConnectionStatusAction(this.state.isConnected))
    })
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: verticalScale(40),
    paddingTop: osPaddingTop,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width
  },
  offlineText: {
    color: '#fff'
  }
})
