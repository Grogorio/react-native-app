import { DispatchProp } from 'react-redux'
import { IValidatedInputField } from '../../../models'

export interface IInputProps extends DispatchProp {
  field: IValidatedInputField<string>
  placeholder: string
  hidePolicy?: boolean
}

export interface IAutocompleteInputProps extends IInputProps {
  suggestions: string[]
}

export * from './validated-email-input'
export * from './validated-password-input'
export * from './validated-text-input'
export * from './autocomplete-input'
export * from './autocomplete-option'
export * from './dropdown-input'
export * from './quantity-input'
