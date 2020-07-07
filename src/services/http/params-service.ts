import { BaseHttpService } from './base-http-service'
import { IUnsubscriptionReason } from '../../models'

interface IMunicipality { name: string }

class ParamsService extends BaseHttpService {
  public async getUnsubscribeReasons(): Promise<IUnsubscriptionReason[]> {
    return this.get('params/reasons')
  }

  public async getMunicipalities(): Promise<string[]> {
    return this.get('params/towns').then(body => {
      return body
        .filter((x: IMunicipality, i: number, a: IMunicipality[]) => i === a.findIndex(y => y.name === x.name))
        .map((x: IMunicipality) => x.name)
    })
  }

  public async getMinHoursBeforeAction(): Promise<number> {
    return this.get('params/min-hours-before')
  }

  public async getRecurrence(): Promise<number> {
    return this.get(`params/recurrence`).then(body => body)
  }
}

export default new ParamsService()
