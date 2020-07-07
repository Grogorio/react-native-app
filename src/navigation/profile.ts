import { Profile, ProfileChangeLanguage, ProfileChangePassword, ProfileUnsubscribe } from '../screens'

export const profileRoutes = {
  profile: {
    screen: Profile,
    routeName: 'profile'
  },
  profileChangeLanguage: {
    screen: ProfileChangeLanguage,
    routeName: 'profileChangeLanguage'
  },
  profileChangePassword: {
    screen: ProfileChangePassword,
    routeName: 'profileChangePassword'
  },
  profileUnsubscribe: {
    screen: ProfileUnsubscribe,
    routeName: 'profileUnsubscribe'
  }
}
