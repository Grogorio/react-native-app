import { IAuthenticationConfiguration } from './aws'

export interface IEnvironment {
  aws: {
    Auth: IAuthenticationConfiguration
  }
  apiUrl: string
  reservationsPaginationSize: number
}
