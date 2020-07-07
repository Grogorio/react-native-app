import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetCodeAction } from '../../store/actions'
import { isVerificationCodeValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class RecoverPasswordCodeInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(code: string) {
    this.props.dispatch(
      new SetCodeAction({
        value: code,
        isValid: isVerificationCodeValid(code)
      })
    )
  }
}

const mapStateToProps = ({ recoverPassword }: IStoreState) => ({
  field: recoverPassword.code,
  placeholder: literalsService.get('code')
})
export default connect(mapStateToProps)(RecoverPasswordCodeInput)
