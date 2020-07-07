import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles, textStyles, colors } from '../styles'
import { Screen, ValidatedButton, Title } from '../components'
import { IStoreState } from '../store/states'
import { IValidatedInputField } from '../models'
import {
  NavigationHeader,
  NewPasswordRequiredPasswordInput,
  NewPasswordRequiredValidationPasswordInput
} from '../containers'
import { literalsService, authenticationService } from '../services'
import { routes } from '../navigation'
import { ResetNewPasswordRequiredFieldsAction } from '../store/actions'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  password: IValidatedInputField<string>
  validationPassword: IValidatedInputField<string>
  cognitoUser: any
}

class NewPasswordRequired extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    const { password, validationPassword } = this.props
    return password.isValid && validationPassword.isValid
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onExitPress={this.handleBackPress} reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('setYourPassword', true)} />
          <Text style={styles.message}>{literalsService.get('changePasswordSpecification', true)}</Text>
          <NewPasswordRequiredPasswordInput touchEvent={true} />
          <NewPasswordRequiredValidationPasswordInput hidePolicy={true} touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('save').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
          />
        </View>
      </View>
    )
  }

  @autobind
  public handleBackPress(): void {
    this.reset(routes.signIn.routeName)
  }

  @autobind
  private async handleValidatedButtonPress(): Promise<void> {
    const { cognitoUser, password, dispatch } = this.props
    try {
      await authenticationService.completeNewPassword(cognitoUser, password.value)
      this.goBack()
    } catch (error) {
      throw new Error(error)
    }
    dispatch(new ResetNewPasswordRequiredFieldsAction())
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginBottom: 20,
    color: colors.black
  }
})

const mapStateToProps = ({ newPasswordRequired }: IStoreState) => ({
  password: newPasswordRequired.password,
  validationPassword: newPasswordRequired.validationPassword,
  cognitoUser: newPasswordRequired.cognitoUser
})

export default connect(mapStateToProps)(NewPasswordRequired)
