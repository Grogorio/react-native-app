import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { textStyles, colors } from '../../styles'

interface IProps {
  text: string
}

export class Title extends React.Component<IProps> {
  public render(): React.ReactNode {
    return (
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.text}</Text>
        <View style={styles.titleBorder} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    width: Dimensions.get('window').width - scale(40),
    flexDirection: 'column',
    marginBottom: verticalScale(30)
  },
  titleText: {
    ...textStyles.display,
    color: colors.black
  },
  titleBorder: {
    height: verticalScale(5),
    borderRadius: scale(5),
    backgroundColor: colors.purple,
    marginTop: verticalScale(10),
    width: '100%'
  }
})
