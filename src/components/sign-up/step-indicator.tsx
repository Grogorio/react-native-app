import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../styles'

interface IProps {
  amount: number
  active: number
}

export class StepIndicator extends React.Component<IProps> {
  private get steps(): React.ReactNode[] {
    const { amount, active } = this.props
    const steps: React.ReactNode[] = []
    for (let index = 0; index < amount; index++) {
      const step = index + 1
      if (step === active) {
        steps.push(
          <View style={styles.step} key={step}>
            <View style={styles.activeStepCircle} key={step} />
            {this.stepLine(step)}
          </View>
        )
      } else {
        steps.push(
          <View style={styles.step} key={step}>
            <View style={styles.stepCircle} />
            {this.stepLine(step)}
          </View>
        )
      }
    }
    return steps
  }

  public render(): React.ReactNode {
    return <View style={styles.stepsContainer}>{this.steps}</View>
  }

  private stepLine(step: number): React.ReactNode {
    if (step === this.props.amount) return null
    return <View style={styles.stepLine} />
  }
}

const baseStyles = {
  step: {
    backgroundColor: '#D8D8D8',
    width: 8,
    height: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.purple
  }
}

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepCircle: {
    ...baseStyles.step,
    backgroundColor: colors.white
  },
  stepLine: {
    width: 14,
    height: 1,
    backgroundColor: colors.purple
  },
  activeStepCircle: {
    ...baseStyles.step,
    backgroundColor: colors.purple
  }
})
