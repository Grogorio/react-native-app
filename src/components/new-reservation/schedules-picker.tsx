import * as React from 'react'
import { autobind } from 'core-decorators'
import * as Picker from 'react-native-wheel-picker-android'
import { StyleSheet, TextStyle } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ISchedule } from '../../models'
import { textStyles, colors } from '../../styles'

interface IProps {
  schedules: ISchedule[]
  pickedSchedule: ISchedule
  onChange: (schedule: ISchedule) => void
}

export class SchedulesPicker extends React.Component<IProps> {
  private get pickerItems(): React.ReactNode {
    // return this.props.schedules.map((s: ISchedule, i: number) => <Picker label={s.expedition} value={i} key={i} />)
    return this.props.schedules.map((s: ISchedule) => s.expedition)
  }

  public render(): React.ReactNode {
    const { pickedSchedule, schedules } = this.props
    if (!schedules.length) return null
    return (
      <Picker.WheelPicker
        style={styles.picker}
        selectedValue={schedules.findIndex(s => pickedSchedule && s.time === pickedSchedule.time)}
        itemStyle={pickerItem}
        itemSpace={60}
        // onValueChange={this.handleChange}
        onItemSelected={this.handleChange}
        data={this.pickerItems}
      >
        {/* {this.pickerItems} */}
      </Picker.WheelPicker>
    )
  }

  @autobind
  private handleChange(index: number) {
    this.props.onChange(this.props.schedules[index])
  }
}

// Since I found the react-native-wheel-picker have problems with StyleSheets
// I'm using a simple object for the item styles
const pickerItem: TextStyle = {
  ...textStyles.title,
  fontSize: Math.floor(responsiveFontSize(4)),
  color: colors.black
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    justifyContent: 'center'
  }
})
