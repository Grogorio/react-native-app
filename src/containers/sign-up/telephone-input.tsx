import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpTelephoneFieldAction } from '../../store/actions'
import { isTelephoneValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpTelephoneInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(telephone: string) {
    this.props.dispatch(
      new SetSignUpTelephoneFieldAction({
        value: telephone,
        isValid: telephone.length === 0 || isTelephoneValid(telephone)
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.telephone,
  placeholder: `${literalsService.get('telephone', true)} (${literalsService.get('optional', true)})`
})
export default connect(mapStateToProps)(SignUpTelephoneInput)
