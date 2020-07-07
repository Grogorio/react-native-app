import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetNewPasswordRequiredVerificationPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class NewPasswordRequiredValidationPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetNewPasswordRequiredVerificationPasswordAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ newPasswordRequired }: IStoreState) => ({
  field: newPasswordRequired.validationPassword,
  placeholder: literalsService.get('repeatPassword')
})
export default connect(mapStateToProps)(NewPasswordRequiredValidationPasswordInput)
