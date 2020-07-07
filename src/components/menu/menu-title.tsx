import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { colors, textStyles } from '../../styles'

interface IProps {
  title: string
}

export class MenuTitle extends React.Component<IProps> {
  public render(): React.ReactNode {
    return (
      <View style={styles.menuTitle}>
        <Text style={styles.menuTitleText}>{this.props.title.toUpperCase()}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuTitle: {
    height: verticalScale(64),
    marginHorizontal: scale(20),
    justifyContent: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1
  },
  menuTitleText: {
    ...textStyles.button,
    color: colors.greyDark
  }
})
