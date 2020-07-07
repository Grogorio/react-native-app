import { BaseHttpService } from './base-http-service'
import { IBusLine } from '../../models'

class BusLinesService extends BaseHttpService {
  public async getBusLines(): Promise<IBusLine[]> {
    return this.get<IBusLine[]>('buslines').then(buslines => buslines)
  }

  public async getBusLine(id: number): Promise<IBusLine> {
    return this.get<IBusLine>(`buslines/${id}`).then(busline => busline)
  }
}

export default new BusLinesService()
