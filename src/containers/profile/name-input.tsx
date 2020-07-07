import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetProfileNameFieldAction } from '../../store/actions'
import { isTextValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileNameInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(name: string) {
    this.props.dispatch(
      new SetProfileNameFieldAction({
        value: name,
        isValid: isTextValid(name)
      })
    )
  }
}

const mapStateToProps = ({ profile }: IStoreState) => ({
  field: profile.name,
  placeholder: literalsService.get('name')
})
export default connect(mapStateToProps)(ProfileNameInput)
