import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedTextInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetDniAction } from '../../store/actions'
import { isDniValid } from '../../utils'
import { literalsService, userService } from '../../services'
import { IBaseInputState, IBaseInputProps } from '../../components/shared/inputs/base-input'

class RecoverPasswordDniInput extends ValidatedTextInput<IBaseInputProps, IBaseInputState> {
  constructor(props: IBaseInputProps) {
    super(props)
    this.state = { isFocused: false }
  }

  @autobind
  public async handleChange(dni: string) {
    const { dispatch } = this.props
    const isValid = isDniValid(dni)
    let isUsed: boolean

    dispatch(new SetDniAction({ value: dni, isValid: false, error: null }))

    if (isValid) {
      try {
        isUsed = await userService.checkIsDniUsed(dni)
      } catch (error) {
        isUsed = false
      }
    }

    this.props.dispatch(
      new SetDniAction({
        value: dni,
        isValid: isUsed && isValid,
        error: !isUsed ? new Error(literalsService.get('nifNotUsed')) : null
      })
    )
  }
}

const mapStateToProps = ({ recoverPassword }: IStoreState) => ({
  field: recoverPassword.dni,
  placeholder: literalsService.get('nationalIdentityDocument')
})
export default connect(mapStateToProps)(RecoverPasswordDniInput)
