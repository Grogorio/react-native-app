import { IUserState } from './user'
import { ISignInState } from './sign-in'
import { ISignUpState } from './sign-up'
import { IUIState } from './ui'
import { INewReservationState } from './new-reservation'
import { IReservationsState } from './reservations'
import { IPenaltiesState } from './penalties'
import { IRecoverPasswordState } from './recover-password'
import { IProfileState } from './profile'
import { IChangePasswordState } from './change-password'
import { INewPasswordRequiredState } from './new-password-required'

export interface IStoreState {
  user: IUserState
  signIn: ISignInState
  signUp: ISignUpState
  ui: IUIState
  newReservation: INewReservationState
  reservations: IReservationsState
  penaltiesInfo: IPenaltiesState
  recoverPassword: IRecoverPasswordState
  profile: IProfileState
  changePassword: IChangePasswordState
  newPasswordRequired: INewPasswordRequiredState
}

export * from './user'
export * from './sign-in'
export * from './sign-up'
export * from './ui'
export * from './new-reservation'
export * from './reservations'
export * from './penalties'
export * from './recover-password'
export * from './profile'
export * from './change-password'
export * from './new-password-required'
