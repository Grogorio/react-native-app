import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { colors, textStyles } from '../../styles'
import { capitalize } from '../../utils'

interface IProps {
  routeName?: string
  label: string
  onPress: (routeName: string) => void
}

export class MenuItem extends React.Component<IProps> {
  public render(): React.ReactNode {
    return (
      <TouchableOpacity style={styles.menuItem} onPress={this.handlePress}>
        <Text style={styles.menuItemText}>{capitalize(this.props.label)}</Text>
      </TouchableOpacity>
    )
  }

  @autobind
  private handlePress() {
    const { routeName, onPress } = this.props
    onPress(routeName)
  }
}

const styles = StyleSheet.create({
  menuItem: {
    height: verticalScale(64),
    marginHorizontal: scale(20),
    justifyContent: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1
  },
  menuItemText: {
    ...textStyles.button,
    color: colors.black
  }
})
