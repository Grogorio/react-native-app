import { IUser } from '../../models'
import { Action } from './action'

export enum UserTypeKeys {
  SET_USER = 'USER_SET_USER'
}

export type UserActions = SetUserAction

export class SetUserAction extends Action<IUser> {
  public readonly type = UserTypeKeys.SET_USER
  constructor(public payload: IUser) {
    super()
  }
}
