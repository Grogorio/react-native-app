import * as React from 'react'
import { StyleSheet, Dimensions, Modal, View, TouchableOpacity, Text } from 'react-native'
import { LocaleConfig } from '@valudio/react-native-calendars'
import { scale, verticalScale } from 'react-native-size-matters'
import { autobind } from 'core-decorators'
import { literalsService } from '../../services'
import { colors, textStyles } from '../../styles'
import { Image, ValidatedButton } from '../shared'

interface IProps {
  isVisible: boolean
  onPress: () => void
  onClose: () => void
}

export class SureToSignOutModal extends React.Component<IProps> {
  public componentDidMount() {
    LocaleConfig.defaultLocale = literalsService.getLanguage()
  }

  // public UNSAFE_componentWillMount() {
  //   LocaleConfig.defaultLocale = literalsService.getLanguage()
  // }

  public render(): React.ReactNode {
    const { isVisible, onClose, onPress } = this.props
    return (
      <Modal animationType={'fade'} transparent={true} visible={isVisible} onRequestClose={this.handleRequestClose}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Image name={'close'} size={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{literalsService.get('sureSignOut', true)}</Text>
              <ValidatedButton
                label={literalsService.get('goBack').toUpperCase()}
                onPress={onClose}
                isReversed={true}
                style={{ width: Dimensions.get('window').width - 100 }}
              />
              <ValidatedButton
                label={literalsService.get('signOut').toUpperCase()}
                onPress={onPress}
                style={{ width: Dimensions.get('window').width - 100 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  @autobind
  private handleRequestClose(): void {
    return
  }
}

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: `${colors.black}50`,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: Dimensions.get('window').width - scale(40),
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    flexDirection: 'column'
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(44),
    height: verticalScale(64)
  },
  headerContainer: {
    paddingHorizontal: scale(15)
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20)
  },
  title: {
    ...textStyles.display,
    marginBottom: verticalScale(12)
  },
  message: {
    ...textStyles.body,
    marginBottom: verticalScale(40)
  }
})
