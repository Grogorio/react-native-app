import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actionMiddleWare } from '../store/actions'

const middlewares = [thunk, actionMiddleWare]
export const mockStore = configureMockStore(middlewares)

export interface IStoreProps {
  navigation: any
  dispatch: () => void
}

export const storeProps: IStoreProps = {
  navigation: {
    dispatch: jest.fn(),
    navigate: jest.fn()
  },
  dispatch: jest.fn()
}
