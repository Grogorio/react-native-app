import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View, Text, Linking, StyleProp, TextStyle } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { autobind } from 'core-decorators'
import { verticalScale, scale } from 'react-native-size-matters'
import { globalStyles, textStyles, colors } from '../styles'
import { literalsService, Literal } from '../services'
import { ScreenHeader, Screen, Image } from '../components'
import { NavigationHeader } from '../containers'
import { ImageName } from '../images'

interface IProps extends NavigationScreenProps, DispatchProp<any> {}

class Information extends Screen<IProps> {
  private telephone = '930 333 333'
  private informationWeb = 'http://www.amb.cat/busademanda'
  private supportWeb = 'http://www.amb.cat/suportbusademanda'

  private get isHeaderReversed(): boolean {
    return this.screenParams && this.screenParams.reversed
  }

  public render(): React.ReactNode {
    return (
      <View style={globalStyles.screen}>
        <NavigationHeader onBackPress={this.handleBackPress} reversed={this.isHeaderReversed} />
        <ScreenHeader title={literalsService.get('information').toUpperCase()} reversed={this.isHeaderReversed} />
        <View style={globalStyles.contentContainer}>
          <Text style={styles.title}>{literalsService.get('serviceInformation', true)}:</Text>
          {this.item('web', 'serviceInformation', this.informationWeb, this.goToInformationWeb, textStyles.caption)}
          <Text style={styles.title}>{literalsService.get('atYourService', true)}:</Text>
          {this.item('phone', 'telephone', this.telephone, this.call, textStyles.title, 'attentionSchedule')}
          {this.item('web', 'contactForm', this.supportWeb, this.goToSupportWeb, textStyles.caption)}
        </View>
      </View>
    )
  }

  private item(
    image: ImageName,
    title: Literal,
    body: string,
    onPress?: () => void,
    style?: StyleProp<TextStyle>,
    caption?: Literal
  ): React.ReactNode {
    return (
      <View style={styles.item}>
        <View style={styles.itemImageContainer}>
          <Image name={image} size={{ width: 34, height: 34 }} />
        </View>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemInfoTitle}>{literalsService.get(title, true).toUpperCase()}:</Text>
          <Text
            style={[styles.itemInfoBody, style]}
            onPress={onPress}
          >
            {literalsService.get(body as Literal, true)}
          </Text>
          {this.itemCaption(caption)}
        </View>
      </View>
    )
  }

  @autobind
  private async goToInformationWeb(): Promise<void> {
    const url = this.informationWeb
    const supported = await Linking.canOpenURL(url)
    if (supported) Linking.openURL(url)
  }

  @autobind
  private async goToSupportWeb(): Promise<void> {
    const url = this.supportWeb
    const supported = await Linking.canOpenURL(url)
    if (supported) Linking.openURL(url)
  }

  @autobind
  private async call(): Promise<void> {
    const url = `tel:${this.telephone}`
    const supported = await Linking.canOpenURL(url)
    if (supported) Linking.openURL(url)
  }

  private itemCaption(caption: Literal) {
    if (caption) return <Text style={styles.itemInfoCaption}>{literalsService.get(caption, true)}</Text>
    return null
  }

  @autobind
  private handleBackPress(): void {
    this.goBack()
  }
}

const mapStateToProps = () => ({})
export default connect(mapStateToProps)(Information)

const styles = StyleSheet.create({
  title: {
    ...textStyles.title,
    color: colors.black,
    marginBottom: verticalScale(30)
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: verticalScale(40)
  },
  itemImageContainer: {
    marginRight: scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemInfoContainer: {
    flexShrink: 1
  },
  itemInfoTitle: {
    ...textStyles.body,
    color: colors.black,
    marginBottom: verticalScale(5)
  },
  itemInfoBody: {
    ...textStyles.caption,
    color: colors.black
  },
  itemInfoCaption: {
    ...textStyles.caption,
    color: colors.black,
    marginTop: verticalScale(5)
  }
})
