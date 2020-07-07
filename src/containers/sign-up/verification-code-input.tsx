import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpVerificationCodeAction } from '../../store/actions'
import { isVerificationCodeValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpVerificationCodeInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(code: string) {
    this.props.dispatch(
      new SetSignUpVerificationCodeAction({
        value: code,
        isValid: isVerificationCodeValid(code)
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.verificationCode,
  placeholder: literalsService.get('verificationCode')
})
export default connect(mapStateToProps)(SignUpVerificationCodeInput)
