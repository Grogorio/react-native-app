import { IEnvironment } from '../models'

export const environment: IEnvironment = {
  aws: {
    Auth: {
      identityPoolId: 'eu-west-1_kh2g2BtIe',
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_kh2g2BtIe',
      userPoolWebClientId: '2fgc5bral5etnstpfr0chm5194'
    }
  },
  apiUrl: 'https://ambbod.pildo.com/bod',
  reservationsPaginationSize: 10
}
