import * as React from 'react'
import { TouchableHighlight, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { autobind } from 'core-decorators'
import { colors, textStyles } from '../../../styles'
import { capitalize } from '../../../utils'

interface IProps {
  suggestion: string
  onPress: (option: string) => void
}

export class AutocompleteOption extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { suggestion } = this.props
    return (
      <TouchableHighlight
        key={suggestion}
        style={styles.option}
        onPress={this.handlePress}
        underlayColor="#E8E8E8"
        prevent-emit={true}
      >
        <Text prevent-emit={true} style={styles.optionText}>{capitalize(suggestion)}</Text>
      </TouchableHighlight>
    )
  }

  @autobind
  private handlePress(_event: GestureResponderEvent) {
    const { suggestion, onPress } = this.props
    onPress(suggestion)
  }
}

const styles = StyleSheet.create({
  option: {
    width: Dimensions.get('window').width - scale(40),
    justifyContent: 'center',
    zIndex: 1000
  },
  optionText: {
    ...textStyles.body,
    color: colors.black,
    height: verticalScale(47),
    lineHeight: verticalScale(47),
    paddingLeft: scale(25),
    zIndex: 1000
  }
})
