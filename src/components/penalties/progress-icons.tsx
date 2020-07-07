import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from '../shared/image'

interface IProps {
  penaltiesAmount: number
}

export class ProgressIcons extends React.Component<IProps> {
  public render(): React.ReactNode {
    const penalties = this.props.penaltiesAmount
    return (
      <View style={styles.progressBarIcons}>
        <Image size={{ width: 20, height: 20 }} name={penalties < 1 ? 'faceHappyGreen' : 'faceHappy'} />
        <Image size={{ width: 20, height: 20 }} name={penalties === 1 ? 'faceMehLightOrange' : 'faceMeh'} />
        <Image size={{ width: 20, height: 20 }} name={penalties === 2 ? 'faceMehLightOrange' : 'faceMeh'} />
        <Image size={{ width: 20, height: 20 }} name={penalties === 3 ? 'faceSadOrange' : 'faceSad'} />
        <Image size={{ width: 20, height: 20 }} name={penalties > 3 ? 'faceDizzyPink' : 'faceDizzy'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressBarIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -10
  }
})
