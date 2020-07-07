import { PenaltiesActions, PenaltiesTypeKeys } from '../actions'
import { IPenaltiesState } from '../states'

const initialState: IPenaltiesState = {
  isLoading: false,
  reservations: [],
  amount: 0,
  expiration: ''
}

const penalties = (state: IPenaltiesState = initialState, action: PenaltiesActions): IPenaltiesState => {
  switch (action.type) {
    case PenaltiesTypeKeys.SET_IS_FETCHING_PENALTIES:
      return {
        ...state,
        isLoading: true
      }
    case PenaltiesTypeKeys.SET_PENALTIES:
      return {
        ...action.payload,
        isLoading: false
      }
    case PenaltiesTypeKeys.RESET_PENALTIES:
    default:
      return state
  }
}

export default penalties
