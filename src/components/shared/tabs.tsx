import * as React from 'react'
import { autobind } from 'core-decorators'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl
} from 'react-native'
import { ITabOption, INotification } from '../../models'
import { TabOption } from '.'
import { globalStyles, colors } from '../../styles'
import { Spinner } from './spinner'
import { Notification } from './notification'
import { verticalScale } from 'react-native-size-matters'

interface IProps {
  options: ITabOption[]
  defaultOption: ITabOption
  isLoading?: boolean
  notification?: INotification
  resetScreenParams?: () => void
  refreshScrollView: () => void
}

interface IState {
  pickedTabOption: ITabOption
}

export class Tabs extends React.Component<IProps, IState> {
  private scrollViewRef: any

  private get optionTabs(): React.ReactNode[] {
    return this.props.options.map((o, i) => (
      <TabOption key={i} option={o} onPress={this.onTabOptionPress} isActive={this.isActive(o)} />
    ))
  }

  private get pickedTabOption(): ITabOption {
    const { options, defaultOption } = this.props
    const pickedTabOption = this.state.pickedTabOption
    return options.find(o => pickedTabOption && o.title === pickedTabOption.title) || defaultOption
  }

  private get pickedTabOptionContent(): React.ReactNode {
    return (
      <View style={{ flexDirection: 'column' }}>
        {this.pickedTabOption.content}
        {this.pickedTabOptionSpinner}
      </View>
    )
  }

  private get pickedTabOptionSpinner(): React.ReactNode {
    if (!this.props.isLoading) return null
    return (
      <Spinner
        style={{ marginTop: verticalScale(10), marginBottom: verticalScale(20) }}
        onLayout={this.handleSpinnerLayout}
      />
    )
  }

  constructor(props: IProps) {
    super(props)
    this.state = { pickedTabOption: null }
  }

  public render(): React.ReactNode {
    const { notification, resetScreenParams, isLoading } = this.props
    return (
      <View style={[styles.tabs, globalStyles.bottomOpacity]}>
        <View style={styles.options}>{this.optionTabs}</View>
        <Notification notification={notification} resetScreenParams={resetScreenParams} />
        <ScrollView
          ref={sv => (this.scrollViewRef = sv)}
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          onMomentumScrollEnd={this.handleOnScrollEndDrag}
          scrollEnabled={!isLoading}
          refreshControl={<RefreshControl onRefresh={this.onScrollViewRefresh} refreshing={isLoading} />}
        >
          {this.pickedTabOptionContent}
        </ScrollView>
      </View>
    )
  }

  private isActive(tabOption: ITabOption) {
    const pickedTabOption = this.state.pickedTabOption
    const defaultOption = this.props.defaultOption
    return (
      (pickedTabOption && pickedTabOption.key === tabOption.key) ||
      (!pickedTabOption && defaultOption.key === tabOption.key)
    )
  }

  @autobind
  private onTabOptionPress(tabOption: ITabOption) {
    this.setState({ pickedTabOption: tabOption })
  }

  @autobind
  private async handleSpinnerLayout() {
    this.scrollViewRef.scrollToEnd()
  }

  @autobind
  private handleOnScrollEndDrag({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    const isInBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height
    if (isInBottom) this.pickedTabOption.onScrollBottom()
  }

  @autobind
  private onScrollViewRefresh() {
    const { refreshScrollView } = this.props
    refreshScrollView()
  }
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: colors.purple,
    width: '100%',
    flex: 1
  },
  options: {
    flexDirection: 'row',
    width: '100%'
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.greyLight
  },
  contentContainer: {
    flex: 0,
    flexShrink: 0,
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(70),
    minHeight: Dimensions.get('window').height - verticalScale(130)
  }
})
