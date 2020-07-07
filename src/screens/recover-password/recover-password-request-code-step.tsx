import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles, textStyles, colors } from '../../styles'
import { Screen, ValidatedButton, Title } from '../../components'
import { IStoreState } from '../../store/states'
import { IValidatedInputField, IAWSError } from '../../models'
import { RecoverPasswordDniInput, NavigationHeader } from '../../containers'
import { requestRecoverPasswordCodeActionThunk } from '../../store/thunks'
import { routes } from '../../navigation'
import { literalsService } from '../../services'
import { ResetSignInFieldsAction } from '../../store/actions'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  dni: IValidatedInputField<string>
  isCodeSent: boolean
  error: IAWSError
}

class RecoverPasswordRequestCodeStep extends Screen<IProps> {
  public get isEveryFieldValid(): boolean {
    return this.props.dni.isValid
  }

  private get errorWarning(): React.ReactNode {
    const { error } = this.props
    if (error) return <Text style={globalStyles.errorText}>{literalsService.get(error.code)}</Text>
  }

  public componentDidMount() {
    this.props.dispatch(new ResetSignInFieldsAction())
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    if (!this.props.isCodeSent && nextProps.isCodeSent) this.navigate(routes.recoverPasswordRestoreStep.routeName)
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onExitPress={this.handleBackPress} reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('writeYourNif', true)} />
          <Text style={styles.message}>{literalsService.get('willSendVerificationCode', true)}</Text>
          {this.errorWarning}
          <RecoverPasswordDniInput touchEvent={true} />
          <ValidatedButton
            label={literalsService.get('next').toUpperCase()}
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
    const { dispatch, dni } = this.props
    dispatch(requestRecoverPasswordCodeActionThunk(dni.value))
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
  dni: recoverPassword.dni,
  isCodeSent: recoverPassword.isCodeSent,
  error: recoverPassword.error
})

export default connect(mapStateToProps)(RecoverPasswordRequestCodeStep)
