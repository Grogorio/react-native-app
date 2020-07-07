import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignInPasswordFieldAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignInPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetSignInPasswordFieldAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ signIn }: IStoreState) => ({
  field: signIn.password,
  placeholder: literalsService.get('password')
})
export default connect(mapStateToProps)(SignInPasswordInput)
