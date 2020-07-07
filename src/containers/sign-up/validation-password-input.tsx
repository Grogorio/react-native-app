import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpValidationPasswordFieldAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpValidationPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetSignUpValidationPasswordFieldAction({
        value: password,
        isValid: this.validatePassword(password)
      })
    )
  }

  private validatePassword(validationPassword: string): boolean {
    const { mirrorField } = this.props
    return isPasswordValid(validationPassword) && mirrorField.isValid && mirrorField.value === validationPassword
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.validationPassword,
  mirrorField: signUp.password,
  placeholder: literalsService.get('repeatPassword')
})
export default connect(mapStateToProps)(SignUpValidationPasswordInput)
