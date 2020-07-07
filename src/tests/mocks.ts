import { IStoreState, INewReservationState } from '../store/states'
import {
  IUser,
  IAWSError,
  IValidatedInputField,
  IBusLine,
  ISchedule,
  ICalendarDay,
  IBusStop,
  ILatLng,
  BusLineDirection,
  IReservation,
  IPenaltiesInfo,
  IReservationStatus
} from '../models'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'

export function getUser(id: string = 'test'): IUser {
  return {
    email: `${id}@testing.com`,
    name: `${id}`,
    lastName: `testing`,
    dni: `12312312T`,
    telephone: `+34123123123`,
    password: `pwd-${id}`,
    locale: 'ca_ES'
  }
}

export const errorMock: IAWSError = {
  code: 'UsernameExistsException',
  message: 'testing error',
  name: 'testing error'
}

export function getField(value = 'test', isValid = false): IValidatedInputField<string> {
  return { value, isValid }
}

export const storeMock: IStoreState = {
  newPasswordRequired: {
    password: {
      value: getUser().password,
      isValid: true
    },
    validationPassword: {
      value: getUser().password,
      isValid: true
    },
    cognitoUser: null
  },
  signIn: {
    email: {
      value: getUser().email,
      isValid: true
    },
    password: {
      value: getUser().password,
      isValid: true
    },
    error: null,
    isNewPasswordRequired: false
  },
  signUp: {
    email: {
      value: null,
      isValid: false
    },
    password: {
      value: null,
      isValid: false
    },
    validationPassword: {
      value: null,
      isValid: false
    },
    name: {
      value: null,
      isValid: false
    },
    lastName: {
      value: null,
      isValid: false
    },
    dni: {
      value: null,
      isValid: false
    },
    municipality: {
      value: null,
      isValid: false
    },
    telephone: {
      value: null,
      isValid: false
    },
    isSignedUpSuccesfully: false,
    error: errorMock,
    verificationCode: null,
    verificationError: null,
    isAccountVerified: false,
    newVerificationCodeNif: {
      value: null,
      isValid: false
    },
    newVerificationCodeError: null,
    isNewVerificationCodeSent: false
  },
  user: getUser(),
  ui: {
    isSessionChecked: false,
    isUserSignedIn: false,
    isMenuVisible: false,
    activeRouteName: 'reservations',
    maxReservableDate: null,
    isConnected: false
  },
  newReservation: {
    busLines: [],
    pickedBusLine: null,
    pickedOriginBusStop: null,
    pickedDestinationBusStop: null,
    pickedDate: null,
    pickedSchedule: null,
    schedules: [],
    schedulesError: null,
    pickedPrmSeats: 0,
    pickedSeats: 0,
    capacity: 0,
    prmCapacity: 0
  },
  reservations: {
    upComing: [getReservation(), getReservation(), getReservation()],
    past: [getReservation(), getReservation()],
    isFetchingReservations: false,
    isFetchingPaginatedReservations: false
  },
  penaltiesInfo: getPenaltyInfo(),
  recoverPassword: {
    dni: {
      value: null,
      isValid: false
    },
    newPassword: {
      value: null,
      isValid: false
    },
    validationNewPassword: {
      value: null,
      isValid: false
    },
    code: {
      value: null,
      isValid: false
    },
    isCodeSent: false,
    isPasswordRecovered: false,
    error: null
  },
  profile: {
    email: {
      value: null,
      isValid: false
    },
    name: {
      value: null,
      isValid: false
    },
    lastName: {
      value: null,
      isValid: false
    },
    telephone: {
      value: null,
      isValid: false
    },
    dni: {
      value: null,
      isValid: false
    }
  },
  changePassword: {
    password: {
      value: null,
      isValid: false
    },
    newPassword: {
      value: null,
      isValid: false
    },
    error: null
  }
}
export function getCognitoUserAttributes(): CognitoUserAttribute[] {
  return [
    new CognitoUserAttribute({ Name: 'family_name', Value: 'Perkins' }),
    new CognitoUserAttribute({ Name: 'name', Value: 'Anthony' }),
    new CognitoUserAttribute({ Name: 'custom:municipality', Value: 'Barcelona' }),
    new CognitoUserAttribute({ Name: 'phone_number', Value: '123456789' }),
    new CognitoUserAttribute({ Name: 'custom:dni_nie', Value: '36000000P' }),
    new CognitoUserAttribute({ Name: 'locale', Value: 'ca_ES' }),
    new CognitoUserAttribute({ Name: 'email', Value: 'perkins@i.am' })
  ]
}

