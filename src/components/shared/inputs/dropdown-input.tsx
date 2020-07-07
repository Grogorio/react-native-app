import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { capitalize } from '../../../utils'
import { actionSheetService } from '../../../services'
import { colors, textStyles } from '../../../styles'
import { Image } from '../image'

export interface IActionSheet<T> {
  value: T
  literal: string
  hidden?: boolean
}

interface IProps {
  label: string
  actions: IActionSheet<any>[]
  onActionPress: (index: IActionSheet<any>) => void
  style?: StyleProp<ViewStyle>
}

export class DropdownInput extends React.Component<IProps> {
  public render(): React.ReactNode {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.handlePress}>
        <Text style={styles.buttonText}>{capitalize(this.props.label)}</Text>
        <Image name={'arrowDown'} size={{ width: 20, height: 20 }} style={styles.buttonImage} />
      </TouchableOpacity>
    )
  }

  @autobind
  private handlePress() {
    actionSheetService.show(this.props.actions, this.props.onActionPress)
  }
}

const styles = StyleSheet.create({
  button: {
    height: verticalScale(44),
    borderRadius: scale(44),
    borderWidth: 1,
    borderColor: colors.black,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    backgroundColor: colors.transparent,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  buttonText: {
    ...textStyles.body,
    color: colors.black
  },
  buttonImage: {
    marginLeft: 'auto'
  }
})
