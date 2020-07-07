import * as React from 'react'
import { TextInput, View, Text, StyleProp, ViewStyle } from 'react-native'
import { globalStyles, inputStyles, colors } from '../../../styles'
import { capitalize } from '../../../utils'
import { literalsService } from '../../../services'
import { BaseInput, IBaseInputProps, IBaseInputState } from './base-input'

export abstract class ValidatedTextInput<P extends IBaseInputProps, S extends IBaseInputState> extends BaseInput<P, S> {
  private get invalidTextWarning(): React.ReactNode {
    const { value, isValid } = this.props.field
    if (!isValid && value && !this.state.isFocused) {
      return <Text style={globalStyles.inputWarning}>{this.invalidText}</Text>
    }
  }

  private get invalidText(): string {
    const { error } = this.props.field
    if (error) return error.message
    return literalsService.get('formatNotValid', true)
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
          underlineColorAndroid="transparent"
          keyboardType="default"
          autoCapitalize="none"
          value={field.value}
          onChangeText={this.handleChange}
        />
        {this.invalidTextWarning}
      </View>
    )
  }
}
