import { combineReducers } from 'redux'
import user from './user'
import signIn from './sign-in'
import signUp from './sign-up'
import ui from './ui'
import newReservation from './new-reservation'
import reservations from './reservations'
import penaltiesInfo from './penalties-info'
import recoverPassword from './recover-password'
import profile from './profile'
import changePassword from './change-password'
import newPasswordRequired from './new-password-required'

const reducerObj: any = {
  user,
  signIn,
  signUp,
  ui,
  newReservation,
  reservations,
  penaltiesInfo,
  recoverPassword,
  profile,
  changePassword,
  newPasswordRequired
}

const reducer = combineReducers(reducerObj)

export default reducer
