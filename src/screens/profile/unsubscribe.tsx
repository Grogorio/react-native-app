import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { DispatchProp, connect } from 'react-redux'
import { globalStyles, textStyles, colors } from '../../styles'
import { Screen, ScreenHeader, DropdownInput, IActionSheet, ValidatedButton, Spinner } from '../../components'
import { NavigationHeader } from '../../containers'
import { literalsService, userService, paramsService } from '../../services'
import { signOutActionThunk } from '../../store/thunks'

interface IProps extends NavigationScreenProps, DispatchProp<any> {}

interface IState {
  isNavigatorReseting: boolean
  reasons: IActionSheet<string>[]
  reason: string
  isConnected: boolean
}

class ProfileUnsubscribe extends Screen<IProps, IState> {
  public async componentDidMount() {
    const reasons = await paramsService.getUnsubscribeReasons()
    this.setState({ reasons: reasons.map(r => ({ value: r.key, literal: r.label })) })
  }

  private get isEveryFieldValid(): boolean {
    return !!this.state.reason
  }

  private get renderReasons(): React.ReactNode {
    const { reason, reasons } = this.state
    if (!reasons)
      return (
        <View style={globalStyles.fullAlignedcontainer}>
          <Spinner />
        </View>
      )
    return (
      <View style={globalStyles.contentContainer}>
        <Text style={styles.message}>{literalsService.get('sadToSeeYouGo', true)}</Text>
        <DropdownInput
          label={reason || literalsService.get('chooseAReason', true)}
          actions={reasons}
          onActionPress={this.handleActionPress}
        />
        <ValidatedButton
          label={literalsService.get('confirmUnsubscribe').toUpperCase()}
          onPress={this.handleValidatedButtonPress}
          isDisabled={!this.isEveryFieldValid}
          style={styles.validatedButton}
        />
      </View>
    )
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onBackPress={this.handleBackPress} />
        <ScreenHeader title={literalsService.get('unsubscribe').toUpperCase()} />
        {this.renderReasons}
      </View>
    )
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }

  @autobind
  private handleActionPress(action: IActionSheet<string>): void {
    if (action) this.setState({ reason: action.value })
    else this.setState({ reason: null })
  }

  @autobind
  private async handleValidatedButtonPress(): Promise<void> {
    try {
      await userService.deleteUser(this.state.reason)
      this.props.dispatch(signOutActionThunk())
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default connect(() => ({}))(ProfileUnsubscribe)

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginBottom: 30,
    color: colors.black
  },
  validatedButton: {
    marginTop: 'auto'
  }
})
