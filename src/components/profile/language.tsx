import React from 'react'
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'
import { autobind } from 'core-decorators'
import { colors, textStyles } from '../../styles'
import { Language } from '../../services'
import { Image } from '../shared/image'

interface IProps {
  onPress: (language: Language) => void
  label: string
  language: Language
  isActive: boolean
}

export class ProfileLanguage extends React.Component<IProps> {
  private get activeImage(): React.ReactNode {
    if (this.props.isActive) return <Image size={{ width: 20, height: 20 }} name={'check'} style={styles.buttonImage} />
    return null
  }

  public render(): React.ReactNode {
    const { label, isActive } = this.props
    return (
      <TouchableOpacity style={styles.button} onPress={this.handleLanguagePress} disabled={isActive}>
        <Text style={styles.buttonText}>{label}</Text>
        {this.activeImage}
      </TouchableOpacity>
    )
  }

  @autobind
  private handleLanguagePress(): void {
    const { onPress, language } = this.props
    onPress(language)
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    height: 50,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  buttonText: {
    ...textStyles.body,
    color: colors.black
  },
  buttonImage: {
    marginLeft: 'auto'
  }
})
