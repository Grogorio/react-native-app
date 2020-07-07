import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import { IUser } from '../../models'
import { colors, textStyles, osPaddingTop } from '../../styles'
import { capitalize } from '../../utils'

interface IProps {
  user: IUser
}

export class MenuUserInfo extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { name, lastName, email } = this.props.user
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {capitalize(name)} {capitalize(lastName)}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: osPaddingTop,
    width: '100%',
    height: verticalScale(106),
    backgroundColor: colors.purple,
    justifyContent: 'center',
    paddingHorizontal: scale(20)
  },
  name: {
    ...textStyles.title,
    color: colors.white
  },
  email: {
    ...textStyles.body,
    color: colors.white
  }
})
