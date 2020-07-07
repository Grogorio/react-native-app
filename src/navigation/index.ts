import { Splash, SignIn, Penalties, Welcome, Information, NewPasswordRequired } from '../screens'
import { signUpRoutes } from './sign-up'
import { newReservationRoutes } from './new-reservation'
import { reservationsRoutes } from './reservations'
import { recoverPasswordRoutes } from './recover-password'
import { profileRoutes } from './profile'
import { StackNavigator } from 'react-navigation'

export const routes = {
  splash: {
    screen: Splash,
    routeName: 'splash'
  },
  welcome: {
    screen: Welcome,
    routeName: 'welcome'
  },
  signIn: {
    screen: SignIn,
    routeName: 'signIn'
  },
  penalties: {
    screen: Penalties,
    routeName: 'penalties'
  },
  information: {
    screen: Information,
    routeName: 'information'
  },
  newPasswordRequired: {
    screen: NewPasswordRequired,
    routeName: 'newPasswordRequired'
  },
  ...signUpRoutes,
  ...newReservationRoutes,
  ...reservationsRoutes,
  ...recoverPasswordRoutes,
  ...profileRoutes
}

// tslint:disable-next-line:variable-name
export const RootStack = StackNavigator(routes, {
  initialRouteName: routes.splash.routeName,
  headerMode: 'none'
})

export * from './sign-up'
