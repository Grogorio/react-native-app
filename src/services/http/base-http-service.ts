import { environment } from '../../environments'
import { authenticationService } from '../index'
import { ICognitoUserSession } from '../../models'

interface IHeaders {
  [key: string]: string
}

export abstract class BaseHttpService {
  public async get<T = any>(segment: string): Promise<T> {
    return this.fetch(segment, 'GET')
  }

  public async post<T = any>(segment: string, body: any): Promise<T> {
    return this.fetch(segment, 'POST', body)
  }

  public async patch<T = any>(segment: string, body: any): Promise<T> {
    return this.fetch(segment, 'PATCH', body)
  }

  public async delete<T = any>(segment: string): Promise<T> {
    return this.fetch(segment, 'DELETE')
  }

  public async put<T = any>(segment: string, body: any): Promise<T> {
    return this.fetch(segment, 'PUT', body)
  }

  private async fetch<T = any>(segment: string, method: string, body?: any): Promise<T> {
    return this.fetchRetry(`${environment.apiUrl}/${segment}`, {
      method,
      headers: await this.headers(),
      body: !body ? undefined : JSON.stringify(body)
    })
      .then(async (res: Response) => {
        if (res.status >= 200 && res.status < 300 && res.status !== 204) return res.json()
        else if (res.status === 204) return
        else throw new Error(JSON.stringify(res))
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error)
        throw error
      })
  }

  private async headers(): Promise<Headers> {
    const headers: IHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const token = await this.getToken()
    if (token) headers.Authorization = token
    return new Headers(headers)
  }

  private async getToken(): Promise<string> {
    let tokens: ICognitoUserSession

    try {
      tokens = await authenticationService.getTokens()
    } catch (error) {
      tokens = null
    }

    if (!tokens || !tokens.idToken) return null
    return tokens.idToken.jwtToken
  }

  private async fetchRetry(url: string, options: RequestInit, tries: number = 3): Promise<Response> {
    try {
      return await fetch(url, options)
    } catch (err) {
      if (tries === 1) throw err
      return this.fetchRetry(url, options, tries - 1)
    }
  }
}
