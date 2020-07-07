import { LocaleConfig } from '@valudio/react-native-calendars'
import { literals, calendarLiterals } from '../literals'
import { capitalize } from '../utils/utils'
import authenticationService from './authentication-service'

export type Language = keyof (typeof literals)
export type Literal = keyof (typeof literals.ca_ES)

class LiteralsService {
  private language: Language

  constructor() {
    this.initialize()
  }

  public get(key: Literal, capitalized: boolean = false): string {
    const res = this.getKey(key)
    return capitalized ? capitalize(res) : res
  }

  public looseGet(key: string, capitalized: boolean = false, isPlural: boolean = false): string {
    const looseKey: any = isPlural ? `${key}pl` : key
    const res = this.get(looseKey, capitalized)
    return isPlural && res === looseKey ? this.looseGet(key as any, capitalized) : res
  }

  public isLanguageActive(language: Language): boolean {
    return this.language === language
  }

  public setLanguage(language: Language): void {
    this.language = language
  }

  public getLanguage(): Language {
    return this.language
  }

  private async initialize(): Promise<void> {
    try {
      const userAttributes = await authenticationService.getUserAttributes()
      this.language = userAttributes.locale
    } catch (error) {
      this.language = 'ca_ES'
    }

    LocaleConfig.locales.ca_ES = calendarLiterals.ca_ES
    LocaleConfig.locales.es_ES = calendarLiterals.es_ES
  }

  private getKey(key: Literal): string {
    const localized = literals[this.language]
    if (localized && localized[key]) return localized[key]
    return literals.ca_ES[key] || key
  }
}

export default new LiteralsService()
