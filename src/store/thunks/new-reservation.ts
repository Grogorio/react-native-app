import { IActionThunk } from '../../models'
import { busLinesService, schedulesService, paramsService } from '../../services'
import {
  SetBusLinesAction,
  SetSchedulesAction,
  SetSchedulesErrorAction,
  SetCapacitiesAction,
  SetMaxReservableDateAction
} from '../actions'

export function fetchBusLinesActionThunk(): IActionThunk {
  return async dispatch => {
    const busLines = await busLinesService.getBusLines()
    dispatch(new SetBusLinesAction(busLines))
  }
}

export function fetchSchedulesActionThunk(busLineId: number, stopcode: number, date: string): IActionThunk {
  return async dispatch => {
    try {
      const schedules = await schedulesService.getSchedules(busLineId, stopcode, date)
      dispatch(new SetSchedulesAction(schedules))
    } catch (error) {
      dispatch(new SetSchedulesErrorAction(error))
    }
  }
}

export function fetchMaxReservableDate(): IActionThunk {
  return async dispatch => {
    const recurrence = await paramsService.getRecurrence()
    dispatch(new SetMaxReservableDateAction(recurrence))
  }
}

// export function postReservationActionThunk(reservation: IReservation): IActionThunk {
//   return async dispatch => {
//     try {
//       const postedReservation = await reservationService.postReservation(reservation)
//       dispatch(new SetPostedReservationAction(postedReservation))
//     } catch (error) {
//       // tslint:disable-next-line:no-console
//       console.log(error)
//     }
//   }
// }

// export function updateReservationActionThunk(id: number, reservation: IReservation): IActionThunk {
//   return async dispatch => {
//     try {
//       const updatedReservation = await reservationService.updateReservation(id, reservation)
//       dispatch(new SetPostedReservationAction(updatedReservation))
//     } catch (error) {
//       // tslint:disable-next-line:no-console
//       console.log(error)
//     }
//   }
// }

export function fetchCapacityActionThunk(
  scheduleId: number,
  stopCode: number,
  pickedSeats: number = 0,
  pickedPrmSeats: number = 0
): IActionThunk {
  return async dispatch => {
    try {
      const capacities = await schedulesService.getCapacity(scheduleId, stopCode)
      dispatch(new SetCapacitiesAction({
        capacity: capacities.capacity + pickedSeats,
        prmCapacity: capacities.prmCapacity + pickedPrmSeats
      }))
    } catch (error) {
      return
    }
  }
}
