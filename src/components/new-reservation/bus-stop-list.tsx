import * as React from 'react'
import { StyleSheet, ScrollView, ViewStyle, StyleProp } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { autobind } from 'core-decorators'
import { BusStop } from '../../components'
import { IBusStop, IBusStopSelectionOptions, getStops } from '../../models'

export class BusStopList extends React.Component<IBusStopSelectionOptions> {
  private get busStops(): React.ReactNode[] {
    const stops = getStops(this.props.line)
    return stops.map(s => <BusStop key={s.code} stop={s} onPress={this.onPress} />)
  }

  private get listContainerStyle(): StyleProp<ViewStyle> {
    if (!this.props.areStopsSelected) return styles.stopsContainer
    return null
  }

  public render(): React.ReactNode {
    if (!this.props.line) return null
    return <ScrollView style={styles.stops} contentContainerStyle={this.listContainerStyle}>{this.busStops}</ScrollView>
  }

  @autobind
  private onPress(stop: IBusStop) {
    const event = this.props.onStopSelected
    if (event) event(stop)
  }
}

const styles = StyleSheet.create({
  stops: {
    flex: 1,
    width: '100%'
  },
  stopsContainer: {
    paddingBottom: verticalScale(80)
  }
})
