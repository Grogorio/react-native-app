import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import { colors, textStyles } from '../../styles'
import { literalsService } from '../../services'
import { milisecondsFromNow, formatDate } from '../../utils'

interface IProps {
  date: string
}

interface IState {
  countDown: string
}

export class BlockedCountdown extends React.Component<IProps, IState> {
  private countDownInterval: NodeJS.Timer
  // private countDownInterval: number

  constructor(props: IProps) {
    super(props)
    this.state = { countDown: null }
  }

  public componentDidMount(): void {
    this.startCountdown()
  }

  public componentWillUnmount(): void {
    clearInterval(this.countDownInterval)
  }

  public render(): React.ReactNode {
    if (!this.props.date || !this.state.countDown) return null
    return (
      <View style={styles.blockedCountdown}>
        <Text style={styles.upperText}>{literalsService.get('reservationsBlocked', true)}</Text>
        <Text style={styles.upperText}>{this.state.countDown}</Text>
        <Text style={styles.bottomText}>{literalsService.get('tooManyReservations', true)}</Text>
        <Text style={styles.bottomText}>{literalsService.get('dontForgetReservations', true)}</Text>
      </View>
    )
  }

  private startCountdown(): void {
    let miliCountDown = milisecondsFromNow(this.props.date)
    this.setState({ countDown: formatDate(miliCountDown, 'DD[d] HH[h] mm[m] ss[s]') })
    this.countDownInterval = setInterval(() => {
      miliCountDown = milisecondsFromNow(this.props.date)
      this.setState({ countDown: formatDate(miliCountDown, 'DD[d] HH[h] mm[m] ss[s]') })
    }, 1000)
  }
}

const styles = StyleSheet.create({
  blockedCountdown: {
    paddingVertical: verticalScale(16),
    marginVertical: verticalScale(20),
    backgroundColor: colors.greyLight,
    width: Dimensions.get('window').width - scale(40),
    alignItems: 'center'
  },
  upperText: {
    ...textStyles.title,
    color: colors.purple,
    marginTop: verticalScale(16)
  },
  bottomText: {
    ...textStyles.caption,
    color: colors.greyDark,
    marginTop: verticalScale(16)
  }
})
