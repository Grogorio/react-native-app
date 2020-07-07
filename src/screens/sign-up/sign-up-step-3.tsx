import React from 'react'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { View, KeyboardAvoidingView } from 'react-native'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { SignUpTelephoneInput, NavigationHeader } from '../../containers'
import { IValidatedInputField } from '../../models'
import { IStoreState, ISignUpState } from '../../store/states'
import { ValidatedButton, StepIndicator, Screen, Title } from '../../components'
import { signUpActionThunk } from '../../store/thunks'
import { routes, ISignUpAccountVerificationStepScreenParams } from '../../navigation'
import { storageService, literalsService } from '../../services'
import { sanitizeTelephone } from '../../utils'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  telephone: IValidatedInputField<string>
  signUp: ISignUpState
}

class SignUpStep3 extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    const { telephone } = this.props
    return telephone.isValid
  }

  public async UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const { signUp } = nextProps
    if (!signUp.isSignedUpSuccesfully) return
    await storageService.setSignUpEmail(signUp.email)
    this.goToVerification()
  }

  @autobind
  public handleBackPress(): void {
    this.goBack()
  }

  public render(): React.ReactNode {
    return (
      <KeyboardAvoidingView style={globalStyles.screen} behavior="position" keyboardVerticalOffset={-150}>
        <NavigationHeader reversed={true} onBackPress={this.handleBackPress} />
        <View style={globalStyles.contentContainer}>
          <StepIndicator active={3} amount={3} />
          <Title text={literalsService.get('userInfo', true)} />
          <SignUpTelephoneInput touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('send').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
            style={{ marginTop: 30 }}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { signUp, dispatch } = this.props

    dispatch(
      signUpActionThunk({
        name: signUp.name.value,
        lastName: signUp.lastName.value,
        dni: signUp.dni.value,
        email: signUp.email.value,
        password: signUp.password.value,
        telephone: sanitizeTelephone(signUp.telephone.value),
        locale: 'ca_ES'
      })
    )
  }

  private goToVerification() {
    const { navigation } = this.props
    const params: ISignUpAccountVerificationStepScreenParams = {
      isSignUpInProcess: true
    }
    navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routes.signUpAccountVerificationStep.routeName, params })]
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  telephone: signUp.telephone,
  signUp
})

export default connect(mapStateToProps)(SignUpStep3)
