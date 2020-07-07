import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale } from 'react-native-size-matters'
import { PeriodicityWeeklyPicker } from './periodicity-weekly-picker'
import { IPeriod } from '../../models'
import { literalsService } from '../../services'
import { IActionSheet, DropdownInput } from '../shared/inputs/dropdown-input'

type IPeriodicityMode = 'daily' | 'weekly' | 'never'

interface IState {
  mode: IActionSheet<IPeriodicityMode>
}

interface IProps {
  pickedPeriod: IPeriod
  onPeriodicityChange: (period?: IPeriod) => void
}

export class PeriodicityPicker extends React.Component<IProps, IState> {
  private actions = [
    { value: 'daily', literal: literalsService.get('daily') },
    { value: 'weekly', literal: literalsService.get('weekly') },
    { value: 'never', literal: literalsService.get('never') }
  ]

  constructor(props: IProps) {
    super(props)
    this.state = { mode: this.initialPeriodicityAction }
  }

  private get initialPeriodicityAction(): IActionSheet<IPeriodicityMode> {
    const index = this.actions.length - 1
    return this.actions[index] as IActionSheet<IPeriodicityMode>
  }

  private get isInWeeklyMode(): boolean {
    return this.state.mode.value === 'weekly'
  }

  private get isInDailyMode(): boolean {
    return this.state.mode.value === 'daily'
  }

  private get periodicityWeeklyPicker(): React.ReactNode {
    if (!this.isInWeeklyMode) return null
    return (
      <PeriodicityWeeklyPicker
        onWeeklyPickerChange={this.onWeeklyPickerChange}
        pickedPeriod={this.props.pickedPeriod}
      />
    )
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <DropdownInput
          label={`${literalsService.get('repeat')}: ${this.state.mode.literal}`}
          actions={this.actions}
          onActionPress={this.handleActionPress}
          style={{ marginBottom: verticalScale(20) }}
        />
        {this.periodicityWeeklyPicker}
      </View>
    )
  }

  @autobind
  private onWeeklyPickerChange(period: IPeriod) {
    this.props.onPeriodicityChange(period)
  }

  @autobind
  private handleActionPress(action: IActionSheet<IPeriodicityMode>): void {
    this.setState({ mode: action && action.value ? action : this.initialPeriodicityAction })

    if (this.isInDailyMode) this.props.onPeriodicityChange([1, 2, 3, 4, 5, 6, 7])
    else this.props.onPeriodicityChange()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
