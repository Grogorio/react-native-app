import * as React from 'react'
import { ActivityIndicator, ViewStyle, StyleProp } from 'react-native'
import { colors } from '../../styles'

interface IProps {
  style?: StyleProp<ViewStyle>
  onLayout?: () => void
}

export class Spinner extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { onLayout, style } = this.props
    return <ActivityIndicator onLayout={onLayout} size="large" style={style} color={colors.purple} />
  }
}
