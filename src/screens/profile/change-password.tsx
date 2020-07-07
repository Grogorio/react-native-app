import React from 'react'
import { View, Text } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { Screen, ScreenHeader, ValidatedButton } from '../../components'
import { NavigationHeader, ProfilePasswordInput, ProfileNewPasswordInput } from '../../containers'
import { literalsService } from '../../services'
import { IStoreState } from '../../store/states'
import { IValidatedInputField, IAWSError } from '../../models'
import { changePasswordActionThunk } from '../../store/thunks'
import { routes } from '../../navigation'
import { ResetChangePasswordFieldsAction } from '../../store/actions'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  password: IValidatedInputField<string>
  newPassword: IValidatedInputField<string>
  error: IAWSError
}

class ProfileChangePassword extends Screen<IProps> {
  private get isEveryFieldValid(): boolean {
    const { password, newPassword } = this.props
    return password.isValid && newPassword.isValid
  }

  private get errorWarning(): React.ReactNode {
    const { error } = this.props
    if (error && error.code === 'LimitExceededException')
      return <Text style={globalStyles.errorText}>{literalsService.get('changePasswordLimitExceededError')}</Text>
    else if (error && error.code === 'InvalidParameterException')
      return <Text style={globalStyles.errorText}>{literalsService.get('changePasswordInvalidPasswordError')}</Text>
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onBackPress={this.handleBackPress} />
        <ScreenHeader title={literalsService.get('changePassword').toUpperCase()} />
        <View style={globalStyles.contentContainer}>
          {this.errorWarning}
          <ProfilePasswordInput hidePolicy={true} touchEvent={true} />
          <ProfileNewPasswordInput touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('save')}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
            style={{ marginTop: 'auto' }}
          />
        </View>
      </View>
    )
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { dispatch, password, newPassword } = this.props
    dispatch(
      changePasswordActionThunk(password.value, newPassword.value, () => {
        this.reset(routes.profile.routeName)
        dispatch(new ResetChangePasswordFieldsAction())
      })
    )
  }
}

const mapStateToProps = ({ changePassword }: IStoreState) => ({
  password: changePassword.password,
  newPassword: changePassword.newPassword,
  error: changePassword.error
})

export default connect(mapStateToProps)(ProfileChangePassword)
