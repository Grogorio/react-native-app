import React from 'react'
import { TextInput, View, Text, StyleProp, ViewStyle } from 'react-native'
import { colors, inputStyles } from '../../../styles'
import { capitalize } from '../../../utils'
import { literalsService } from '../../../services'
import { BaseInput, IBaseInputProps, IBaseInputState } from './base-input'

export abstract class ValidatedEmailInput<P extends IBaseInputProps> extends BaseInput<P, IBaseInputState> {
  private get invalidText(): string {
    const { error } = this.props.field
    if (error) return error.message
    return literalsService.get('invalidEmail', true)
  }

  private get invalidEmailWarning(): React.ReactNode {
    const { value, isValid, customError } = this.props.field
    if (!isValid && value && value.length && !customError && !this.state.isFocused) {
      return <Text style={inputStyles.warning}>{this.invalidText}</Text>
    }
  }

  private get customError(): React.ReactNode {
    if (this.state.isFocused) return null
    return this.props.field.customError
  }

  private get upperPlaceholder(): React.ReactNode {
    const { placeholder, field } = this.props
    if (this.state.isFocused || field.value)
      return <Text style={this.upperPlaceholderStyles}>{capitalize(placeholder)}</Text>
    return null
  }

  private get inputStyles(): StyleProp<ViewStyle> {
    const { isFocused } = this.state
    if (isFocused) return inputStyles.focusedInput
    else if (!isFocused && this.props.field.value) return inputStyles.validInput
    return inputStyles.emptyInput
  }

  private get upperPlaceholderStyles(): StyleProp<ViewStyle> {
    const { isFocused } = this.state
    if (isFocused) return inputStyles.focusedUpperPlaceholder
    else if (!isFocused && this.props.field.value) return inputStyles.validUpperPlaceholder
  }

  constructor(props: P) {
    super(props)
    this.state = { isFocused: false }
  }

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
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={field.value}
          onChangeText={this.handleChange}
        />
        {this.invalidEmailWarning}
        {this.customError}
      </View>
    )
  }
}
