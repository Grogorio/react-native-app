import * as React from 'react'
import { autobind } from 'core-decorators'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { IBusStop } from '../../models'
import { textStyles, colors } from '../../styles'
import { Image } from '..'
import { literalsService } from '../../services'

interface IProps {
  pickedOriginBusStop: IBusStop
  pickedDestinationBusStop: IBusStop
  isVisible: boolean
  onStopReset: (stop: IBusStop) => void
}

export class BusStopsSelectionStatus extends React.Component<IProps> {
  private get originStop(): React.ReactNode {
    const { pickedOriginBusStop, pickedDestinationBusStop } = this.props
    if (!pickedOriginBusStop && !pickedDestinationBusStop) return null
    return (
      <View style={styles.stop}>
        <Image name="dotSelected" size={{ width: 20, height: 20 }} />
        {this.stopText(pickedOriginBusStop, literalsService.get('originBusStop'))}
        {this.unpickStopButton(pickedOriginBusStop, this.handleOriginBusStopReset)}
      </View>
    )
  }

  private get destinationStop(): React.ReactNode {
    const { pickedOriginBusStop, pickedDestinationBusStop } = this.props
    if (!pickedOriginBusStop && !pickedDestinationBusStop) return null
    return (
      <View style={styles.stop}>
        <Image name="pin" size={{ width: 20, height: 20 }} />
        {this.stopText(pickedDestinationBusStop, literalsService.get('destinationBusStop'))}
        {this.unpickStopButton(pickedDestinationBusStop, this.handleDestinationBusStopReset)}
      </View>
    )
  }

  public render(): React.ReactNode {
    const { isVisible, pickedDestinationBusStop, pickedOriginBusStop } = this.props
    if (!isVisible || !(pickedDestinationBusStop || pickedOriginBusStop)) return null
    return (
      <View style={styles.selectionStatus}>
        {this.originStop}
        {this.destinationStop}
      </View>
    )
  }

  @autobind
  private handleOriginBusStopReset(): void {
    const { pickedOriginBusStop, onStopReset } = this.props
    onStopReset(pickedOriginBusStop)
  }

  @autobind
  private handleDestinationBusStopReset(): void {
    const { pickedDestinationBusStop, onStopReset } = this.props
    onStopReset(pickedDestinationBusStop)
  }

  private stopText(stop: IBusStop, placeholder: string): React.ReactNode {
    return (
      <TextInput
        style={styles.stopText}
        placeholderTextColor="#C5C5C5"
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        editable={false}
        value={stop ? `${stop.code} - ${stop.name}` : null}
      />
    )
  }

  private unpickStopButton(stop: IBusStop, handler: () => void): React.ReactNode {
    if (!stop) return null
    return (
      <TouchableOpacity style={styles.stopButton} onPress={handler}>
        <Image name="cross" size={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  selectionStatus: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'column',
    paddingTop: verticalScale(10)
  },
  stop: {
    alignItems: 'center',
    height: verticalScale(50),
    width: '100%',
    flexDirection: 'row',
    paddingLeft: scale(20),
    paddingRight: scale(10)
  },
  stopText: {
    ...textStyles.title,
    flex: 1,
    color: colors.black,
    marginLeft: scale(12)
  },
  stopButton: {
    height: verticalScale(50),
    width: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto'
  }
})
