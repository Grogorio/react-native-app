import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { autobind } from 'core-decorators'
import { IStoreState } from '../../store/states'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { MenuUserInfo, MenuItem, MenuTitle } from '../../components'
import { IUser } from '../../models'
import { routes } from '../../navigation'
import { signOutActionThunk } from '../../store/thunks'
import { ToggleIsMenuVisibleAction, SetActiveRouteNameAction } from '../../store/actions'
import { literalsService } from '../../services'
import { colors, menuWidth } from '../../styles'
import { SureToSignOutModal } from '../../components/shared/sure-sign-out-modal'

export interface IProps extends DispatchProp<any> {
  isMenuVisible: boolean
  isUserSignedIn: boolean
  user: IUser
  activeRouteName: string
  navigation?: NavigationScreenProp<NavigationRoute>
}

export interface IState {
  shouldShowRepeatModal: boolean
}

class Menu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { shouldShowRepeatModal: false }
  }

  public render(): React.ReactNode {
    const { user, isUserSignedIn } = this.props
    if (!isUserSignedIn) return null
    return (
      <View style={styles.menu}>
        <SureToSignOutModal
          isVisible={this.state.shouldShowRepeatModal}
          onPress={this.handleSingOut}
          onClose={this.handleCloseSureSignOut}
        />
        <MenuUserInfo user={user} />
        <MenuTitle title={literalsService.get('service')} />
        <MenuItem
          routeName={routes.reservations.routeName}
          label={literalsService.get('reservations')}
          onPress={this.handleMenuItemPress}
        />
        <MenuItem
          routeName={routes.penalties.routeName}
          label={literalsService.get('penalties')}
          onPress={this.handleMenuItemPress}
        />
        <MenuTitle title={literalsService.get('account')} />
        <MenuItem
          routeName={routes.profile.routeName}
          label={literalsService.get('profile')}
          onPress={this.handleMenuItemPress}
        />
        <MenuItem routeName={null} label={literalsService.get('signOut')} onPress={this.handleOpenSureSignOut} />
        <MenuItem
          routeName={routes.information.routeName}
          label={literalsService.get('information')}
          onPress={this.handleMenuItemPress}
        />
      </View>
    )
  }

  @autobind
  private handleMenuItemPress(routeName: string) {
    const { dispatch, activeRouteName, navigation } = this.props
    dispatch(new ToggleIsMenuVisibleAction())
    if (routeName && activeRouteName !== routeName) {
      navigation.navigate(routeName)
      dispatch(new SetActiveRouteNameAction(routeName))
    }
  }

  @autobind
  private handleOpenSureSignOut() {
    this.setState({ shouldShowRepeatModal: true })
  }

  @autobind
  private handleCloseSureSignOut() {
    this.setState({ shouldShowRepeatModal: false })
  }

  @autobind
  private handleSingOut() {
    this.props.dispatch(signOutActionThunk())
  }
}

const styles = StyleSheet.create({
  menu: {
    width: menuWidth,
    backgroundColor: colors.white
  }
})

const mapStateToProps = ({ ui, user }: IStoreState) => ({
  isMenuVisible: ui.isMenuVisible,
  isUserSignedIn: ui.isUserSignedIn,
  activeRouteName: ui.activeRouteName,
  user
})

export default connect(mapStateToProps)(Menu)
