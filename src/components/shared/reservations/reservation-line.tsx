import React from 'react'
import { Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import { textStyles, colors } from '../../../styles'
import { LineNumber } from '../line-number'

interface IProps {
  name: string
  description: string
  onPress?: () => void
  styleContainer?: ViewStyle
  styleLine?: ViewStyle
}

export class ReservationLine extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { name, description, styleContainer, styleLine, onPress } = this.props
    return (
      <TouchableOpacity style={[styles.lineContainer, styleContainer]} onPress={onPress}>
        <LineNumber lineNumber={name} style={[styles.lineNumber, styleLine]} />
        <Text style={styles.lineDescription}>{description}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20)
  },
  lineNumber: {
    marginRight: scale(10)
  },
  lineDescription: {
    ...textStyles.body,
    flex: 1,
    color: colors.black
  }
})
