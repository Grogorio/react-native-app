import * as React from 'react'
import { AnimatedValue } from 'react-navigation'
import { StyleSheet, Animated, Dimensions } from 'react-native'
import { menuWidth } from '../../styles'

interface IState {
  marginAnimation: AnimatedValue
}

interface IProps {
  isMenuVisible: boolean
}

export class MenuView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { marginAnimation: new Animated.Value(-menuWidth) }
  }

  public componentDidUpdate() {
    if (this.props.isMenuVisible) Animated.timing(this.state.marginAnimation, { toValue: 0, duration: 250 }).start()
    else Animated.timing(this.state.marginAnimation, { toValue: -menuWidth, duration: 250 }).start()
  }

  public render() {
    return (
      <Animated.View style={[styles.menuView, { marginLeft: this.state.marginAnimation }]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  menuView: {
    flexDirection: 'row',
    flex: 1,
    width: Dimensions.get('window').width + menuWidth
  }
})
