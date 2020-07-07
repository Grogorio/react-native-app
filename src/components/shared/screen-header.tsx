import * as React from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { colors, textStyles, globalStyles } from '../../styles'

interface IProps {
  title: string
  reversed?: boolean
}

export class ScreenHeader extends React.Component<IProps> {

  private get headerStyle(): StyleProp<ViewStyle> {
    const reversed = this.props.reversed
    const reversedStyle = reversed ? styles.reversedHeader : null
    return [styles.container, globalStyles.bottomOpacity, reversedStyle]
  }

  private get titleStyle(): StyleProp<TextStyle> {
    const reversed = this.props.reversed
    const reversedStyle = reversed ? styles.reversedTitle : null
    return [styles.title, reversedStyle]
  }

  public render(): React.ReactNode {
    return (
      <View style={this.headerStyle}>
        <Text style={this.titleStyle}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(48),
    width: '100%',
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reversedHeader: {
    backgroundColor: colors.white
  },
  title: {
    ...textStyles.title,
    color: colors.white
  },
  reversedTitle: {
    color: colors.black
  }
})
