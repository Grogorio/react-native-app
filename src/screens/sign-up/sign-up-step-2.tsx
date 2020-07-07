import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { View, KeyboardAvoidingView } from 'react-native'
import { autobind } from 'core-decorators'
import { globalStyles } from '../../styles'
import { routes } from '../../navigation'
import { SignUpNameInput, SignUpLastNameInput, SignUpDniInput, NavigationHeader } from '../../containers'
import { IValidatedInputField } from '../../models'
import { IStoreState } from '../../store/states'
import { ValidatedButton, Screen, StepIndicator, Title } from '../../components'
import { literalsService, storageService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  name: IValidatedInputField<string>
  lastName: IValidatedInputField<string>
  dni: IValidatedInputField<string>
}

class SignUpStep2 extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    const { name, lastName, dni } = this.props
    return name.isValid && lastName.isValid && dni.isValid
  }

  public render(): React.ReactNode {
    return (
      <KeyboardAvoidingView style={globalStyles.screen} behavior="position" keyboardVerticalOffset={-150}>
        <NavigationHeader reversed={true} onBackPress={this.handleBackPress} />
        <View style={globalStyles.contentContainer}>
          <StepIndicator active={2} amount={3} />
          <Title text={literalsService.get('whoAreYou', true)} />
          <SignUpNameInput touchEvent={true} />
          <SignUpLastNameInput touchEvent={true} />
          <SignUpDniInput check={true} touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
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
    this.navigate(routes.signUpStep3.routeName)
  }

  @autobind
  private async handleBackPress(): Promise<void> {
    await storageService.cleanAutoSignInValues()
    this.goBack()
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  name: signUp.name,
  lastName: signUp.lastName,
  dni: signUp.dni
})

export default connect(mapStateToProps)(SignUpStep2)
