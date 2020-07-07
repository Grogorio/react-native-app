import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetProfileLastNameFieldAction } from '../../store/actions'
import { isTextValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileLastNameInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(lastName: string) {
    this.props.dispatch(
      new SetProfileLastNameFieldAction({
        value: lastName,
        isValid: isTextValid(lastName)
      })
    )
  }
}

const mapStateToProps = ({ profile }: IStoreState) => ({
  field: profile.lastName,
  placeholder: literalsService.get('lastnames')
})
export default connect(mapStateToProps)(ProfileLastNameInput)
