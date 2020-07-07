import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { View, KeyboardAvoidingView } from 'react-native'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { signUpRoutes, routes } from '../../navigation'
import {
  SignUpEmailInput,
  SignUpPasswordInput,
  SignUpValidationPasswordInput,
  NavigationHeader
} from '../../containers'
import { IValidatedInputField } from '../../models'
import { IStoreState } from '../../store/states'
import { ResetSignUpFieldsAction } from '../../store/actions'
import { ValidatedButton, StepIndicator, Screen, Title } from '../../components'
import { literalsService, storageService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  email: IValidatedInputField<string>
  password: IValidatedInputField<string>
  validationPassword: IValidatedInputField<string>
  isConnected: boolean
}

class SignUpStep1 extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    const { email, password, validationPassword } = this.props
    return email.isValid && password.isValid && validationPassword.isValid
  }

  public render(): React.ReactNode {
    const { isConnected } = this.props
    return (
      <KeyboardAvoidingView style={globalStyles.screen} behavior="position" keyboardVerticalOffset={-150}>
        {this.connectionStatus}
        <NavigationHeader reversed={true} onBackPress={this.handleBackPress} />
        <View style={globalStyles.contentContainer}>
          <StepIndicator active={1} amount={3} />
          <Title text={literalsService.get('userInfo', true)} />
          <SignUpEmailInput onErrorPress={this.goToSignIn} check={true} touchEvent={true} />
          <SignUpPasswordInput touchEvent={true} />
          <SignUpValidationPasswordInput hidePolicy={true} touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid && isConnected}
            style={{ marginTop: 30 }}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
    this.props.dispatch(new ResetSignUpFieldsAction())
  }

  @autobind
  private goToSignIn(): void {
    this.reset(routes.signIn.routeName)
    this.props.dispatch(new ResetSignUpFieldsAction())
  }

  @autobind
  private async handleValidatedButtonPress(): Promise<void> {
    const { email, password } = this.props
    await storageService.setAutoSignInValues({ email: email.value, password: password.value })
    this.navigate(signUpRoutes.signUpStep2.routeName)
  }
}

const mapStateToProps = ({ ui, signUp }: IStoreState) => ({
  email: signUp.email,
  password: signUp.password,
  validationPassword: signUp.validationPassword,
  isConnected: ui.isConnected
})

export default connect(mapStateToProps)(SignUpStep1)
