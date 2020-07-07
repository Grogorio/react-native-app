import { ReservationsActions, ReservationsTypeKeys } from '../actions'
import { IReservationsState } from '../states'
import { setReservations, setReservation } from '../../models'

export const initialReservationsState: IReservationsState = {
  upComing: [],
  past: [],
  isFetchingReservations: false,
  isFetchingPaginatedReservations: false,
  pickedRepeatDates: []
}

const reservations = (
  state: IReservationsState = initialReservationsState,
  action: ReservationsActions
): IReservationsState => {
  switch (action.type) {
    case ReservationsTypeKeys.SET_RESERVATIONS:
      return {
        ...state,
        isFetchingReservations: false,
        past: setReservations(action.payload.past, true),
        upComing: setReservations(action.payload.upComing)
      }
    case ReservationsTypeKeys.SET_PAGINATED_RESERVATIONS:
      return {
        ...state,
        isFetchingReservations: false,
        isFetchingPaginatedReservations: false,
        past: setReservations(action.payload.past, true),
        upComing: setReservations(action.payload.upComing)
      }
    case ReservationsTypeKeys.SET_PAGINATED_PAST_RESERVATIONS:
      return {
        ...state,
        isFetchingReservations: false,
        isFetchingPaginatedReservations: false,
        past: [...state.past, ...setReservations(action.payload.past, true)]
      }
    case ReservationsTypeKeys.SET_PAGINATED_UPCOMING_RESERVATIONS:
      return {
        ...state,
        isFetchingReservations: false,
        isFetchingPaginatedReservations: false,
        upComing: [...state.upComing, ...setReservations(action.payload.upComing)]
      }
    case ReservationsTypeKeys.SET_RESERVATION_DETAIL:
      const pickedReservation = setReservation(action.payload)
      return { ...state, pickedReservation }
    case ReservationsTypeKeys.SET_IS_FETCHING_RESERVATIONS:
      return { ...state, isFetchingReservations: action.payload }
    case ReservationsTypeKeys.SET_IS_FETCHING_PAGINATED_RESERVATIONS:
      return { ...state, isFetchingPaginatedReservations: action.payload }
    case ReservationsTypeKeys.ADD_PICKED_REPEAT_DATES:
      return { ...state, pickedRepeatDates: [...state.pickedRepeatDates, action.payload] }
    case ReservationsTypeKeys.REMOVE_PICKED_REPEAT_DATES:
      return {
        ...state,
        pickedRepeatDates: state.pickedRepeatDates.filter(x => x.dateString !== action.payload.dateString)
      }
    case ReservationsTypeKeys.SET_DISABLED_REPEAT_DATES:
      return { ...state, disabledRepeatDates: action.payload }
    case ReservationsTypeKeys.RESET_RECURRENCE_VALUES:
      return { ...state, pickedRepeatDates: [], pickedReservation: null }
    default:
      return state
  }
}

export default reservations
