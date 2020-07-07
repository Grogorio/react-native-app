import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetNewPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class RecoverPasswordNewPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetNewPasswordAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ recoverPassword }: IStoreState) => ({
  field: recoverPassword.newPassword,
  placeholder: literalsService.get('password')
})
export default connect(mapStateToProps)(RecoverPasswordNewPasswordInput)
