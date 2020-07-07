import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetValidationNewPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class RecoverPasswordValidationNewPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetValidationNewPasswordAction({
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

const mapStateToProps = ({ recoverPassword }: IStoreState) => ({
  field: recoverPassword.validationNewPassword,
  mirrorField: recoverPassword.newPassword,
  placeholder: literalsService.get('repeatPassword')
})
export default connect(mapStateToProps)(RecoverPasswordValidationNewPasswordInput)
