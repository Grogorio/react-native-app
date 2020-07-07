import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { autobind } from 'core-decorators'
import { connect, DispatchProp } from 'react-redux'
import { scale, verticalScale } from 'react-native-size-matters'
import {
  Screen,
  Map,
  IScreenState,
  ValidatedButton,
  BusStopsSelectionStatus,
  BusStopList,
  Image
} from '../../components'
import { SetPickedBusStopAction, SetPickedBusLineAction, TogglePickedBusLineDirectionAction } from '../../store/actions'
import { globalStyles, textStyles, colors } from '../../styles'
import { IStoreState } from '../../store/states'
import { ImageName } from '../../images'
import { routes } from '../../navigation'
import { IBusStop, IBusLine } from '../../models'
import { NavigationHeader } from '../../containers'
import { getTowards } from '../../models/bus-line'
import { literalsService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  pickedOriginBusStop: IBusStop
  pickedDestinationBusStop: IBusStop
  pickedBusLine: IBusLine
}

interface IState extends IScreenState {
  isInListMode: boolean
}

class NewReservationBusStopsStep extends Screen<IProps, IState> {
  private get stopSelectorView(): React.ReactNode {
    if (this.state.isInListMode) {
      return (
        <BusStopList
          areStopsSelected={this.isEveryFieldValid}
          line={this.props.pickedBusLine}
          onStopSelected={this.onBusStopSelected}
        />
      )
    }
    return (
      <Map
        line={this.props.pickedBusLine}
        onStopSelected={this.onBusStopSelected}
        pickedOriginBusStop={this.props.pickedOriginBusStop}
        pickedDestinationBusStop={this.props.pickedDestinationBusStop}
      />
    )
  }

  private get headerActionIcon(): ImageName {
    return this.state.isInListMode ? 'map' : 'list'
  }

  private get feedbackText() {
    return this.props.pickedOriginBusStop
      ? literalsService.get('chooseDestinationBusStop', true)
      : literalsService.get('chooseOriginBusStop', true)
  }

  private get feedbackBottomPosition(): number {
    return !this.state.isInListMode && this.props.pickedOriginBusStop || this.props.pickedDestinationBusStop
      ? verticalScale(130)
      : verticalScale(20)
  }

  private get feedback(): React.ReactNode {
    return this.isEveryFieldValid ? null : (
      <View style={[ styles.feedback, { bottom: this.feedbackBottomPosition } ]}>
        <Text style={styles.feedbackText}>{this.feedbackText}</Text>
      </View>
    )
  }

  private get selectionStatusContainerStyle(): StyleProp<ViewStyle> {
    if (this.state.isInListMode) return null
    return styles.selectionStatusContainerAbsolute
  }

  private get isEveryFieldValid(): boolean {
    const { pickedOriginBusStop, pickedDestinationBusStop } = this.props
    return !!pickedOriginBusStop && !!pickedDestinationBusStop
  }

  private get continueButton(): React.ReactNode {
    if (!this.isEveryFieldValid) return null
    return (
      <View style={styles.validatedButtonContainer}>
        <ValidatedButton
          label={literalsService.get('next').toUpperCase()}
          onPress={this.handleValidatedButtonPress}
          isDisabled={!this.isEveryFieldValid}
        />
      </View>
    )
  }

  public render(): React.ReactNode {
    if (!this.isRenderable) return null
    const { pickedOriginBusStop, pickedDestinationBusStop, pickedBusLine } = this.props
    const towards = getTowards(literalsService.get('towards'), pickedBusLine)

    return (
      <View style={globalStyles.screen}>
        <NavigationHeader
          onBackPress={this.handleBackPress}
          onActionPress={this.handleToggleMode}
          actionIcon={this.headerActionIcon}
          reversed={true}
        >
          <Text style={globalStyles.headerTitle}>{literalsService.get('chooseRoute').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={styles.stopSelectorView}>
          <View style={[globalStyles.bottomOpacity, styles.directionSelectorContainer]}>
            <TouchableOpacity style={styles.directionSelector} onPress={this.onChangeDirectionPressed}>
              <Text style={styles.towards}>{towards}</Text>
              <Image name={'swap'} size={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
          {this.stopSelectorView}
          {this.feedback}
        </View>
        <View style={this.selectionStatusContainerStyle}>
          <BusStopsSelectionStatus
            pickedOriginBusStop={pickedOriginBusStop}
            pickedDestinationBusStop={pickedDestinationBusStop}
            isVisible={!this.state.isInListMode}
            onStopReset={this.onBusStopSelected}
          />
          {this.continueButton}
        </View>
      </View>
    )
  }

  @autobind
  private onChangeDirectionPressed(): void {
    this.props.dispatch(new TogglePickedBusLineDirectionAction())
  }

  @autobind
  private onBusStopSelected(stop: IBusStop): void {
    this.props.dispatch(new SetPickedBusStopAction(stop))
  }

  @autobind
  private handleValidatedButtonPress(): void {
    this.navigate(routes.newReservationDateStep.routeName, { editMode: this.editMode })
  }

  @autobind
  private handleToggleMode(): void {
    const { isInListMode } = this.state
    this.setState({ isInListMode: !isInListMode })
  }

  @autobind
  private handleBackPress(): void {
    this.props.dispatch(new SetPickedBusLineAction())
    this.reset(routes.newReservationBusLineStep.routeName, 0, { editMode: this.editMode })
  }
}

const styles = StyleSheet.create({
  stopSelectorView: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  feedback: {
    position: 'absolute',
    width: Dimensions.get('window').width - scale(30),
    height: verticalScale(40),
    borderRadius: scale(40),
    backgroundColor: `${colors.white}85`,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackText: {
    ...textStyles.body,
    color: colors.purple
  },
  validatedButtonContainer: {
    backgroundColor: colors.white,
    paddingTop: verticalScale(10),
    alignItems: 'center'
  },
  directionSelectorContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0
  },
  directionSelector: {
    flexDirection: 'row',
    width: '88%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.yellow,
    borderWidth: 2,
    borderRadius: scale(20),
    padding: scale(10),
    marginVertical: verticalScale(10)
  },
  towards: {
    ...textStyles.button,
    color: colors.yellow,
    marginRight: scale(10)
  },
  selectionStatusContainerAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

const mapStateToProps = ({
  newReservation: { pickedOriginBusStop, pickedDestinationBusStop, pickedBusLine }
}: IStoreState) => ({
  pickedOriginBusStop,
  pickedDestinationBusStop,
  pickedBusLine
})

export default connect(mapStateToProps)(NewReservationBusStopsStep)
