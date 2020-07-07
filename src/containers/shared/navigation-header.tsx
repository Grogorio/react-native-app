import React from 'react'
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { Image } from '../../components'
import { ImageName } from '../../images'
import { IStoreState } from '../../store/states'
import { ToggleIsMenuVisibleAction } from '../../store/actions'
import { colors, globalStyles, osPaddingTop } from '../../styles'
import { TouchableOpacityDisable } from '../../components/shared'

interface IProps extends DispatchProp<any> {
  isMenuVisible: boolean
  onBackPress?: () => void
  onExitPress?: () => void
  backIcon?: ImageName
  actionIcon?: ImageName
  actionText?: string
  onActionPress?: () => void
  opacityOn?: boolean
  reversed?: boolean
  isConnected: boolean
}

export class NavigationHeader extends React.Component<IProps> {
  private get actionButton(): React.ReactNode {
    const { onActionPress, actionIcon, actionText, isConnected } = this.props
    if (onActionPress)
      return (
        <TouchableOpacityDisable style={styles.button} onPress={onActionPress} disabled={!isConnected}>
          {actionIcon && <Image name={actionIcon} size={{ width: 20, height: 20 }} />}
          {actionText && <Text style={globalStyles.headerTextAction}>{actionText}</Text>}
        </TouchableOpacityDisable>
      )
  }

  private get navigationButton(): React.ReactNode {
    const { onBackPress, onExitPress, backIcon, reversed, isConnected } = this.props
    if (onBackPress)
      return (
        <TouchableOpacity style={styles.button} onPress={onBackPress}>
          <Image name={backIcon || (reversed ? 'back' : 'backWhite')} size={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      )
    else if (onExitPress)
      return (
        <TouchableOpacity style={styles.button} onPress={onExitPress}>
          <Image name={backIcon || 'close'} size={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      )
    return (
      <TouchableOpacityDisable style={styles.button} onPress={this.onToggleMenu} disabled={!isConnected}>
        <Image name={'menu'} size={{ width: 20, height: 20 }} />
      </TouchableOpacityDisable>
    )
  }

  private get headerStyle(): StyleProp<ViewStyle> {
    const { onActionPress, opacityOn, reversed, isConnected } = this.props
    const actionStyle = onActionPress ? styles.headerWithAction : styles.header
    const opacityStyle = opacityOn ? globalStyles.bottomOpacity : null
    const reversedStyle = reversed ? styles.reversedHeader : null
    const connectionStyle = isConnected ? null : { paddingTop: 0 }
    return [actionStyle, opacityStyle, reversedStyle, connectionStyle]
  }

  private get mainContent(): React.ReactNode {
    if (this.props.children) return this.props.children
    return this.logo
  }

  private get logo(): React.ReactNode {
    const size = { width: 183, height: 45 }
    if (this.props.reversed) return <Image size={size} name={'logoPurple'} resizeMode={'contain'} />
    return <Image size={size} name={'logo'} resizeMode={'contain'} />
  }

  public render(): React.ReactNode {
    return (
      <View style={this.headerStyle}>
        <View style={styles.headerContent}>
          {this.navigationButton}
          <View style={styles.customizableContent}>{this.mainContent}</View>
          {this.actionButton}
        </View>
      </View>
    )
  }

  @autobind
  private onToggleMenu(): void {
    this.props.dispatch(new ToggleIsMenuVisibleAction())
  }
}

const headerStyleBase: StyleProp<ViewStyle> = {
  height: 'auto',
  width: '100%',
  paddingTop: osPaddingTop,
  backgroundColor: colors.purple,
  zIndex: 1000,
  elevation: 1000,
  flexShrink: 0
}

const styles = StyleSheet.create({
  header: {
    ...headerStyleBase,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: scale(44),
    flexShrink: 0
  },
  headerWithAction: {
    ...headerStyleBase,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reversedHeader: {
    backgroundColor: colors.white
  },
  headerContent: {
    flexDirection: 'row',
    height: verticalScale(64)
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(54),
    height: verticalScale(64)
  },
  customizableContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ ui }: IStoreState) => ({
  isMenuVisible: ui.isMenuVisible,
  isConnected: ui.isConnected
})
export default connect(mapStateToProps)(NavigationHeader)
