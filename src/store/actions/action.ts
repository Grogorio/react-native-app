import { Middleware, AnyAction } from 'redux'

export interface IAction<P = any> extends AnyAction {
  type: string
  payload?: P
}

export abstract class Action<P = any> implements IAction<P> {
  public abstract type: string
  public payload?: P

  public toObject(): IAction<P> {
    return {
      type: this.type,
      payload: this.payload
    }
  }
}

export const actionMiddleWare: Middleware = _store => next => (action: any) => {
  // console.log('MiddleWare triggered', action)
  if (action instanceof Action) {
    next(action.toObject())
  } else {
    next(action)
  }
}
