import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetChangePasswordNewPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileNewPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(newPassword: string) {
    this.props.dispatch(
      new SetChangePasswordNewPasswordAction({
        value: newPassword,
        isValid: isPasswordValid(newPassword)
      })
    )
  }
}

const mapStateToProps = ({ changePassword }: IStoreState) => ({
  field: changePassword.newPassword,
  placeholder: literalsService.get('newPassword')
})
export default connect(mapStateToProps)(ProfileNewPasswordInput)
