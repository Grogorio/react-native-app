import * as React from 'react'
import { autobind } from 'core-decorators'
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import { ITabOption } from '../../models'
import { colors, textStyles } from '../../styles'

interface IProps {
  option: ITabOption
  onPress: (option: ITabOption) => void
  isActive: boolean
}

export class TabOption extends React.Component<IProps> {
  private get activeBorder(): React.ReactNode {
    if (!this.props.isActive) return null
    return <View style={styles.activeBorder} />
  }

  public render(): React.ReactNode {
    return (
      <TouchableHighlight style={styles.option} onPress={this.handlePress} underlayColor={colors.purple}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{this.props.option.title.toUpperCase()}</Text>
          {this.activeBorder}
        </View>
      </TouchableHighlight>
    )
  }

  @autobind
  private handlePress() {
    const { option, onPress } = this.props
    onPress(option)
  }
}

const styles = StyleSheet.create({
  option: {
    flex: 1,
    height: verticalScale(48),
    backgroundColor: colors.purple
  },
  optionContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center'
  },
  activeBorder: {
    height: verticalScale(3),
    borderRadius: scale(3),
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: scale(10),
    left: scale(10)
  },
  optionText: {
    ...textStyles.title,
    color: colors.white,
    marginTop: verticalScale(12)
  }
})
