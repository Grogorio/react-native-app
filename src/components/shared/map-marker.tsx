import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { IBusStop } from '../../models'
import { Image } from './image'
import { images } from '../../images'
import { colors, textStyles } from '../../styles'

interface IProps {
  stop: IBusStop
  hideCallouts: boolean
  disableCallouts: boolean
  onStopSelected: (stop: IBusStop) => void
  onMarkerPress: (stop: IBusStop) => void
}

export class MapMarker extends React.Component<IProps> {
  private markerRef: any

  public render(): React.ReactNode {
    const { stop } = this.props
    return (
      <Marker
        ref={m => (this.markerRef = m)}
        coordinate={stop.location}
        onPress={this.handlePress}
        image={this.selectBusStopImage(stop)}
        anchor={{ x: 0.5, y: stop.isDestination ? 1 : 0.5 }}
      >
        {this.drawCallout(stop)}
      </Marker>
    )
  }

  private selectBusStopImage(stop: IBusStop): any {
    if (stop.isOrigin) return images.dotSelected
    if (stop.isDestination) return images.pin
    return stop.isDisabled ? images.dotDisabled : images.dot
  }

  @autobind
  private handlePress(): void {
    const { stop, onMarkerPress } = this.props
    onMarkerPress(stop)
  }

  @autobind
  private drawCallout(stop: IBusStop): React.ReactNode {
    if (this.props.hideCallouts) return null
    return (
      <Callout tooltip={true} onPress={this.onMarkerPress(stop)} style={styles.callout}>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutText}>{stop.code} - {stop.name}</Text>
          {this.drawCheck(stop.isSelected)}
        </View>
        <View style={styles.pinCall}>
          <Image name={'pinCall'} size={{ width: 20, height: 20 }} />
        </View>
      </Callout>
    )
  }

  private drawCheck(isSelected: boolean): React.ReactNode {
    const disableCallouts = this.props.disableCallouts
    return disableCallouts ? null : (
      <View style={styles.calloutCheckContainer}>
        <Text style={styles.calloutChar}>{ isSelected ? '\u2715' : '\u2713' }</Text>
      </View>
    )
  }

  @autobind
  private onMarkerPress(stop: IBusStop) {
    return () => {
      const { onStopSelected, disableCallouts } = this.props
      if (onStopSelected && !disableCallouts) onStopSelected(stop)
      this.markerRef.hideCallout()
    }
  }
}

const styles = StyleSheet.create({
  callout: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  calloutContainer: {
    flex: 1,
    elevation: 10,
    flexDirection: 'row',
    height: verticalScale(44),
    backgroundColor: colors.white,
    borderRadius: scale(44),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    paddingRight: scale(6),
    paddingLeft: scale(20)
  },
  pinCall: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -verticalScale(5)
  },
  calloutText: {
    ...textStyles.body,
    color: colors.black,
    marginRight: scale(10)
  },
  calloutCheckContainer: {
    height: verticalScale(32),
    width: verticalScale(32),
    borderRadius: scale(32),
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calloutChar: {
    ...textStyles.display,
    color: colors.white,
    fontWeight: '500'
  }
})
