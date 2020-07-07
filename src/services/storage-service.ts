import AsyncStorage from '@react-native-community/async-storage'
import { IValidatedInputField, IAuthenticationDetailsData } from '../models'

class StorageService {
  private prefix = '@BOD'
  private keys = {
    signUpEmail: `${this.prefix}:sign-up-email`,
    autoSignInValues: `${this.prefix}:auto-sign-in-values`
  }

  public setSignUpEmail(email: IValidatedInputField<string>): Promise<void> {
    return this.set(this.keys.signUpEmail, email)
  }

  public cleanSignUpEmail(): Promise<void> {
    return this.set(this.keys.signUpEmail, { value: null, isValid: false })
  }

  public getSignUpEmail(): Promise<IValidatedInputField<string>> {
    return this.get(this.keys.signUpEmail)
  }

  public setAutoSignInValues(autoSignInValues: IAuthenticationDetailsData): Promise<void> {
    return this.set(this.keys.autoSignInValues, autoSignInValues)
  }

  public cleanAutoSignInValues(): Promise<void> {
    return this.set(this.keys.autoSignInValues, { email: null, password: null })
  }

  public getAutoSignInValues(): Promise<IAuthenticationDetailsData> {
    return this.get(this.keys.autoSignInValues)
  }

  public async get<T = any>(key: string): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key)
      return JSON.parse(value)
    } catch (error) {
      // Error getting data
    }
  }

  public async set(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value ? JSON.stringify(value) : null)
    } catch (error) {
      // Error setting data
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (_error) {
      // error removing data
    }
  }
}

export default new StorageService()
