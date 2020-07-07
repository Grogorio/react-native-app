import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { autobind } from 'core-decorators'
import { routes } from '../../navigation'
import { buttonStyles, globalStyles, textStyles, colors } from '../../styles'
import { Screen, Title } from '../../components'
import { literalsService } from '../../services'
import { NavigationHeader } from '../../containers'

interface IProps extends NavigationScreenProps, DispatchProp<any> {}

class SignUpConfirmation extends Screen<IProps> {
  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader reversed={true} />
        <View style={globalStyles.contentContainer}>
          <Title text={literalsService.get('confirmated', true)} />
          <Text style={styles.message}>{literalsService.get('nowBackToSignIn', true)}</Text>
          <TouchableOpacity style={buttonStyles.basic} onPress={this.handlePress}>
            <Text style={buttonStyles.basicText}>{literalsService.get('goBack').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  @autobind
  private handlePress(): void {
    this.reset(routes.signIn.routeName)
  }
}

const styles = StyleSheet.create({
  message: {
    ...textStyles.body,
    marginVertical: 20,
    color: colors.black
  }
})

export default connect(null)(SignUpConfirmation)
