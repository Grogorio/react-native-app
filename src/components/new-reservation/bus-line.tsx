import React from 'react'
import { autobind } from 'core-decorators'
import { StyleSheet, View } from 'react-native'
import { IBusLine } from '../../models'
import { ReservationLine } from '../shared/reservations/reservation-line'
import { verticalScale, scale } from 'react-native-size-matters'

interface IProps {
  line: IBusLine
  handlePress: (line: IBusLine) => void
}

export class BusLine extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { id, name, description } = this.props.line
    return (
      <View key={id} style={styles.line}>
        <ReservationLine
          name={name}
          description={description}
          styleContainer={styles.reservation}
          styleLine={styles.reservationLine}
          onPress={this.handlePress}
        />
      </View>
    )
  }

  @autobind
  private handlePress() {
    const { line, handlePress } = this.props
    handlePress(line)
  }
}

const styles = StyleSheet.create({
  line: {
    height: verticalScale(60),
    width: '100%'
  },
  reservation: {
    flex: 1,
    alignItems: 'center'
  },
  reservationLine: {
    marginLeft: scale(20)
  }
})
