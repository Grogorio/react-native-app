import { IValidatedInputField } from '../../models'
import { Action } from './action'

// tslint:disable:max-classes-per-file

export enum ProfileTypeKeys {
  SET_NAME_FIELD = 'PROFILE_SET_NAME_FIELD',
  SET_LASTNAME_FIELD = 'PROFILE_SET_LASTNAME_FIELD',
  SET_EMAIL_FIELD = 'PROFILE_SET_EMAIL_FIELD',
  SET_DNI_FIELD = 'PROFILE_SET_DNI_FIELD',
  SET_MUNICIPALITY_FIELD = 'PROFILE_SET_MUNICIPALITY_FIELD',
  SET_TELEPHONE_FIELD = 'PROFILE_SET_TELEPHONE_FIELD',
  RESET_FIELDS = 'PROFILE_RESET_FIELDS'
}

export type ProfileActions =
  | SetProfileNameFieldAction
  | SetProfileLastNameFieldAction
  | SetProfileEmailFieldAction
  | SetProfileDniFieldAction
  | SetProfileMunicipalityFieldAction
  | SetProfileTelephoneFieldAction
  | ResetProfileFieldsAction

export class SetProfileNameFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_NAME_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetProfileLastNameFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_LASTNAME_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetProfileEmailFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_EMAIL_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetProfileDniFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_DNI_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetProfileMunicipalityFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_MUNICIPALITY_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class SetProfileTelephoneFieldAction extends Action<IValidatedInputField<string>> {
  public readonly type = ProfileTypeKeys.SET_TELEPHONE_FIELD
  constructor(public payload: IValidatedInputField<string>) {
    super()
  }
}

export class ResetProfileFieldsAction extends Action<void> {
  public readonly type = ProfileTypeKeys.RESET_FIELDS
}
