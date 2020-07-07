import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { ValidatedEmailInput } from '../../components'
import { IStoreState } from '../../store/states'
import { SetProfileEmailFieldAction } from '../../store/actions'
import { isEmailValid } from '../../utils'
import { literalsService, userService } from '../../services'
import { inputStyles } from '../../styles'
import { IBaseInputProps } from '../../components/shared/inputs/base-input'

class ProfileEmailInput extends ValidatedEmailInput<IBaseInputProps> {
  @autobind
  public async handleChange(email: string) {
    const { dispatch, check } = this.props
    const isValid = isEmailValid(email)
    let isUsed: boolean

    dispatch(new SetProfileEmailFieldAction({ value: email, isValid: false, error: null }))

    if (isValid && check) {
      try {
        isUsed = await userService.checkIsEmailUsed(email)
      } catch (error) {
        isUsed = false
      }
    }

    this.props.dispatch(
      new SetProfileEmailFieldAction({
        value: email,
        isValid: !isUsed && isValid,
        customError: this.emailUsedCustomError(isUsed)
      })
    )
  }

  private emailUsedCustomError(isUsed: boolean): React.ReactNode {
    if (!isUsed) return null
    return (
      <Text style={inputStyles.warning}>
        {`${literalsService.get('emailUsed')} `}
        <Text style={[inputStyles.warning, { textDecorationLine: 'underline' }]} onPress={this.props.onErrorPress}>
          {`${literalsService.get('here')}.`}
        </Text>
      </Text>
    )
  }
}

const mapStateToProps = ({ profile }: IStoreState) => ({
  field: profile.email,
  placeholder: literalsService.get('email')
})
export default connect(mapStateToProps)(ProfileEmailInput)
