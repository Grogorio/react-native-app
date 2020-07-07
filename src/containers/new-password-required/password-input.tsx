import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetNewPasswordRequiredPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class NewPasswordRequiredPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetNewPasswordRequiredPasswordAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ newPasswordRequired }: IStoreState) => ({
  field: newPasswordRequired.password,
  placeholder: literalsService.get('password')
})
export default connect(mapStateToProps)(NewPasswordRequiredPasswordInput)
