import { IEnvironment } from '../models'

export const environment: IEnvironment = {
  aws: {
    Auth: {
      identityPoolId: 'eu-west-1_g6K0WSDnl',
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_g6K0WSDnl',
      userPoolWebClientId: '7jcundp9ft0cbem2mqfuo2rbkr'
    }
  },
  apiUrl: 'https://busademanda.ambmobilitat.cat/bod',
  reservationsPaginationSize: 10
}
