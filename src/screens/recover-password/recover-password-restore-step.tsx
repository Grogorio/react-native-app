import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles, textStyles, colors } from '../../styles'
import { Screen, ValidatedButton, Title } from '../../components'
import { IStoreState } from '../../store/states'
import { IValidatedInputField, IAWSError } from '../../models'
import {
  NavigationHeader,
  RecoverPasswordCodeInput,
  RecoverPasswordValidationNewPasswordInput,
  RecoverPasswordNewPasswordInput
} from '../../containers'
import { requestRecoverPasswordChangeActionThunk } from '../../store/thunks'
import { ResetRecoverPasswordFieldsAction } from '../../store/actions'
import { routes } from '../../navigation'
import { literalsService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  code: IValidatedInputField<string>
  email: IValidatedInputField<string>
  newPassword: IValidatedInputField<string>
  validationNewPassword: IValidatedInputField<string>
  isPasswordRecovered: boolean
  error: IAWSError
}

class RecoverPasswordRestoreStep extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    const { email, newPassword, validationNewPassword } = this.props
    return email.isValid && newPassword.isValid && validationNewPassword.isValid
  }

  private get errorWarning(): React.ReactNode {
    const { error } = this.props
    if (error) return <Text style={globalStyles.errorText}>{literalsService.get('invalidRecoverPasswordCode')}</Text>
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const { isPasswordRecovered, dispatch } = nextProps
    if (isPasswordRecovered) {
      dispatch(new ResetRecoverPasswordFieldsAction())
      this.navigate(routes.signIn.routeName)
    }
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onExitPress={this.handleBackPress} reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('restoreYourPassword', true)} />
          <Text style={styles.message}>{literalsService.get('verificationCodeSentToYourEmail', true)}</Text>
          {this.errorWarning}
          <RecoverPasswordCodeInput touchEvent={true} />
          <RecoverPasswordNewPasswordInput touchEvent={true} />
          <RecoverPasswordValidationNewPasswordInput hidePolicy={true} touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('save').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
            style={{ marginTop: 'auto' }}
          />
        </View>
      </View>
    )
  }

  @autobind
  public handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { dispatch, email, newPassword, code } = this.props
    dispatch(requestRecoverPasswordChangeActionThunk(email.value, code.value, newPassword.value))
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginBottom: 20,
    color: colors.black
  }
})

const mapStateToProps = ({ recoverPassword }: IStoreState) => ({
  email: recoverPassword.dni,
  code: recoverPassword.code,
  newPassword: recoverPassword.newPassword,
  validationNewPassword: recoverPassword.validationNewPassword,
  isPasswordRecovered: recoverPassword.isPasswordRecovered,
  error: recoverPassword.error
})

export default connect(mapStateToProps)(RecoverPasswordRestoreStep)
