import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetSignUpDniFieldAction } from '../../store/actions'
import { isDniValid } from '../../utils'
import { literalsService, userService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class SignUpDniInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public async handleChange(dni: string) {
    const { dispatch, check } = this.props
    const isValid = isDniValid(dni)
    let isUsed: boolean

    dispatch(new SetSignUpDniFieldAction({ value: dni, isValid: false, error: null }))

    if (isValid && check) {
      try {
        isUsed = await userService.checkIsDniUsed(dni)
      } catch (error) {
        isUsed = false
      }
    }

    dispatch(
      new SetSignUpDniFieldAction({
        value: dni,
        isValid: !isUsed && isValid,
        error: isUsed ? new Error(literalsService.get('nifUsed')) : null
      })
    )
  }
}

const mapStateToProps = ({ signUp }: IStoreState) => ({
  field: signUp.dni,
  placeholder: literalsService.get('nationalIdentityDocument')
})
export default connect(mapStateToProps)(SignUpDniInput)
