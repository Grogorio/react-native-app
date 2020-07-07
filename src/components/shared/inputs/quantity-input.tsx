import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import { autobind } from 'core-decorators'
import { Image } from '../image'
import { colors, textStyles } from '../../../styles'

interface IProps {
  amount: number
  maxAmount: number
  label: string
  caption: string
  amountReachedWarning: string
  onChange: (amount: number) => void
}

export class QuantityInput<P extends IProps> extends React.Component<P> {
  private get isLessButtonDisabled(): boolean {
    return this.props.amount === 0
  }

  private get isMaxAmountReached(): boolean {
    const { amount, maxAmount } = this.props
    return amount === maxAmount
  }

  private get amountLeft(): number {
    const { amount, maxAmount } = this.props
    if (!Number.isSafeInteger(amount) || !Number.isSafeInteger(maxAmount)) return 0
    return maxAmount - amount
  }

  private get captionText(): string {
    const { caption, amountReachedWarning } = this.props
    if (this.isMaxAmountReached) return amountReachedWarning
    return `${this.amountLeft} ${caption}`
  }

  public render(): React.ReactNode {
    const { amount, label } = this.props
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={this.buttonStyle(this.isLessButtonDisabled)}
              disabled={this.isLessButtonDisabled}
              onPress={this.handleLessPress}
            >
              <Image name={'less'} size={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <Text style={styles.amountText}>{amount}</Text>
            <TouchableOpacity
              style={this.buttonStyle(this.isMaxAmountReached)}
              disabled={this.isMaxAmountReached}
              onPress={this.handleMorePress}
            >
              <Image name={'more'} size={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.captionText}>{this.captionText}</Text>
      </View>
    )
  }

  private buttonStyle(isDisabled: boolean): StyleProp<ViewStyle> {
    if (!isDisabled) return styles.button
    else return [styles.button, { borderColor: colors.greyDark }]
  }

  @autobind
  private handleLessPress() {
    this.props.onChange(this.props.amount - 1)
  }

  @autobind
  private handleMorePress() {
    this.props.onChange(this.props.amount + 1)
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: verticalScale(30)
  },
  button: {
    width: verticalScale(44),
    height: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.black,
    borderRadius: scale(44)
  },
  amountText: {
    marginHorizontal: scale(15)
  },
  labelText: {
    ...textStyles.body,
    color: colors.black
  },
  captionText: {
    ...textStyles.caption,
    color: colors.greyDark,
    marginTop: verticalScale(5)
  }
})
