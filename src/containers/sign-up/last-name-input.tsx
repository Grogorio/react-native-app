import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpLastNameFieldAction } from '../../store/actions'
import { isTextValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpLastNameInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(lastName: string) {
    this.props.dispatch(
      new SetSignUpLastNameFieldAction({
        value: lastName,
        isValid: isTextValid(lastName)
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.lastName,
  placeholder: literalsService.get('lastnames')
})
export default connect(mapStateToProps)(SignUpLastNameInput)
