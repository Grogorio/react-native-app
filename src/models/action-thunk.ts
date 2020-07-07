import { Dispatch } from 'react-redux'
import { Action } from '../store/actions'

export type IActionThunk<T extends Action = Action<any>> = (dispatch: Dispatch<T>) => void
