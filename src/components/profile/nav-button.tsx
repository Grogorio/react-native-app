import * as React from 'react'
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { colors, textStyles } from '../../styles'
import { Image } from '../shared/image'

interface IProps {
  onPress: () => void
  label: string
  disabled: boolean
}

export class ProfileNavButton extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { onPress, label, disabled } = this.props
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
        <Text style={styles.buttonText}>{label}</Text>
        <Image style={styles.buttonImage} name={'arrowRight'} size={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - scale(40),
    height: verticalScale(54),
    borderColor: colors.grey,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  buttonText: {
    ...textStyles.title,
    color: colors.black
  },
  buttonImage: {
    marginLeft: 'auto'
  }
})