export function getSchedule(): ISchedule {
  const busLine = getBusLine()
  return {
    id: 1,
    date: '2018-04-30',
    time: '12:00:00',
    realTime: '12:00:00',
    expedition: '12:00:00',
    stop: busLine.forthStops[0],
    busLine,
    availability: true
  }
}

export function getCalendarDay(): ICalendarDay {
  return {
    dateString: '2018-03-10T12:00:00',
    day: 10,
    month: 3,
    year: 2018,
    timestamp: 13712123019
  }
}

export function getNewReservationState(): INewReservationState {
  return {
    busLines: [getBusLine()],
    pickedBusLine: null,
    pickedOriginBusStop: null,
    pickedDestinationBusStop: null,
    pickedDate: null,
    pickedSchedule: null,
    schedules: [],
    schedulesError: null,
    pickedSeats: 0,
    pickedPrmSeats: 0,
    capacity: 0,
    prmCapacity: 0
  }
}

export function getBusLine(): IBusLine {
  const forthStops: IBusStop[] = [
    {
      code: 1,
      name: 'Ajuntament',
      location: { longitude: 2.1539315208792686, latitude: 41.38564762251987 }
    },
    {
      code: 2,
      name: 'Poliesportiu',
      location: { longitude: 2.155695408582687, latitude: 41.386980571601036 }
    },
    {
      code: 3,
      name: 'Can Mercader',
      location: { longitude: 2.15887650847435, latitude: 41.38936466865081 }
    },
    {
      code: 4,
      name: 'Aragó',
      location: { longitude: 2.1617689356207848, latitude: 41.3915278378438 }
    },
    {
      code: 5,
      name: 'Diputació',
      location: { longitude: 2.16717928647995, latitude: 41.396078307167116 }
    },
    {
      code: 6,
      name: 'Casanova',
      location: { longitude: 2.164277471601963, latitude: 41.39514394262305 }
    },
    {
      code: 7,
      name: 'Urgell',
      location: { longitude: 2.1613317355513573, latitude: 41.39292153465815 }
    },
    {
      code: 8,
      name: 'Balmes',
      location: { longitude: 2.153937555849552, latitude: 41.38733851873804 }
    }
  ]
  const forthRoute: ILatLng[] = [
    { longitude: 2.1539315208792686, latitude: 41.38564762251987 },
    { longitude: 2.155695408582687, latitude: 41.386980571601036 },
    { longitude: 2.15887650847435, latitude: 41.38936466865081 },
    { longitude: 2.1617689356207848, latitude: 41.3915278378438 },
    { longitude: 2.167491428554058, latitude: 41.39582428206599 },
    { longitude: 2.16717928647995, latitude: 41.396078307167116 },
    { longitude: 2.1663642302155495, latitude: 41.39669777213742 },
    { longitude: 2.164277471601963, latitude: 41.39514394262305 },
    { longitude: 2.1613317355513573, latitude: 41.39292153465815 },
    { longitude: 2.153937555849552, latitude: 41.38733851873804 }
  ]
  const busline: IBusLine = {
    id: 325,
    name: 'L2',
    town: 'Barcelona',
    forthStops,
    forthRoute,
    backStops: forthStops
      .concat()
      .reverse()
      .map(x => ({ ...x, code: x.code * 10 })),
    backRoute: forthRoute.concat().reverse(),
    forthRegion: {
      longitude: 2.160860002040863,
      latitude: 41.39175949390562,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025
    },
    backRegion: {
      longitude: 2.160860002040863,
      latitude: 41.39175949390562,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025
    },
    direction: BusLineDirection.forward,
    description: 'Poliesportiu - Tu casa'
  }
  return busline
}

export function getReservation(status?: IReservationStatus): IReservation {
  const busLine = getBusLine()
  const schedule = getSchedule()
  return {
    busLineId: busLine.id,
    direction: 0,
    busLine,
    date: schedule.date,
    originStopCode: busLine.forthStops[2].code,
    destinationStopCode: busLine.forthStops[5].code,
    period: [1, 4, 6],
    time: schedule.time,
    id: Math.round(Math.random() * 1000),
    status: status || 'active',
    prmSeats: 0,
    seats: 0
  }
}

export function getPenaltyInfo(): IPenaltiesInfo {
  return {
    amount: 1,
    reservations: [getReservation()],
    expiration: '2018-03-10',
    isLoading: false
  }
}
