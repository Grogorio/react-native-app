import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { NavigationScreenProps } from 'react-navigation'
import { View, Text, StyleSheet } from 'react-native'
import { ValidatedButton, Screen, Title, IScreenState } from '../../components'
import { IStoreState } from '../../store/states'
import { IValidatedInputField, IAWSError } from '../../models'
import { routes, ISignUpAccountVerificationStepScreenParams } from '../../navigation'
import { SignUpVerificationCodeInput, NavigationHeader, SignUpDniInput } from '../../containers'
import { storageService, literalsService } from '../../services'
import { SetSignUpEmailFieldAction } from '../../store/actions'
import { confirmSignUpActionThunk, signInActionThunk } from '../../store/thunks'
import { globalStyles, textStyles, colors } from '../../styles'

export interface IProps extends NavigationScreenProps, DispatchProp<any> {
  verificationCode: IValidatedInputField<string>
  dni: IValidatedInputField<string>
  verificationError: IAWSError
  isAccountVerified: boolean
  isUserSignedIn: boolean
}

interface IState extends IScreenState {
  isSigningIn: boolean
}

class SignUpAccountVerificationStep extends Screen<IProps, IState> {
  public get isEveryFieldValid(): boolean {
    const { verificationCode, dni, verificationError } = this.props
    return dni.isValid && verificationCode.isValid && !verificationError
  }

  private get verificationCodeErrorWarning(): React.ReactNode {
    const { verificationError } = this.props
    if (verificationError)
      return <Text style={globalStyles.errorText}>{literalsService.get('invalidVerificationCode')}</Text>
  }

  private get SignUpEmailInput(): React.ReactNode {
    if (!this.screenParams.isSignUpInProcess) return <SignUpDniInput touchEvent={true} />
  }

  private get NavigationHeader(): React.ReactNode {
    if (!this.screenParams.isSignUpInProcess)
      return <NavigationHeader onBackPress={this.handleBackPress} reversed={true} />
    return <NavigationHeader reversed={true} />
  }

  private get message(): React.ReactNode {
    if (!this.screenParams.isSignUpInProcess) return null
    return <Text style={styles.message}>{literalsService.get('verificationCodeSentToYourEmail', true)}</Text>
  }

  constructor(props: IProps) {
    super(props)
    this.state = { ...this.state, isSigningIn: false }
  }

  public async UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const { isAccountVerified, isUserSignedIn } = nextProps

    if (isAccountVerified && !isUserSignedIn) {
      this.setState({ isSigningIn: true })
      const autoSignInValues = await storageService.getAutoSignInValues()
      await storageService.cleanSignUpEmail()
      this.props.dispatch(signInActionThunk(autoSignInValues))
    } else if (isAccountVerified && isUserSignedIn) this.handleUserSignedIn(false)
  }

  public async componentDidMount() {
    const latentEmailField = await storageService.getSignUpEmail()
    const isSignUpInProcess = this.screenParams.isSignUpInProcess as ISignUpAccountVerificationStepScreenParams
    if (!isSignUpInProcess && latentEmailField) this.props.dispatch(new SetSignUpEmailFieldAction(latentEmailField))
  }
  // public async UNSAFE_componentWillMount() {
  //   const latentEmailField = await storageService.getSignUpEmail()
  //   const isSignUpInProcess = this.screenParams.isSignUpInProcess as ISignUpAccountVerificationStepScreenParams
  //   if (!isSignUpInProcess && latentEmailField) this.props.dispatch(new SetSignUpEmailFieldAction(latentEmailField))
  // }

  public render(): React.ReactNode {
    if (this.state.isSigningIn) return this.spinner
    return (
      <View style={[globalStyles.screen, { paddingBottom: 40 }]}>
        {this.NavigationHeader}
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('checkYourEmail', true)} />
          {this.verificationCodeErrorWarning}
          {this.message}
          {this.SignUpEmailInput}
          <SignUpVerificationCodeInput touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('send').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
            style={{ marginTop: 'auto' }}
          />
          <Text style={globalStyles.link} onPress={this.goToNewConfirmationCode}>
            {literalsService.get('requestNewSignUpVerificationCode')}
          </Text>
        </View>
      </View>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { dni, verificationCode, dispatch } = this.props
    dispatch(confirmSignUpActionThunk(dni.value, verificationCode.value))
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private goToNewConfirmationCode(): void {
    this.navigate(routes.signUpNewConfirmationCode.routeName)
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginBottom: 20,
    color: colors.black
  }
})

const mapStateToProps = ({ signUp, ui }: IStoreState) => ({
  verificationCode: signUp.verificationCode,
  isAccountVerified: signUp.isAccountVerified,
  verificationError: signUp.verificationError,
  dni: signUp.dni,
  isUserSignedIn: ui.isUserSignedIn
})

export default connect(mapStateToProps)(SignUpAccountVerificationStep)
