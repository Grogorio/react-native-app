import * as React from 'react'
import { Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { buttonStyles } from '../../styles'

interface IProps {
  onPress: () => void
  label: string
  isDisabled?: boolean
  isReversed?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<ViewStyle>
}

export class ValidatedButton extends React.Component<IProps> {
  public basicStyle(): StyleProp<ViewStyle> {
    const { isDisabled, isReversed } = this.props
    if (isDisabled) return buttonStyles.disabledBasic
    if (isReversed) return buttonStyles.reversedBasic
    return buttonStyles.basic
  }

  public basicTextStyle(): StyleProp<TextStyle> {
    const { isDisabled, isReversed } = this.props
    if (isDisabled) return buttonStyles.disabledBasicText
    if (isReversed) return buttonStyles.reversedBasicText
    return buttonStyles.basicText
  }

  public render(): React.ReactNode {
    const { onPress, label, style, textStyle } = this.props
    const isDisabled = this.props.isDisabled || !onPress
    return (
      <TouchableOpacity disabled={isDisabled} style={[this.basicStyle(), style]} onPress={onPress}>
        <Text style={[this.basicTextStyle(), textStyle]}>{label}</Text>
      </TouchableOpacity>
    )
  }
}
