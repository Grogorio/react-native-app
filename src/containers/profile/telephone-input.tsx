import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetProfileTelephoneFieldAction } from '../../store/actions'
import { isTelephoneValid } from '../../utils'
import { literalsService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileTelephoneInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public handleChange(telephone: string) {
    this.props.dispatch(
      new SetProfileTelephoneFieldAction({
        value: telephone,
        isValid: isTelephoneValid(telephone)
      })
    )
  }
}

const mapStateToProps = ({ profile }: IStoreState) => ({
  field: profile.telephone,
  placeholder: literalsService.get('telephone')
})
export default connect(mapStateToProps)(ProfileTelephoneInput)
