import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedPasswordInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpPasswordFieldAction } from '../../store/actions'
import { isPasswordValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpPasswordInput extends ValidatedPasswordInput<IBaseInputProps> {
  @autobind
  public handleChange(password: string) {
    this.props.dispatch(
      new SetSignUpPasswordFieldAction({
        value: password,
        isValid: isPasswordValid(password)
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.password,
  placeholder: literalsService.get('password')
})
export default connect(mapStateToProps)(SignUpPasswordInput)
