import reducer, { initialNewReservationState } from './new-reservation'
import { INewReservationState } from '../states'
import {
  SetPickedBusLineAction,
  SetPickedBusStopAction,
  SetBusLinesAction,
  ResetNewReservationValuesAction,
  SetPickedDateAction,
  SetSchedulesAction,
  SetPickedScheduleAction,
  TogglePickedBusLineDirectionAction
} from '../actions'
import { getNewReservationState, getCalendarDay, getSchedule } from '../../tests'
import { BusLineDirection, isLatLngEqual } from '../../models'

describe('new-reservations reducer', () => {
  let state: INewReservationState

  beforeEach(() => {
    state = getNewReservationState()
  })

  describe('when not passing parameters', () => {
    it('should return the initial state', () => {
      const action: any = { type: 'fake' }
      const newState = reducer(undefined, action)
      expect(newState === initialNewReservationState).toBeTruthy()
    })
  })

  describe('when reseting', () => {
    it('should return the initial state', () => {
      const action = new ResetNewReservationValuesAction()
      const newState = reducer(state, action)
      expect(newState === initialNewReservationState).toBeTruthy()
    })
  })

  describe('when setting the buslines', () => {
    it('should set it into the state', () => {
      const busLines = state.busLines
      state.busLines = null
      const action = new SetBusLinesAction(busLines)
      const newState = reducer(state, action)
      expect(newState.busLines === busLines).toBeTruthy()
    })
  })

  describe('when toggling the selected busline direction', () => {
    it('should change the direction to back if previous was forward', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      const action = new TogglePickedBusLineDirectionAction()
      state = reducer(state, action)
      expect(state.pickedBusLine.direction).toEqual(BusLineDirection.back)
    })

    it('should the change the direction to forward if previous was back', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      state.pickedBusLine.direction = BusLineDirection.back
      const action = new TogglePickedBusLineDirectionAction()
      state = reducer(state, action)
      expect(state.pickedBusLine.direction).toEqual(BusLineDirection.forward)
    })

    it('should set pickedOriginBusStop to null', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      state.pickedOriginBusStop = state.busLines[0].forthStops[0]
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toBeNull()
    })

    it('should set pickedDestinationBusStop to null', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      state.pickedDestinationBusStop = state.busLines[0].forthStops[3]
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedDestinationBusStop } = reducer(state, action)
      expect(pickedDestinationBusStop).toBeNull()
    })

    it('should reset the pathStops.length if it is set', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[1]))
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[4]))
      expect(state.pickedBusLine.pathStops.length).toEqual(4)
      const action = new TogglePickedBusLineDirectionAction()
      state = reducer(state, action)
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })

    it('should reset all stops if previous direction was forward', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      state.pickedBusLine.forthStops[1] = {
        ...state.pickedBusLine.forthStops[1],
        isOrigin: true,
        isSelected: true,
        isDisabled: false
      }
      state.pickedBusLine.forthStops[0].isDisabled = true
      const action = new TogglePickedBusLineDirectionAction()
      state = reducer(state, action)
      const allReset = state.pickedBusLine.forthStops.every(
        x => !x.isDisabled && !x.isSelected && !x.isDestination && !x.isOrigin
      )
      expect(allReset).toBeTruthy()
    })

    it('should reset all backStops if previous direction was back', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      state.pickedBusLine.direction = BusLineDirection.back
      state.pickedBusLine.backStops[1] = {
        ...state.pickedBusLine.backStops[1],
        isOrigin: true,
        isSelected: true,
        isDisabled: false
      }
      state.pickedBusLine.backStops[0].isDisabled = true
      const action = new TogglePickedBusLineDirectionAction()
      state = reducer(state, action)
      const allReset = state.pickedBusLine.backStops.every(
        x => !x.isDisabled && !x.isSelected && !x.isDestination && !x.isOrigin
      )
      expect(allReset).toBeTruthy()
    })

    it('should disable the last backStop if previous direction was forward', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.backStops[line.backStops.length - 1].isDisabled).toBeTruthy()
    })

    it('should disable the last stop if previous direction was back', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      state.pickedBusLine.direction = BusLineDirection.back
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.forthStops[line.forthStops.length - 1].isDisabled).toBeTruthy()
    })

    it('should set drawStops to equal backStops', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.backStops === line.drawStops).toBeTruthy()
    })

    it('should set drawStops to equal stops', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      state.pickedBusLine.direction = BusLineDirection.back
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.forthStops === line.drawStops).toBeTruthy()
    })

    it('should rebuild the drawRoute', () => {
      state = reducer(state, new SetPickedBusLineAction(state.busLines[0]))
      state.pickedBusLine.drawRoute = [{ isDisabled: true, line: null }]
      const action = new TogglePickedBusLineDirectionAction()
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute).not.toBeNull()
      expect(line.drawRoute.length).toBeGreaterThan(0)
      expect(line.drawRoute[0].line.length).toBeGreaterThan(1)
    })
  })

  describe('when picked bus line', () => {
    it('should disable the last stop', () => {
      const action = new SetPickedBusLineAction(state.busLines[0])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[pickedBusLine.forthStops.length - 1].isDisabled).toBeTruthy()
    })

    it('should set the direction to forward', () => {
      const newLine = { ...state.busLines[0] }
      newLine.direction = undefined
      const action = new SetPickedBusLineAction(newLine)
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[pickedBusLine.forthStops.length - 1].isDisabled).toBeTruthy()
    })

    it('should set the drawStops to equal Stops', () => {
      const newLine = { ...state.busLines[0] }
      newLine.direction = undefined
      const action = new SetPickedBusLineAction(newLine)
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops === pickedBusLine.drawStops).toBeTruthy()
    })

    it('should set the drawRoute', () => {
      const newLine = { ...state.busLines[0] }
      newLine.direction = undefined
      const action = new SetPickedBusLineAction(newLine)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(1)
      expect(line.drawRoute.splice(0, line.drawRoute.length - 2).every(x => x.isDisabled)).toBeTruthy()
      expect(line.drawRoute[0].line[0] === line.forthRoute[0]).toBeTruthy()
    })

    it('should set to undefined some props if no busline is selected', () => {
      const action = new SetPickedBusLineAction()
      const { pickedBusLine, pickedOriginBusStop, pickedDestinationBusStop } = reducer(state, action)
      expect(pickedBusLine).toBeNull()
      expect(pickedOriginBusStop).toBeNull()
      expect(pickedDestinationBusStop).toBeNull()
    })

    it('should set the pathStops.length to 0', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })

    it('should reset the pathStops.length if it is already set', () => {
      const line = state.busLines[0]
      state = reducer(state, new SetPickedBusLineAction(line))
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[1]))
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[4]))
      expect(state.pickedBusLine.pathStops.length).toEqual(4)
      const action = new SetPickedBusLineAction(line)
      state = reducer(state, action)
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })
  })

  describe('when picked bus stop and no selection', () => {
    beforeEach(() => {
      const action = new SetPickedBusLineAction(state.busLines[0])
      state = reducer(state, action)
    })

    it('should set pickedOriginBusStop', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toBeTruthy()
    })

    it('should set the pathStops.length to 0', () => {
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[1]))
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })

    it('should set pickedOriginBusStop on backstops if direction is back', () => {
      const selectedStop = state.pickedBusLine.backStops[0]
      const action = new SetPickedBusStopAction(selectedStop)
      state.pickedBusLine.direction = BusLineDirection.back
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toBeTruthy()
      expect(pickedOriginBusStop.code === selectedStop.code).toBeTruthy()
    })

    it('should not use a reference', () => {
      const stop = state.pickedBusLine.forthStops[3]
      const action = new SetPickedBusStopAction(stop)
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop !== stop).toBeTruthy()
      expect(pickedOriginBusStop.code).toEqual(stop.code)
    })

    it('should mark as selected the selected bus stop', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[3].isSelected).toBeTruthy()
    })

    it('should disable only the previous stops when origin is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      pickedBusLine.forthStops.forEach((x, i) => {
        if (i < 3) {
          expect(x.isDisabled).toBeTruthy()
        } else {
          expect(x.isDisabled).toBeFalsy()
        }
      })
    })

    it('should set drawStops accordingly', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.drawStops === pickedBusLine.forthStops).toBeTruthy()
    })

    it('should set drawRoute accordingly', () => {
      const stop = state.pickedBusLine.forthStops[3]
      const action = new SetPickedBusStopAction(stop)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(2)
      const [disabled, enabled] = line.drawRoute
      expect(disabled.isDisabled).toBeTruthy()
      expect(enabled.isDisabled).toBeFalsy()
      expect(isLatLngEqual(disabled.line[disabled.line.length - 1], stop.location)).toBeTruthy()
      expect(isLatLngEqual(enabled.line[0], stop.location)).toBeTruthy()
      expect(line.drawStops === line.forthStops).toBeTruthy()
    })
  })

  describe('when picked bus stop and already a selection exists', () => {
    beforeEach(() => {
      const action1 = new SetPickedBusLineAction(state.busLines[0])
      state = reducer(state, action1)
      const action2 = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      state = reducer(state, action2)
    })

    it('should set pickedDestinationBusStop', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedDestinationBusStop } = reducer(state, action)
      expect(pickedDestinationBusStop).toBeTruthy()
    })

    it('should set the pathStops.length accordingly', () => {
      state = reducer(state, new SetPickedBusStopAction(state.pickedBusLine.forthStops[4]))
      expect(state.pickedBusLine.pathStops.length).toEqual(2)
    })

    it('should keep the origin bus stop', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const originalOrigin = state.pickedOriginBusStop
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toEqual(originalOrigin)
    })

    it('should return the same state if a disabled stop is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[1])
      const newState = reducer(state, action)
      expect(newState).toEqual(state)
    })

    it('should not use a reference', () => {
      const stop = state.pickedBusLine.forthStops[6]
      const action = new SetPickedBusStopAction(stop)
      const { pickedDestinationBusStop } = reducer(state, action)
      expect(pickedDestinationBusStop !== stop).toBeTruthy()
      expect(pickedDestinationBusStop.code).toEqual(stop.code)
    })

    it('should mark as selected the selected bus stop', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[6].isSelected).toBeTruthy()
    })

    it('should disable only the next stops when destination is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedBusLine } = reducer(state, action)
      pickedBusLine.forthStops.forEach((x, i) => {
        if (i < 3 || i > 6) {
          expect(x.isDisabled).toBeTruthy()
        } else {
          expect(x.isDisabled).toBeFalsy()
        }
      })
    })

    it('should set drawRoute accordingly if the new selection sets the destination', () => {
      const stopO = state.pickedBusLine.forthStops[3]
      const stopD = state.pickedBusLine.forthStops[6]
      const action = new SetPickedBusStopAction(stopD)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(3)
      const [disabled1, enabled, disabled2] = line.drawRoute
      expect(disabled1.isDisabled).toBeTruthy()
      expect(enabled.isDisabled).toBeFalsy()
      expect(disabled2.isDisabled).toBeTruthy()
      expect(isLatLngEqual(disabled1.line[disabled1.line.length - 1], stopO.location)).toBeTruthy()
      expect(isLatLngEqual(enabled.line[0], stopO.location)).toBeTruthy()
      expect(isLatLngEqual(enabled.line[enabled.line.length - 1], stopD.location)).toBeTruthy()
      expect(isLatLngEqual(disabled2.line[0], stopD.location)).toBeTruthy()
    })

    it('should set drawRoute accordingly if the origin is reselected', () => {
      const stop = state.pickedBusLine.forthStops[3]
      const action = new SetPickedBusStopAction(stop)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(1)
      expect(line.drawRoute.splice(0, line.drawRoute.length - 2).every(x => x.isDisabled)).toBeTruthy()
      expect(line.drawRoute[0].line[0] === line.forthRoute[0]).toBeTruthy()
    })

    it('should unselect the origin if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[3].isSelected).toBeFalsy()
    })

    it('should set the origin to undefined if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toBeNull()
    })

    it('should enable all the stops but the latest if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      const [last] = pickedBusLine.forthStops.splice(pickedBusLine.forthStops.length - 1, 1)
      expect(last.isDisabled).toBeTruthy()
      expect(pickedBusLine.forthStops.every(x => !x.isDisabled)).toBeTruthy()
    })
  })

  describe('when picked bus stop and already origin and destination are selected', () => {
    beforeEach(() => {
      const action1 = new SetPickedBusLineAction(state.busLines[0])
      state = reducer(state, action1)
      const action2 = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      state = reducer(state, action2)
      const action3 = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      state = reducer(state, action3)
    })

    it('should return the same state if a disabled stop is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[1])
      const newState = reducer(state, action)
      expect(newState).toEqual(state)
    })

    it('should keep the same pathStops.length if a disabled stop is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[1])
      state = reducer(state, action)
      expect(state.pickedBusLine.pathStops.length).toEqual(4)
    })

    it('should return the same state if an in-range stop is selected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[5])
      const newState = reducer(state, action)
      expect(newState).toEqual(state)
    })

    it('should unselect the origin if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[3].isSelected).toBeFalsy()
    })

    it('should reset pathStops.length if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      state = reducer(state, action)
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })

    it('should set the origin to null if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedOriginBusStop } = reducer(state, action)
      expect(pickedOriginBusStop).toBeNull()
    })

    it('should enable some stops if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[3])
      const { pickedBusLine } = reducer(state, action)
      pickedBusLine.forthStops.forEach((x, i) => {
        if (i > 6) {
          expect(x.isDisabled).toBeTruthy()
        } else {
          expect(x.isDisabled).toBeFalsy()
        }
      })
    })

    it('should set drawRoute accordingly if the origin is reselected', () => {
      const stopO = state.pickedBusLine.forthStops[3]
      const stopD = state.pickedBusLine.forthStops[6]
      const action = new SetPickedBusStopAction(stopO)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(2)
      const [enabled, disabled] = line.drawRoute
      expect(enabled.isDisabled).toBeFalsy()
      expect(disabled.isDisabled).toBeTruthy()
      expect(isLatLngEqual(enabled.line[enabled.line.length - 1], stopD.location)).toBeTruthy()
      expect(line.drawStops === line.forthStops).toBeTruthy()
    })

    it('should unselect the destination if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedBusLine } = reducer(state, action)
      expect(pickedBusLine.forthStops[6].isSelected).toBeFalsy()
    })

    it('should set the destination to null if the origin is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedDestinationBusStop } = reducer(state, action)
      expect(pickedDestinationBusStop).toBeNull()
    })

    it('should enable some stops if the destination is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      const { pickedBusLine } = reducer(state, action)
      pickedBusLine.forthStops.forEach((x, i) => {
        if (i < 3) {
          expect(x.isDisabled).toBeTruthy()
        } else {
          expect(x.isDisabled).toBeFalsy()
        }
      })
    })

    it('should reset pathStops.length if the destination is reselected', () => {
      const action = new SetPickedBusStopAction(state.pickedBusLine.forthStops[6])
      state = reducer(state, action)
      expect(state.pickedBusLine.pathStops.length).toEqual(0)
    })

    it('should set drawRoute accordingly if the destination is reselected', () => {
      const stopO = state.pickedBusLine.forthStops[3]
      const stopD = state.pickedBusLine.forthStops[6]
      const action = new SetPickedBusStopAction(stopD)
      const { pickedBusLine: line } = reducer(state, action)
      expect(line.drawRoute.length).toEqual(2)
      const [disabled, enabled] = line.drawRoute
      expect(disabled.isDisabled).toBeTruthy()
      expect(enabled.isDisabled).toBeFalsy()
      expect(isLatLngEqual(disabled.line[disabled.line.length - 1], stopO.location)).toBeTruthy()
      expect(isLatLngEqual(enabled.line[0], stopO.location)).toBeTruthy()
      expect(line.drawStops === line.forthStops).toBeTruthy()
    })
  })

  describe('when selecting a new date', () => {
    it('should set it into the state', () => {
      const day = getCalendarDay()
      const action = new SetPickedDateAction(day)
      const newState = reducer(state, action)
      expect(newState.pickedDate === day).toBeTruthy()
    })
  })

  describe('when setting the schedules', () => {
    it('should set it into the state', () => {
      const schedules = [getSchedule()]
      const action = new SetSchedulesAction(schedules)
      const newState = reducer(state, action)
      expect(newState.schedules === schedules).toBeTruthy()
    })
  })

  describe('when selecting a schedule', () => {
    it('should set it into the state', () => {
      const schedule = getSchedule()
      const action = new SetPickedScheduleAction(schedule)
      const newState = reducer(state, action)
      expect(newState.pickedSchedule === schedule).toBeTruthy()
    })
  })
})
