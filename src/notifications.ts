import { Platform, Alert } from 'react-native'
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm'
import { routes } from './navigation'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { literalsService, userService } from './services'

export function goToReservation(reservationId: number, navigation: NavigationScreenProp<NavigationRoute>) {
  setTimeout(() => {
    // console.log('Starting navigation to reservation', reservationId)
    navigation.navigate(routes.reservationDetails.routeName, { id: reservationId })
  }, 500)
}

export function registerTokenRefreshListener(): void {
  FCM.on(FCMEvent.RefreshToken, token => {
    userService.sendDeviceToken(token)
  })
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation: NavigationScreenProp<NavigationRoute>): void {
  // console.log('registering the app listeners', navigation)

  FCM.getInitialNotification().then(x => {
    // console.log('RECEIVED INITIAL notification', x)
    if (x && x.reservationId) goToReservation(x.reservationId, navigation)
  })

  FCM.on(FCMEvent.Notification, notif => {
    // console.log('Notification', notif)

    if (
      Platform.OS === 'ios' &&
      notif._notificationType === NotificationType.WillPresent &&
      !notif.local_notification
    ) {
      // this notification is only to decide if you want to show the notification when user is in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All)
      return
    }

    if (notif.opened_from_tray && notif.reservationId) {
      goToReservation(notif.reservationId, navigation)
    } else if (notif.reservationId) {
      setTimeout(() => {
        Alert.alert(
          notif.fcm.title,
          notif.fcm.body,
          [
            { text: literalsService.get('dismissNotification') },
            {
              text: literalsService.get('acceptNotification'),
              onPress: () => goToReservation(notif.reservationId, navigation)
            }
          ],
          { cancelable: false }
        )
      }, 500)
    }

    if (Platform.OS === 'ios') {
      // optional
      // iOS requires developers to call completionHandler to end notification process.
      // If you do not call it your background remote notifications could be throttled,
      // to read more about it see the above documentation link.
      // This library handles it for you automatically with default behavior
      // (for remote notification, finish with NoData; for WillPresent,
      // finish depend on "show_in_foreground").
      // However if you want to return different result, follow the following code to override
      // notif._notificationType is available for iOS platfrom
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData)
          // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break
        case NotificationType.NotificationResponse:
          notif.finish()
          break
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
          // this type of notificaiton will be called only when you are in foreground.
          // if it is a remote notification, don't do any app logic here.
          // Another notification callback will be triggered with type NotificationType.Remote
          break
      }
    }
  })
}
