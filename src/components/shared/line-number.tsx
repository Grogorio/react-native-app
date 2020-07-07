import * as React from 'react'
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native'
import { colors, textStyles } from '../../styles'
import { moderateScale } from 'react-native-size-matters'

interface IProps {
  lineNumber: string
  style?: StyleProp<ViewStyle>
}

export class LineNumber extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { lineNumber, style } = this.props
    if (!lineNumber) return null
    return (
      <View style={[styles.lineNumber, style]}>
        <Text style={styles.lineNumberText}>{lineNumber}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lineNumber: {
    backgroundColor: colors.yellow,
    height: moderateScale(36),
    width: moderateScale(36),
    borderRadius: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center'
  },
  lineNumberText: {
    ...textStyles.button,
    color: 'white'
  }
})
