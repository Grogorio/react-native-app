import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles, textStyles, colors } from '../../styles'
import { Screen, ValidatedButton, Title } from '../../components'
import { IStoreState } from '../../store/states'
import { IValidatedInputField, IAWSError } from '../../models'
import { SignUpNewConfirmationCodeNifInput, NavigationHeader } from '../../containers'
import { resendSignUpConfirmationCodeActionThunk } from '../../store/thunks'
import { routes } from '../../navigation'
import { literalsService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  dni: IValidatedInputField<string>
  isCodeSent: boolean
  error: IAWSError
}

class SignUpNewConfirmationCode extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    return this.props.dni.isValid
  }

  private get errorWarning(): React.ReactNode {
    const { error } = this.props

    if (error && error.code === 'InvalidParameterException')
      return <Text style={globalStyles.errorText}>{literalsService.get('emailAlreadyConfirmated', true)}</Text>
    else if (error && error.code === 'UserNotFoundException')
      return <Text style={globalStyles.errorText}>{literalsService.get('emailNotRegistered', true)}</Text>
    else if (error && error.code === 'LimitExceededException')
      return <Text style={globalStyles.errorText}>{literalsService.get('changePasswordLimitExceededError', true)}</Text>
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    if (!this.props.isCodeSent && nextProps.isCodeSent)
      this.navigate(routes.signUpAccountVerificationStep.routeName, { isSignUpInProcess: false })
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onExitPress={this.handleBackPress} reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('writeYourNif', true)} />
          <Text style={styles.message}>{literalsService.get('willSendVerificationCode', true)}</Text>
          {this.errorWarning}
          <SignUpNewConfirmationCodeNifInput />
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
            onPress={this.handleValidatedButtonPress}
            isDisabled={!this.isEveryFieldValid}
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
    const { dispatch, dni } = this.props
    dispatch(resendSignUpConfirmationCodeActionThunk(dni.value))
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginBottom: 20,
    color: colors.black
  }
})

const mapStateToProps = ({ signUp }: IStoreState) => ({
  dni: signUp.newVerificationCodeNif,
  isCodeSent: signUp.isNewVerificationCodeSent,
  error: signUp.newVerificationCodeError
})

export default connect(mapStateToProps)(SignUpNewConfirmationCode)
