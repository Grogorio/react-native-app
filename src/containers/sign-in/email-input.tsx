import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedEmailInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignInEmailFieldAction } from '../../store/actions'
import { isEmailValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignInEmailInput extends ValidatedEmailInput<IBaseInputProps> {
  @autobind
  public handleChange(email: string) {
    this.props.dispatch(
      new SetSignInEmailFieldAction({
        value: email,
        isValid: isEmailValid(email)
      })
    )
  }
}

const mapStateToProps = ({ signIn }: IStoreState) => ({
  field: signIn.email,
  placeholder: literalsService.get('email')
})
export default connect(mapStateToProps)(SignInEmailInput)
