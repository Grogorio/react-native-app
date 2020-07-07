import * as React from 'react'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { TouchableHighlight, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { IBusStop } from '../../models'
import { textStyles, colors } from '../../styles'

interface IProps {
  stop: IBusStop
  onPress: (stop: IBusStop) => void
}

export class BusStop extends React.Component<IProps> {
  private get stopTextStyle(): StyleProp<ViewStyle> {
    const { isSelected, isDisabled } = this.props.stop
    if (isSelected) return styles.selectedStopText
    if (isDisabled) return styles.disabledStopText
    return styles.stopText
  }

  private get trackLineStyle(): StyleProp<ViewStyle> {
    if (this.props.stop.isDisabled) return styles.disabledTrackLine
    return styles.trackLine
  }

  private get trackMarkerStyle(): StyleProp<ViewStyle> {
    const { isSelected, isDisabled } = this.props.stop
    if (isSelected) return styles.pickedTrackMarker
    if (isDisabled) return styles.disabledTrackMarker
    return styles.trackMarker
  }

  public render(): React.ReactNode {
    const { stop } = this.props
    return (
      <TouchableHighlight
        style={styles.stop}
        underlayColor="#F1F4FA"
        disabled={stop.isDisabled}
        onPress={this.handlePress}
      >
        <View style={styles.stopContainer}>
          <View style={styles.track}>
            <View style={this.trackLineStyle} />
            <View style={this.trackMarkerStyle} />
          </View>
          <Text style={this.stopTextStyle}>{stop.code} - {stop.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  @autobind
  private handlePress() {
    const { onPress, stop } = this.props
    onPress(stop)
  }
}

const styles = StyleSheet.create({
  stop: {
    height: verticalScale(50),
    width: '100%'
  },
  stopContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  stopText: {
    ...textStyles.body,
    lineHeight: verticalScale(50),
    color: colors.black
  },
  selectedStopText: {
    ...textStyles.title,
    lineHeight: verticalScale(50),
    color: colors.black
  },
  disabledStopText: {
    ...textStyles.body,
    lineHeight: verticalScale(50),
    color: colors.greyDark
  },
  track: {
    height: '100%',
    width: scale(12),
    marginLeft: scale(32),
    marginRight: scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  trackLine: {
    backgroundColor: '#F0BA2E',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: scale(4)
  },
  disabledTrackLine: {
    backgroundColor: '#989898',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: scale(4)
  },
  trackMarker: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12),
    backgroundColor: '#F0BA2E'
  },
  disabledTrackMarker: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12),
    backgroundColor: '#989898'
  },
  pickedTrackMarker: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(18),
    backgroundColor: '#F0BA2E',
    borderWidth: scale(4),
    borderColor: 'white'
  }
})
