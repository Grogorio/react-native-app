import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { autobind } from 'core-decorators'
import { verticalScale } from 'react-native-size-matters'
import { IBusLine } from '../../../models'
import { Image } from '../image'
import { textStyles, colors } from '../../../styles'
import { literalsService } from '../../../services'

interface IProps {
  busline: IBusLine
  onPress?: () => void
}

interface IState {
  showAllStops: boolean
}

export class ReservationStops extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { showAllStops: false }
  }

  public render(): React.ReactNode {
    const { busline, onPress } = this.props
    const origin = busline.drawStops.find(x => x.isOrigin)
    const destination = busline.drawStops.find(x => x.isDestination)
    return (
      <View style={styles.stops}>
        <TouchableOpacity style={styles.groupTop} onPress={onPress}>
          <Image name={'dotSelected'} size={{ width: 20, height: 20 }} />
          <Text style={styles.groupText}>{origin.code} - {origin.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashed} onPress={this.onStopPress}>
          {this.showStops()}
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBottom} onPress={onPress}>
          <Image name={'pin'} size={{ width: 20, height: 20 }} />
          <Text style={styles.groupText}>{destination.code} - {destination.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  @autobind
  protected showStops(): React.ReactNode {
    const { busline } = this.props
    if (this.state.showAllStops) {
      const stops = busline.pathStops.map(x => (
        <Text style={styles.mini} key={x.code}>
          {x.code} - {x.name}
        </Text>
      ))
      return <ScrollView style={{ maxHeight: verticalScale(200) }}>{stops}</ScrollView>
    } else {
      return (
        <Text style={styles.mini}>
          ({busline.pathStops.length} {literalsService.get('stops')})
        </Text>
      )
    }
  }

  @autobind
  protected onStopPress() {
    this.setState({ showAllStops: !this.state.showAllStops })
  }
}

const styles = StyleSheet.create({
  stops: {
    flexDirection: 'column',
    marginBottom: verticalScale(20)
  },
  groupTop: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupBottom: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    alignItems: 'center'
  },
  groupText: {
    ...textStyles.body,
    color: colors.black,
    marginLeft: 18
  },
  mini: {
    paddingLeft: 30,
    color: colors.greyDark,
    ...textStyles.caption
  },
  dashed: {
    borderLeftWidth: 1,
    borderRadius: 1,
    borderColor: colors.greyDark,
    backgroundColor: 'white',
    marginLeft: 10
  }
})
