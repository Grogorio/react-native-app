import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { ResetSignInFieldsAction } from '../store/actions'
import { signInActionThunk, fetchPenaltiesActionThunk } from '../store/thunks'
import { IStoreState } from '../store/states'
import { routes } from '../navigation'
import { globalStyles, textStyles, colors, inputStyles } from '../styles'
import { SignInEmailInput, SignInPasswordInput, NavigationHeader } from '../containers'
import { IValidatedInputField, IAWSError } from '../models'
import { Screen, ValidatedButton, Title, IScreenState } from '../components'
import { literalsService } from '../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  isUserSignedIn: boolean
  email: IValidatedInputField<string>
  password: IValidatedInputField<string>
  error: IAWSError
  isNewPasswordRequired: boolean
  havePenalties: boolean
}

interface IState extends IScreenState {
  isSigningIn: boolean
}

class SignIn extends Screen<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { ...this.state, isSigningIn: false }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    // TODO: revisar estos ifs
    if (nextProps.isUserSignedIn) this.handleUserSignedIn(nextProps.havePenalties)
    if (nextProps.error) this.setState({ isSigningIn: false })
    if (nextProps.isNewPasswordRequired) this.navigate(routes.newPasswordRequired.routeName)
  }

  public get isEveryFieldValid() {
    const { email, password } = this.props
    return email.isValid && password.isValid && !this.state.isSigningIn
  }

  private get signInErrorWarning(): React.ReactNode {
    const { error } = this.props
    if (!error) return

    if (error.code === 'UserNotFoundException')
      return <Text style={globalStyles.errorText}>{literalsService.get('userNotFound')}</Text>
    else if (error.code === 'NotAuthorizedException' && error.message === 'Incorrect username or password.')
      return <Text style={globalStyles.errorText}>{literalsService.get('invalidSignInParams', true)}</Text>
    else if (
      error.code === 'NotAuthorizedException' &&
      error.message === 'User account has expired, it must be reset by an administrator.'
    )
      return <Text style={globalStyles.errorText}>{literalsService.get('userExpired')}</Text>

    return <Text style={globalStyles.errorText}>{ this.unhandledError }</Text>
  }

  private get unhandledError(): React.ReactNode {
    return (
      <Text style={inputStyles.warning}>
        {`${literalsService.get('unhandledError', true)} `}
        <Text style={[inputStyles.warning, { textDecorationLine: 'underline' }]} onPress={this.goToInformation}>
          {`${literalsService.get('here')}.`}
        </Text>
      </Text>
    )
  }

  public render(): React.ReactNode {
    if (this.state.isSigningIn) return this.spinner
    return (
      <View style={globalStyles.screen}>
        {this.connectionStatus}
        <NavigationHeader onExitPress={this.goToWelcome} reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('signIn', true)} />
          <Text style={styles.message}>{literalsService.get('thanksForUsing', true)}</Text>
          {this.signInErrorWarning}
          <SignInEmailInput touchEvent={true} />
          <SignInPasswordInput hidePolicy={true} touchEvent={true} />
          <Text style={[globalStyles.link, styles.link]} onPress={this.goToRecoverPassword}>
            {literalsService.get('forgottenPassword', true)}
          </Text>
          <ValidatedButton
            label={literalsService.get('signIn').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid || !this.state.isConnected}
            style={{ marginTop: 'auto', marginBottom: 40 }}
          />
          <Text style={styles.noUserMessage}>
            {`${literalsService.get('dontYouHaveAccount', true)} `}
            <Text style={styles.noUserLink} onPress={this.goToSignUp}>{literalsService.get('signUp', true)}</Text>
          </Text>
          <View style={styles.bottomLinks}>
            <Text style={styles.bottomLink} onPress={this.goToInformation}>
              {literalsService.get('contact').toUpperCase()}
            </Text>
            <Text style={styles.bottomLink} onPress={this.goToLegalNotice}>
              {literalsService.get('legalNotice').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  @autobind
  private handleValidatedButtonPress(): void {
    const { email, password, dispatch } = this.props
    this.setState({ isSigningIn: true })
    dispatch(
      signInActionThunk({
        email: email.value,
        password: password.value
      })
    )
    dispatch(fetchPenaltiesActionThunk())
  }

  @autobind
  private goToWelcome(): void {
    this.reset(routes.welcome.routeName)
    this.props.dispatch(new ResetSignInFieldsAction())
  }

  @autobind
  private goToRecoverPassword(): void {
    this.navigate(routes.recoverPasswordRequestCodeStep.routeName)
    this.props.dispatch(new ResetSignInFieldsAction())
  }

  @autobind
  private goToSignUp(): void {
    this.navigate(routes.signUpStep1.routeName)
  }

  @autobind
  private async goToLegalNotice(): Promise<void> {
    const url = 'http://www.amb.cat/es/web/amb/avis-legal'
    const supported = await Linking.canOpenURL(url)
    if (supported) Linking.openURL(url)
  }

  @autobind
  private goToInformation(): void {
    this.navigate(routes.information.routeName, { reversed: true })
    this.props.dispatch(new ResetSignInFieldsAction())
  }
}

const styles = StyleSheet.create({
  validatedButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  message: {
    ...textStyles.body,
    color: colors.black,
    marginBottom: 10
  },
  link: {
    ...textStyles.button,
    marginTop: 15
  },
  bottomLinks: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginBottom: 40,
    justifyContent: 'space-between'
  },
  bottomLink: {
    ...textStyles.body,
    color: colors.greyDark
  },
  noUserMessage: {
    ...textStyles.button,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 40
  },
  noUserLink: {
    ...textStyles.button,
    color: colors.purple
  }
})

const mapStateToProps = ({ ui, signIn, penaltiesInfo }: IStoreState) => ({
  isUserSignedIn: ui.isUserSignedIn,
  email: signIn.email,
  password: signIn.password,
  error: signIn.error,
  isNewPasswordRequired: signIn.isNewPasswordRequired,
  havePenalties: penaltiesInfo.reservations.length > 3
})

export default connect(mapStateToProps)(SignIn)
