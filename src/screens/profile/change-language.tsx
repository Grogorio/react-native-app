import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles, colors } from '../../styles'
import { Screen, ScreenHeader, ProfileLanguage } from '../../components'
import { NavigationHeader } from '../../containers'
import { literalsService, Language, authenticationService } from '../../services'
import { routes } from '../../navigation'
import { IStoreState } from '../../store/states'
import { IUser, IAWSUser } from '../../models'
import { SetUserAction } from '../../store/actions'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  user: IUser
}

class ProfileChangeLanguage extends Screen<IProps> {
  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onBackPress={this.handleBackPress} />
        <ScreenHeader title={literalsService.get('language').toUpperCase()} />
        <View style={styles.languages}>
          <ProfileLanguage
            label={literalsService.get('catalan', true)}
            language={'ca_ES'}
            onPress={this.handleLanguagePress}
            isActive={literalsService.isLanguageActive('ca_ES')}
          />
          <ProfileLanguage
            label={literalsService.get('spanish', true)}
            language={'es_ES'}
            onPress={this.handleLanguagePress}
            isActive={literalsService.isLanguageActive('es_ES')}
          />
        </View>
      </View>
    )
  }

  @autobind
  private handleLanguagePress(language: Language): void {
    const user = this.props.user
    this.updateProfile({
      name: user.name,
      email: user.email,
      phone_number: user.telephone,
      family_name: user.lastName,
      'custom:dni_nie': user.dni,
      locale: language
    })
  }

  private async updateProfile(attributes: IAWSUser): Promise<void> {
    const dispatch = this.props.dispatch
    try {
      const updatedUser = await authenticationService.updateAttributes(attributes)
      dispatch(new SetUserAction(updatedUser))
      literalsService.setLanguage(attributes.locale as Language)
      this.reset(routes.profile.routeName, 0, {
        notification: { label: literalsService.get('languageUpdated', true) }
      })
    } catch (error) {
      this.reset(routes.profile.routeName, 0, {
        notification: { label: literalsService.get('languageNotUpdated', true), isError: true }
      })
    }
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }
}

const styles = StyleSheet.create({
  languages: {
    marginTop: 30,
    borderColor: colors.grey,
    borderTopWidth: 1
  }
})

const mapStateToProps = ({ user }: IStoreState) => ({
  user
})

export default connect(mapStateToProps)(ProfileChangeLanguage)
