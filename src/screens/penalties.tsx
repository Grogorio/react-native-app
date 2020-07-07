import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  ScrollView,
  RefreshControl
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { verticalScale, scale } from 'react-native-size-matters'
import { IStoreState } from '../store/states'
import { globalStyles, colors, textStyles, IColor } from '../styles'
import { Screen, ScreenHeader, Penalty, ProgressIcons, MenuView, BlockedCountdown } from '../components'
import { NavigationHeader, Menu } from '../containers'
import { IPenaltiesInfo } from '../models'
import { fetchPenaltiesActionThunk } from '../store/thunks'
import { literalsService } from '../services'
import { autobind } from 'core-decorators'

interface IProps extends NavigationScreenProps, DispatchProp<any> {
  penaltiesInfo: IPenaltiesInfo
  isMenuVisible: boolean
  isLoading: boolean
}

class Penalties extends Screen<IProps> {
  private get arePenaltiesFetched(): boolean {
    return !!this.props.penaltiesInfo
  }

  private get arePenaltiesAvailable(): boolean {
    const penaltiesInfo = this.props.penaltiesInfo
    return this.arePenaltiesFetched && !!penaltiesInfo.reservations && !!penaltiesInfo.reservations.length
  }

  private get issuedReservationsAmount(): number {
    const penaltiesInfo = this.props.penaltiesInfo
    if (penaltiesInfo && penaltiesInfo.reservations) return penaltiesInfo.reservations.length
    return 0
  }

  private get penaltiesList(): React.ReactNode {
    if (!!this.arePenaltiesAvailable)
      return this.props.penaltiesInfo.reservations.map((p, i) => <Penalty key={i} reservation={p} color={this.color} />)
    return (
      <View style={styles.progressMessage}>
        <Text style={styles.progressMessageTitle}>{literalsService.get('great', true)}</Text>
        <Text style={styles.progressMessageSubTitle}>{literalsService.get('noPenalties', true)}</Text>
      </View>
    )
  }

  private get progressBar(): React.ReactNode {
    if (this.arePenaltiesFetched)
      return (
        <View style={styles.progressBar}>
          <View style={styles.progressBarSteps}>
            <View style={this.progressBarStepStyle(1)} />
            <View style={this.progressBarStepStyle(2)} />
            <View style={this.progressBarStepStyle(3)} />
            <View style={this.progressBarStepStyle(4)} />
          </View>
          <ProgressIcons penaltiesAmount={this.issuedReservationsAmount} />
        </View>
      )
    return null
  }

  private get color(): IColor {
    const amount = this.issuedReservationsAmount
    if (amount === 0) return colors.grey
    else if (amount === 1) return colors.yellow
    else if (amount === 2) return colors.orange
    else if (amount === 3) return colors.orangeDark
    else if (amount > 3) return colors.pinkDark
  }

  private get penaltiesDetails(): React.ReactNode {
    if (!!this.props.penaltiesInfo) return this.penaltiesList
    return <ActivityIndicator size="large" color={colors.purple} />
  }

  private get penaltiesDetailsStyles(): StyleProp<ViewStyle> {
    if (this.arePenaltiesFetched) return styles.penaltiesDetails
    return globalStyles.fullAlignedcontainer
  }

  public componentDidMount() {
    this.scrollViewRefresh()
  }
  // public UNSAFE_componentWillMount() {
  //   this.scrollViewRefresh()
  // }

  public render(): React.ReactNode {
    const { isMenuVisible, navigation, penaltiesInfo, isLoading } = this.props
    return (
      <MenuView isMenuVisible={isMenuVisible}>
        <Menu navigation={navigation} />
        <View style={[globalStyles.screen]}>
          <NavigationHeader />
          <ScreenHeader title={literalsService.get('penalties').toUpperCase()} />
          {this.progressBar}
          <BlockedCountdown date={penaltiesInfo ? penaltiesInfo.expiration : null} />
          <ScrollView
            style={styles.penaltiesDetailsScroll}
            contentContainerStyle={this.penaltiesDetailsStyles}
            refreshControl={<RefreshControl onRefresh={this.scrollViewRefresh} refreshing={isLoading} />}
          >
            {this.penaltiesDetails}
          </ScrollView>
        </View>
      </MenuView>
    )
  }

  private progressBarStepStyle(index: number) {
    return {
      height: 8,
      flex: 1,
      marginHorizontal: 2,
      backgroundColor: index > this.issuedReservationsAmount ? colors.grey : this.color
    }
  }

  @autobind
  private scrollViewRefresh(): void {
    const { dispatch } = this.props
    dispatch(fetchPenaltiesActionThunk())
  }
}

const styles = StyleSheet.create({
  progressBar: {
    width: Dimensions.get('window').width - scale(60),
    flexDirection: 'column',
    marginVertical: verticalScale(20)
  },
  progressBarSteps: {
    flexDirection: 'row',
    marginBottom: verticalScale(13)
  },
  penaltiesDetailsScroll: {
    width: '100%',
    borderColor: colors.grey,
    borderTopWidth: 2
  },
  penaltiesDetails: {
    paddingHorizontal: scale(20)
  },
  progressMessage: {
    backgroundColor: colors.greyLight,
    width: '100%',
    padding: scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressMessageTitle: {
    ...textStyles.title,
    color: colors.purple,
    marginBottom: verticalScale(10)
  },
  progressMessageSubTitle: {
    ...textStyles.caption,
    color: colors.greyDark
  }
})

const mapStateToProps = ({ penaltiesInfo, ui }: IStoreState) => ({
  penaltiesInfo,
  isMenuVisible: ui.isMenuVisible,
  isLoading: penaltiesInfo.isLoading
})
export default connect(mapStateToProps)(Penalties)
