import { BaseHttpService } from './base-http-service'
import { isIOS } from '../../utils'

class UserService extends BaseHttpService {
  public async sendDeviceToken(deviceToken: string): Promise<any> {
    return this.patch('users/me', { deviceToken, deviceType: isIOS() ? 'ios' : 'android' })
  }

  public async getIsUserExperienced(): Promise<boolean> {
    return this.get('users/me/experienced')
  }

  public async verifyEmail(): Promise<void> {
    return this.patch('users/me/verify', null)
  }

  public async checkIsDniUsed(dni: string): Promise<boolean> {
    return this.get(`users/check?dni=${dni.toUpperCase()}`)
  }

  public async checkIsEmailUsed(email: string): Promise<boolean> {
    return this.get(`users/check?email=${email}`)
  }

  public async deleteUser(reason: string): Promise<void> {
    return this.delete(`users/me?reason=${reason}`)
  }
}

export default new UserService()
