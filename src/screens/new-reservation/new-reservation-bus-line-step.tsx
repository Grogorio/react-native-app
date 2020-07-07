import React from 'react'
import { Text, View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { autobind } from 'core-decorators'
import { NavigationScreenProps } from 'react-navigation'
import { globalStyles, colors } from '../../styles'
import { fetchBusLinesActionThunk } from '../../store/thunks'
import { IStoreState } from '../../store/states'
import { IBusLine } from '../../models'
import { BusLine, Screen } from '../../components'
import { routes } from '../../navigation'
import { ResetNewReservationValuesAction, SetPickedBusLineAction } from '../../store/actions'
import { NavigationHeader } from '../../containers'
import { literalsService } from '../../services'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  busLines: IBusLine[]
  pickedBusLine: IBusLine
}

export class NewReservationBusLineStep extends Screen<IProps> {
  private get areBusLinesAvailable(): boolean {
    const { busLines } = this.props
    return busLines && !!busLines.length
  }

  private get busLines(): React.ReactNode {
    if (this.areBusLinesAvailable)
      return this.props.busLines.map(b => <BusLine key={b.id} line={b} handlePress={this.handleLinePress} />)
    return <ActivityIndicator size="large" color={colors.purple} />
  }

  private get containerStyle(): StyleProp<ViewStyle> {
    if (this.areBusLinesAvailable) return globalStyles.container
    return globalStyles.fullAlignedcontainer
  }

  public componentDidMount() {
    this.props.dispatch(fetchBusLinesActionThunk())
  }
  // public UNSAFE_componentWillMount() {
  //   this.props.dispatch(fetchBusLinesActionThunk())
  // }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.greyScreen}>
        <NavigationHeader onBackPress={this.handleBackPress} reversed={true} backIcon={'close'} opacityOn={true}>
          <Text style={globalStyles.headerTitle}>{literalsService.get('chooseLine').toUpperCase()}</Text>
        </NavigationHeader>
        <View style={[this.containerStyle, { paddingTop: 20 }]}>{this.busLines}</View>
      </View>
    )
  }

  @autobind
  private handleLinePress(line: IBusLine): void {
    this.props.dispatch(new SetPickedBusLineAction(line))
    this.navigate(routes.newReservationBusStopsStep.routeName, { editMode: this.editMode })
  }

  @autobind
  private handleBackPress(): void {
    this.props.dispatch(new ResetNewReservationValuesAction())
    this.reset(routes.reservations.routeName)
  }
}

const mapStateToProps = ({ newReservation }: IStoreState) => ({
  busLines: newReservation.busLines,
  pickedBusLine: newReservation.pickedBusLine
})

export default connect(mapStateToProps)(NewReservationBusLineStep)
