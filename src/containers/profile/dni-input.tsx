import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetProfileDniFieldAction } from '../../store/actions'
import { isDniValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileDniInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(dni: string) {
    this.props.dispatch(
      new SetProfileDniFieldAction({
        value: dni,
        isValid: isDniValid(dni)
      })
    )
  }
}

const mapStateToProps = ({ profile }: IStoreState) => ({
  field: profile.dni,
  placeholder: literalsService.get('nationalIdentityDocument')
})
export default connect(mapStateToProps)(ProfileDniInput)
