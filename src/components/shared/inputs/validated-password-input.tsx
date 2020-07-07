import * as React from 'react'
import { TextInput, View, Text, StyleProp, ViewStyle } from 'react-native'
import { colors, inputStyles, textStyles } from '../../../styles'
import { capitalize } from '../../../utils'
import { literalsService } from '../../../services'
import { BaseInput, IBaseInputProps, IBaseInputState } from './base-input'
import { verticalScale } from 'react-native-size-matters'

// tslint:disable-next-line:max-line-length
export abstract class ValidatedPasswordInput<P extends IBaseInputProps> extends BaseInput<P, IBaseInputState> {
  private get invalidPasswordWarning(): React.ReactNode {
    const { value, isValid } = this.props.field
    if (!isValid && value && value.length && !this.state.isFocused) {
      return <Text style={inputStyles.warning}>{literalsService.get('passwordNotValid', true)}</Text>
    }
  }

  private get upperPlaceholder(): React.ReactNode {
    const { placeholder, field } = this.props
    if (this.state.isFocused || field.value)
      return <Text style={this.upperPlaceholderStyles}>{capitalize(placeholder)}</Text>
    return null
  }

  private get inputStyles(): StyleProp<ViewStyle> {
    const { isFocused } = this.state
    const { field } = this.props
    if (isFocused) return inputStyles.focusedInput
    else if (!isFocused && field.value && field.isValid) return inputStyles.validInput
    else if (!isFocused && field.value && !field.isValid) return inputStyles.invalidInput
    return inputStyles.emptyInput
  }

  private get upperPlaceholderStyles(): StyleProp<ViewStyle> {
    const { isFocused } = this.state
    const { field } = this.props
    if (isFocused) return inputStyles.focusedUpperPlaceholder
    else if (!isFocused && field.value && field.isValid) return inputStyles.validUpperPlaceholder
    else if (!isFocused && field.value && !field.isValid) return inputStyles.invalidUpperPlaceholder
  }

  private get policyMessage(): React.ReactNode {
    if (this.props.hidePolicy) return null
    return (
      <Text style={{ ...textStyles.caption, color: colors.black, marginBottom: verticalScale(20) }}>
        {literalsService.get('passwordPolicy', true)}
      </Text>
    )
  }

  constructor(props: P) {
    super(props)
    this.state = { isFocused: false }
  }

  public abstract handleChange(text: string): void

  public render(): React.ReactNode {
    const { field, placeholder } = this.props
    return (
      <View>
        {this.upperPlaceholder}
        <TextInput
          style={this.inputStyles}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholderTextColor={colors.greyDark}
          placeholder={capitalize(placeholder)}
          keyboardType="default"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          value={field.value}
          onChangeText={this.handleChange}
        />
        {this.invalidPasswordWarning}
        {this.policyMessage}
      </View>
    )
  }
}
