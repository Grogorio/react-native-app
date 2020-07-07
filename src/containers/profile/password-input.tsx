import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetChangePasswordPasswordAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfilePasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetChangePasswordPasswordAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ changePassword }: IStoreState) => ({
  field: changePassword.password,
  placeholder: literalsService.get('password')
})
export default connect(mapStateToProps)(ProfilePasswordInput)
