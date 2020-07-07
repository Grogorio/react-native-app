// TODO: REMOVE CONSOLE.LOGS ONCE THE FLOW IS FULLY TESTED
// tslint:disable:no-console

import React from 'react'
import FCM from 'react-native-fcm'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { routes } from '../navigation'
import { IStoreState } from '../store/states'
import { Screen, Image } from '../components'
import { checkSessionActionThunk, fetchPenaltiesActionThunk } from '../store/thunks'
import { registerAppListener, registerTokenRefreshListener } from '../notifications'
import { sleep } from '../utils'
import { View, Platform } from 'react-native'
import { globalStyles, colors } from '../styles'
import { authenticationService, userService } from '../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  isSessionChecked: boolean
  isUserSignedIn: boolean
  havePenalties: boolean
}

class Splash extends Screen<IProps> {
  private splashScreenShowtime = 4000

  public async componentDidMount() {
    const { dispatch, isSessionChecked, isUserSignedIn } = this.props
    if (isSessionChecked && isUserSignedIn) {
      await sleep(this.splashScreenShowtime)
      this.replace(routes.reservations.routeName)
    }
    registerTokenRefreshListener()
    await this.managePushNotifications()
    dispatch(checkSessionActionThunk())
  }

  public async UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const { dispatch, isSessionChecked, isUserSignedIn, havePenalties } = nextProps
    if (isSessionChecked && isUserSignedIn) {
      dispatch(fetchPenaltiesActionThunk())
      await sleep(this.splashScreenShowtime)
      await this.sendDeviceToken()
      if (havePenalties) this.reset(routes.penalties.routeName)
      else this.reset(routes.reservations.routeName)
    } else if (!isUserSignedIn) {
      await sleep(this.splashScreenShowtime)
      this.replace(routes.welcome.routeName)
    }
  }

  public render(): React.ReactNode {
    return (
      <View style={[globalStyles.screen, globalStyles.fullAlignedcontainer, { backgroundColor: colors.purple }]}>
        <Image name={'splash'} size={{ width: 282, height: 283 }} />
      </View>
    )
  }

  private async sendDeviceToken(): Promise<void> {
    const deviceToken = await authenticationService.getDeviceToken()
    await userService.sendDeviceToken(deviceToken)
  }

  private async managePushNotifications() {
    const { navigation } = this.props

    registerAppListener(navigation)

    try {
      await FCM.requestPermissions()
    } catch (error) {
      console.error('error', error)
    }

    if (Platform.OS === 'ios') {
      await FCM.getAPNSToken()
    }
  }
}

const mapStateToProps = ({ ui, penaltiesInfo }: IStoreState) => ({
  isSessionChecked: ui.isSessionChecked,
  isUserSignedIn: ui.isUserSignedIn,
  havePenalties: penaltiesInfo.reservations.length > 3
})

export default connect(mapStateToProps)(Splash)
