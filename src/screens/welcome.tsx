import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { routes, ISignUpAccountVerificationStepScreenParams } from '../navigation'
import { globalStyles } from '../styles'
import { literalsService } from '../services'
import { Image, ValidatedButton, Screen } from '../components'
import { DispatchProp, connect } from 'react-redux'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  havePenalties: boolean
}

class Welcome extends Screen<IProps> {
  public get verificationCodeLink(): React.ReactNode {
    if (!this.state.isConnected) return null
    return (
      <Text style={globalStyles.link} onPress={this.goToVerification}>
        {literalsService.get('introduceVerificationCode')}
      </Text>
    )
  }

  public render(): React.ReactNode {
    const { isConnected } = this.state
    return (
      <View style={[globalStyles.screen, { paddingBottom: 40 }]}>
        {this.connectionStatus}
        <View style={globalStyles.fullAlignedcontainer}>
          <Image name={'logoPurple'} size={{ width: 203, height: 55 }} />
        </View>
        <ValidatedButton
          onPress={this.goToSignIn}
          label={literalsService.get('signIn').toUpperCase()}
          isDisabled={!isConnected}
        />
        <ValidatedButton
          onPress={this.goToSignUp}
          isReversed={true}
          label={literalsService.get('createAccount').toUpperCase()}
          isDisabled={!isConnected}
        />
        { this.verificationCodeLink }
      </View>
    )
  }

  @autobind
  private goToSignIn() {
    this.props.navigation.navigate(routes.signIn.routeName)
  }

  @autobind
  private goToSignUp() {
    this.props.navigation.navigate(routes.signUpStep1.routeName)
  }

  @autobind
  private goToVerification() {
    const params: ISignUpAccountVerificationStepScreenParams = {
      isSignUpInProcess: false
    }
    this.props.navigation.navigate(routes.signUpAccountVerificationStep.routeName, params)
  }
}

export default connect(null)(Welcome)
