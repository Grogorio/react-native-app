import { IActionThunk } from '../../models'
import { penaltiesService } from '../../services'
import { SetPenaltiesAction, SetIsFetchingPenaltiesAction } from '../actions'

export function fetchPenaltiesActionThunk(): IActionThunk {
  return async dispatch => {
    dispatch(new SetIsFetchingPenaltiesAction())
    const penalties = await penaltiesService.getPenalties()
    dispatch(new SetPenaltiesAction(penalties))
  }
}
