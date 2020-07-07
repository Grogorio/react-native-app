import * as React from 'react'
import { Text, StyleSheet, Animated, ViewStyle } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { textStyles, colors } from '../../styles'
import { INotification } from '../../models'

interface IProps {
  notification: INotification
  resetScreenParams: () => void
}

interface IState {
  animation: Animated.Value
}

export class Notification extends React.Component<IProps, IState> {

  private get notificationStyles(): any[] {
    const animationStyle = { height: this.state.animation }
    if (this.props.notification.isError) return [ styles.errorNotification, animationStyle ]
    return [ styles.notification, animationStyle ]
  }

  constructor(props: IProps) {
    super(props)
    this.state = { animation: new Animated.Value(0) }
  }

  public animateNotification(): void {
    const { notification, resetScreenParams } = this.props
    if (!notification) return
    Animated.sequence([
      Animated.timing(
        this.state.animation,
        {
          toValue: verticalScale(50),
          duration: 500,
          delay: 1000
        }
      ),
      Animated.timing(
        this.state.animation,
        {
          toValue: 0,
          duration: 500,
          delay: 3000
        }
      )
    ]).start()
    setTimeout(() => { resetScreenParams() }, 5000)
  }

  public render(): React.ReactNode {
    const notification = this.props.notification
    if (!notification) return null
    this.animateNotification()
    return (
      <Animated.View style={this.notificationStyles}>
        <Text style={styles.text}>{ notification.label }</Text>
      </Animated.View>
    )
  }
}

const baseNotification: ViewStyle = {
  width: '100%',
  height: 0,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}

const styles = StyleSheet.create({
  notification: {
    ...baseNotification,
    backgroundColor: colors.yellow
  },
  errorNotification: {
    ...baseNotification,
    backgroundColor: 'red'
  },
  text: {
    ...textStyles.button,
    color: colors.white
  }
})
