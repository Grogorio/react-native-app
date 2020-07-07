import { IActionThunk } from '../../models'
import { reservationService } from '../../services'
import {
  SetReservationsAction,
  SetReservationDetailAction,
  SetIsFetchingReservationsAction,
  SetPaginatedUpComingReservationsAction,
  SetPaginatedReservationsAction,
  SetPaginatedPastReservationsAction,
  SetIsFetchingPaginatedReservationsAction,
  SetDisabledRepeatDatesAction
} from '../actions'
import { sleep } from '../../utils'

export function fetchReservationsActionThunk(): IActionThunk {
  return async dispatch => {
    try {
      dispatch(new SetIsFetchingReservationsAction(true))
      const reservations = await reservationService.getReservations()
      dispatch(new SetReservationsAction(reservations))
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      throw error
    }
  }
}

export function fetchPaginatedReservationsActionThunk(page: number): IActionThunk {
  return async dispatch => {
    try {
      if (page > 0) dispatch(new SetIsFetchingPaginatedReservationsAction(true))
      const reservations = await reservationService.getPaginatedReservations(page)
      await sleep(1000)
      dispatch(new SetPaginatedReservationsAction(reservations))
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      throw error
    }
  }
}

export function fetchPaginatedUpComingPastReservationsActionThunk(page: number): IActionThunk {
  return async dispatch => {
    try {
      if (page > 0) dispatch(new SetIsFetchingPaginatedReservationsAction(true))
      const reservations = await reservationService.getUpComingPaginatedReservations(page)
      await sleep(1000)
      dispatch(new SetPaginatedUpComingReservationsAction(reservations))
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      throw error
    }
  }
}

export function fetchPaginatedPastReservationsActionThunk(page: number): IActionThunk {
  return async dispatch => {
    try {
      if (page > 0) dispatch(new SetIsFetchingPaginatedReservationsAction(true))
      const reservations = await reservationService.getPastPaginatedReservations(page)
      await sleep(1000)
      dispatch(new SetPaginatedPastReservationsAction(reservations))
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error)
      throw error
    }
  }
}

export function fetchReservationThunk(id: number): IActionThunk {
  return async dispatch => {
    const reservation = await reservationService.getReservation(id)
    dispatch(new SetReservationDetailAction(reservation))
  }
}

export function fetchDisabledRepeatDates(id: number): IActionThunk {
  return async dispatch => {
    try {
      const disabledRepeatDates = await reservationService.getDisabledRepeatDates(id)
      dispatch(new SetDisabledRepeatDatesAction(disabledRepeatDates))
    } catch (error) {
      dispatch(new SetDisabledRepeatDatesAction([]))
    }
  }
}
