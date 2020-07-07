import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedEmailInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpNewConfirmationCodeNifFieldAction } from '../../store/actions'
import { isDniValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpNewConfirmationCodeNifInput extends ValidatedEmailInput<IBaseInputProps> {
  @autobind
  public handleChange(nif: string) {
    this.props.dispatch(
      new SetSignUpNewConfirmationCodeNifFieldAction({
        value: nif,
        isValid: isDniValid(nif)
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.newVerificationCodeNif,
  placeholder: literalsService.get('nationalIdentityDocument')
})
export default connect(mapStateToProps)(SignUpNewConfirmationCodeNifInput)
