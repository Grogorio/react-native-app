import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RootStack } from '../navigation'

export class Bod extends React.Component {
  public render(): React.ReactNode {
    return (
      <View style={styles.bod}>
        <RootStack />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bod: {
    flex: 1,
    flexDirection: 'row'
  }
})
