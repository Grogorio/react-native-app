import * as React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles, textStyles, colors } from '../../styles'
import { Screen, ScreenHeader, ValidatedButton, MenuView, ProfileNavButton } from '../../components'
import { NavigationHeader, ProfileNameInput, ProfileLastNameInput, ProfileTelephoneInput, Menu } from '../../containers'
import { literalsService, paramsService, authenticationService } from '../../services'
import { IStoreState, IProfileState } from '../../store/states'
import { IUser, IAWSUser } from '../../models'
import { routes } from '../../navigation'
import { SetUserAction } from '../../store/actions'
import { Notification } from '../../components/shared/notification'
import { sanitizeTelephone } from '../../utils'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  user: IUser
  profile: IProfileState
  isMenuVisible: boolean
}

interface IState {
  isNavigatorReseting: boolean
  municipalities: string[]
  isConnected: boolean
}

class Profile extends Screen<IProps, IState> {
  public get isEveryFieldValid(): boolean {
    const { name, lastName, email, dni, telephone } = this.props.profile
    return (
      name.isValid && lastName.isValid && email.isValid && dni.isValid && telephone.isValid && this.isSomeFieldModified
    )
  }

  private get isSomeFieldModified(): boolean {
    const { user, profile } = this.props
    return (
      profile &&
      user &&
      (profile.name.value !== user.name ||
        profile.lastName.value !== user.lastName ||
        profile.telephone.value !== user.telephone)
    )
  }

  constructor(props: IProps) {
    super(props)
    this.state = { ...this.state, municipalities: [] }
  }

  public async componentDidMount() {
    const municipalities = await paramsService.getMunicipalities()
    this.setState({ municipalities })
  }

  @autobind
  public resetScreenParams(): void {
    this.props.navigation.setParams({ notification: null })
  }

  public render(): React.ReactNode {
    const { municipalities, isConnected } = this.state
    if (!municipalities.length) return this.spinner
    return (
      <MenuView isMenuVisible={this.props.isMenuVisible}>
        <Menu navigation={this.props.navigation} />
        <View style={[globalStyles.screen]}>
          {this.connectionStatus}
          <NavigationHeader />
          <ScreenHeader title={literalsService.get('profile').toUpperCase()} />
          <Notification notification={this.screenParams.notification} resetScreenParams={this.resetScreenParams} />
          <ScrollView
            keyboardShouldPersistTaps={'never'}
            style={globalStyles.container}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <Text style={styles.title}>{literalsService.get('personalInfo').toUpperCase()}</Text>
            <ProfileNameInput />
            <ProfileLastNameInput />
            <Text style={styles.title}>{literalsService.get('contactInfo').toUpperCase()}</Text>
            <ProfileTelephoneInput />
            <View style={styles.navContainer}>
              <ProfileNavButton
                label={literalsService.get('changePassword').toUpperCase()}
                onPress={this.goToChangePassword}
                disabled={!isConnected}
              />
              <ProfileNavButton
                label={literalsService.get('changeLanguage').toUpperCase()}
                onPress={this.goToLanguage}
                disabled={!isConnected}
              />
              <ProfileNavButton
                label={literalsService.get('dropOutFromService').toUpperCase()}
                onPress={this.goToUnsubscribe}
                disabled={!isConnected}
              />
            </View>
          </ScrollView>
          <ValidatedButton
            label={literalsService.get('save').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid || !isConnected}
          />
        </View>
      </MenuView>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { profile, user } = this.props
    this.updateProfile({
      name: profile.name.value,
      email: profile.email.value,
      phone_number: sanitizeTelephone(profile.telephone.value),
      family_name: profile.lastName.value,
      'custom:dni_nie': profile.dni.value,
      locale: user.locale
    })
  }

  private async updateProfile(attributes: IAWSUser): Promise<void> {
    const dispatch = this.props.dispatch
    try {
      const updatedUser = await authenticationService.updateAttributes(attributes)
      dispatch(new SetUserAction(updatedUser))
      this.setNotification(literalsService.get('profileUpdated', true), false)
    } catch (error) {
      this.setNotification(literalsService.get('profileNotUpdated', true), true)
    }
  }

  private setNotification(label: string, isError: boolean): void {
    this.props.navigation.setParams({ notification: { label, isError } })
  }

  @autobind
  private goToLanguage(): void {
    this.navigate(routes.profileChangeLanguage.routeName)
  }

  @autobind
  private goToChangePassword(): void {
    this.navigate(routes.profileChangePassword.routeName)
  }

  @autobind
  private goToUnsubscribe(): void {
    this.navigate(routes.profileUnsubscribe.routeName)
  }
}

const styles = StyleSheet.create({
  title: {
    ...textStyles.title,
    marginTop: 30,
    marginBottom: 16,
    color: colors.black
  },
  navContainer: {
    marginTop: 40,
    marginBottom: 40,
    borderColor: colors.grey,
    borderTopWidth: 1
  }
})

const mapStateToProps = ({ user, profile, ui }: IStoreState) => ({
  user,
  profile,
  isMenuVisible: ui.isMenuVisible
})

export default connect(mapStateToProps)(Profile)
