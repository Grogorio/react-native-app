import { IBusStop, IBusLine } from './bus-line'

export interface ISchedule {
  id: number
  date: string
  time: string
  realTime: string
  expedition: string
  stop: IBusStop
  busLine: IBusLine
  availability: boolean
}
