import { IEnvironment } from '../models'

export const environment: IEnvironment = {
  aws: {
    Auth: {
      identityPoolId: 'eu-west-2_Nptyg1WxD',
      region: 'eu-west-2',
      userPoolId: 'eu-west-2_Nptyg1WxD',
      userPoolWebClientId: '1716ii2c69qv0rnv4fr0j2uk50'
    }
  },
  apiUrl: 'https://ambbod-dev.herokuapp.com',
  reservationsPaginationSize: 3
}
