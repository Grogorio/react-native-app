import { Platform } from 'react-native'
import literalsService from '../services/literals-service'
import { IPeriod, IReservation } from '../models'
import {
  differenceInDays,
  differenceInMilliseconds,
  format,
  addDays,
  isToday,
  isTomorrow,
  isPast,
  subHours
} from 'date-fns'

export function isEmailValid(email: string): boolean {
  const regExp = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+[.][a-zA-Z]{2,3}')
  return regExp.test(email)
}

export function isPasswordValid(password: string): boolean {
  const regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W])(?=.{8,})')
  return regExp.test(password)
}

export function isTextValid(text: string): boolean {
  const regExp = new RegExp('^[a-zA-ZáàäéèëíìïóòöúùüÁÀÄÉÈËIÍÌÏÓÒÖÚÙÜñçÑÇ ]{3,}$')
  return regExp.test(text)
}

export function isTelephoneValid(telephone: string): boolean {
  const regExp = new RegExp('^(\\+?[0-9]{1,3})?[0-9]{9}$')
  return regExp.test(telephone)
}

export function isDniValid(dni: string): boolean {
  const nifRegExp = new RegExp('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$')
  const nieRegExp = new RegExp('^[XYZxyz][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$')
  return nifRegExp.test(dni) || nieRegExp.test(dni)
}

export function isVerificationCodeValid(code: string): boolean {
  const regExp = new RegExp('^[0-9]{6}$')
  return regExp.test(code)
}

export function hasTelephonePrefix(telephone: string): boolean {
  const regExp = new RegExp('^\\+[0-9]{2,2}')
  return regExp.test(telephone)
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function dateToYYYYMMDD(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function HHMMSStoHHMM(time: string): string {
  return time.substring(0, time.length - 3)
}

export function isIOS(): boolean {
  return Platform.OS === 'ios'
}

export function addOrRemoveDuplicatedValues(array: any[], value: any): any[] {
  const result: any[] = []
  const arr = [value, ...array]
  arr.forEach(v => {
    const index = result.indexOf(v)
    if (index < 0) return result.push(v)
    result.splice(index, 1)
  })
  return result
}

export function toLocaleDateString(isoDate: string): string {
  if (!/\d{4}-\d{2}-\d{2}/.test(isoDate)) return null
  const date = new Date(isoDate)
  const day = literalsService.looseGet(`day${date.getDay()}`)
  const month = literalsService.looseGet(`month${date.getMonth()}`)
  return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`
}

export function noMilli(time: string): string {
  if (!/.{1,2}:.{1,2}:/.test(time)) return time
  return time
    .split(':')
    .slice(0, 2)
    .join(':')
}

export function periodToText(period: IPeriod): string {
  if (!period || !period.length) return null
  const len = period.length
  const days = period.reduce((acc, curr, i) => {
    const name = literalsService.looseGet(`day${curr}`, false, true).toLowerCase()
    let next: string
    if (i === 0) {
      next = `${name}`
    } else if (i === len - 1) {
      next = `${literalsService.get('and')} ${name}`
    } else {
      next = `, ${name}`
    }
    return `${acc} ${next}`
  }, '')
  return `${literalsService.get('period1')} ${days} ${literalsService.get('period2')}`
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function daysFromToday(date: string): number {
  const left = new Date(date)
  const right = new Date()
  return differenceInDays(left, right)
}

export function milisecondsFromNow(date: string): number {
  const left = new Date(date)
  const right = new Date()
  return differenceInMilliseconds(left, right)
}

export function formatDate(date: string | number, form: string): string {
  return format(new Date(date), form)
}

export function addDaysToDate(date: string | number, amount: number): Date {
  return addDays(date, amount)
}

export function dateToFormat(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const difference = differenceInDays(today, date)

  if (isToday(date)) return literalsService.get('today', true)
  else if (isTomorrow(date)) return literalsService.get('tomorrow', true)
  // tslint:disable-next-line:max-line-length
  else if (isPast(date) && difference <= 6) return `${literalsService.get('ago', true)} ${difference} ${literalsService.get('days', false)}`
  return toLocaleDateString(dateString)
}

export function isReservationPast(reservation: IReservation, subHoursAmount: number = 0): boolean {
  const date = subHours(`${reservation.date} ${reservation.time}`, subHoursAmount)
  return isPast(date)
}

export function sanitizeTelephone(telephone: string): string {
  return telephone && !hasTelephonePrefix(telephone)
    ? `+34${telephone}`
    : telephone || ''
}
