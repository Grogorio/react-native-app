export interface IValidatedInputField<T> {
  value: T
  isValid: boolean
  error?: Error
  customError?: React.ReactNode
}

export function generateValidatedInputField(value: any, isValid: boolean): IValidatedInputField<any> {
  return { value, isValid }
}

export const initialValidatedInputField: IValidatedInputField<any> = generateValidatedInputField(null, false)
