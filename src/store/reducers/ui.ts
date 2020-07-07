import { UIActions, UITypeKeys, UserActions, UserTypeKeys } from '../actions'
import { IUIState } from '../states'
import { routes } from '../../navigation'
import { addDaysToDate, dateToYYYYMMDD } from '../../utils'

export const initialUIState: IUIState = {
  isSessionChecked: false,
  isUserSignedIn: false,
  isMenuVisible: false,
  activeRouteName: routes.reservations.routeName,
  maxReservableDate: null,
  isConnected: true
}

const ui = (state: IUIState = initialUIState, action: UIActions | UserActions): IUIState => {
  switch (action.type) {
    case UITypeKeys.SET_IS_SESSION_CHECKED:
      return { ...state, isSessionChecked: action.payload }
    case UITypeKeys.SET_IS_USER_SIGNED_IN:
      return { ...state, isUserSignedIn: action.payload }
    case UserTypeKeys.SET_USER:
      return { ...state, isUserSignedIn: !!action.payload }
    case UITypeKeys.SET_SESSION_CHECKS:
      return { ...state, ...action.payload }
    case UITypeKeys.RESET_SESSION:
      return {
        ...state,
        isUserSignedIn: false,
        isSessionChecked: false,
        isMenuVisible: false
      }
    case UITypeKeys.TOGGLE_IS_MENU_VISIBLE:
      return { ...state, isMenuVisible: !state.isMenuVisible }
    case UITypeKeys.SET_ACTIVE_ROUTE_NAME:
      return { ...state, activeRouteName: action.payload }
    case UITypeKeys.SET_MAX_RESERVABLE_DATE:
      const max = addDaysToDate(new Date().valueOf(), action.payload)
      return { ...state, maxReservableDate: dateToYYYYMMDD(max) }
    case UITypeKeys.SET_CONNECTION_STATUS:
      return { ...state, isConnected: action.payload }
    default:
      return state
  }
}

export default ui
