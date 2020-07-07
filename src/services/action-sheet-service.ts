import ActionSheet from 'react-native-action-sheet'
import { IActionSheet } from '../components'
import { capitalize, isIOS } from '../utils'
import literalsService from './literals-service'

class ActionSheetService {
  public show(rawActions: IActionSheet<any>[], onActionPress: (action: IActionSheet<any>) => void): void {
    const actions = rawActions.filter(a => !a.hidden)
    ActionSheet.showActionSheetWithOptions(
      {
        options: this.generateActions(actions).map(p => capitalize(p.literal)),
        cancelButtonIndex: actions.length,
        destructiveButtonIndex: actions.length
      },
      (index: number) => {
        const action = actions[index] as IActionSheet<any>
        onActionPress(action)
      }
    )
  }

  private generateActions(actions: IActionSheet<any>[]): IActionSheet<any>[] {
    if (isIOS()) return [...actions, { value: null, literal: literalsService.get('quit') }]
    return actions
  }
}

export default new ActionSheetService()
