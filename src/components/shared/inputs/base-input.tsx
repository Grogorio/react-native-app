import React from 'react'
import { autobind } from 'core-decorators'
import { DispatchProp } from 'react-redux'
import { IValidatedInputField } from '../../../models'

export interface IBaseInputProps extends DispatchProp<any> {
  field: IValidatedInputField<string>
  placeholder: string
  mirrorField?: IValidatedInputField<string>
  check?: boolean
  hidePolicy?: boolean
  touchEvent?: boolean
  onErrorPress?: () => void
}

export interface IBaseAutocompleteInputProps extends IBaseInputProps {
  suggestions: string[]
}

export interface IBaseInputState {
  isFocused: boolean
}

export interface IBaseAutocompleteState extends IBaseInputState {
  searchValue: string
  isSearchValueValid: boolean
}

export abstract class BaseInput<P extends IBaseInputProps, S extends IBaseInputState> extends React.Component<P, S> {
  public abstract handleChange(text: string): void

  @autobind
  public handleFocus() {
    this.setState({ isFocused: true })
  }

  @autobind
  public handleBlur() {
    this.setState({ isFocused: false })
  }
}
