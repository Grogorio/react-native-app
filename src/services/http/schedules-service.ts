import { BaseHttpService } from './base-http-service'
import { ISchedule } from '../../models'

class SchedulesService extends BaseHttpService {
  public async getSchedules(busLineId: number, stopCode: number, date: string): Promise<ISchedule[]> {
    return this.get(`schedules?buslineid=${busLineId}&stopcode=${stopCode}&date=${date}`).then(body => {
      if (body && !body.length) throw new Error('no schedules')
      return body
    })
  }

  public async getCapacity(scheduleId: number, stopCode: number): Promise<{ capacity: number; prmCapacity: number }> {
    return this.get(`schedules/${scheduleId}/capacity?destinationstopcode=${stopCode}`)
  }
}

export default new SchedulesService()
