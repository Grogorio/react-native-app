import { Platform, StyleSheet, Dimensions, TextStyle } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale, verticalScale } from 'react-native-size-matters'
import { isIOS } from './utils'

export const fontFamily = 'FS Joey'

export type IColor =
  | '#E42313'
  | '#00BBA7'
  | '#2F2F31'
  | '#979DA8'
  | '#DEDEDE'
  | '#F0F0F0'
  | '#7ED321'
  | '#FCC53D'
  | '#FE9B34'
  | '#F66032'
  | '#FFFFFF'
  | 'transparent'

export interface IColors {
  purple: IColor
  yellow: IColor
  black: IColor
  greyDark: IColor
  grey: IColor
  greyLight: IColor
  green: IColor
  orange: IColor
  orangeDark: IColor
  pinkDark: IColor
  white: IColor
  transparent: IColor
}

export const colors: IColors = {
  purple: '#E42313',
  yellow: '#00BBA7',
  black: '#2F2F31',
  greyDark: '#979DA8',
  grey: '#DEDEDE',
  greyLight: '#F0F0F0',
  green: '#7ED321',
  orange: '#FCC53D',
  orangeDark: '#FE9B34',
  pinkDark: '#F66032',
  white: '#FFFFFF',
  transparent: 'transparent'
}

export interface ITextStyles {
  display: TextStyle
  title: TextStyle
  body: TextStyle
  button: TextStyle
  caption: TextStyle
}

export const textStyles: ITextStyles = {
  display: {
    fontSize: responsiveFontSize(3),
    fontFamily,
    fontWeight: '700'
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontFamily,
    fontWeight: '700'
  },
  button: {
    fontSize: responsiveFontSize(2),
    fontFamily,
    fontWeight: '700'
  },
  body: {
    fontSize: responsiveFontSize(2),
    fontFamily,
    fontWeight: '400'
  },
  caption: {
    fontSize: responsiveFontSize(1.7),
    fontFamily,
    fontWeight: '500'
  }
}

export const menuWidth = scale(275)

export const osPaddingTop = isIOS() ? verticalScale(22) : 0

export const globalStyles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  greyScreen: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.greyLight
  },
  scrollScreen: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: colors.greyLight
  },
  fullAlignedscreen: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingTop: osPaddingTop
  },
  contentContainer: {
    width: Dimensions.get('window').width,
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(20),
    flex: 1
  },
  container: {
    width: '100%',
    flex: 1
  },
  fullAlignedcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    ...textStyles.title,
    color: colors.purple,
    fontWeight: 'bold'
  },
  headerTextAction: {
    color: colors.purple,
    fontWeight: '400',
    fontSize: 14,
    marginRight: verticalScale(5)
  },
  authTopText: {
    ...textStyles.title,
    color: colors.black,
    marginBottom: verticalScale(30),
    marginTop: verticalScale(30)
  },
  input: {
    height: verticalScale(44),
    width: Dimensions.get('window').width - scale(40),
    fontSize: 16,
    marginBottom: verticalScale(10),
    borderRadius: scale(4),
    borderColor: colors.greyDark,
    borderBottomWidth: 1
  },
  focusedInput: {
    ...textStyles.button,
    color: colors.purple,
    height: verticalScale(44),
    width: Dimensions.get('window').width - scale(40),
    marginBottom: verticalScale(10),
    borderRadius: scale(4),
    borderColor: colors.purple,
    borderBottomWidth: 1
  },
  inputWarning: {
    ...textStyles.caption,
    color: colors.pinkDark,
    marginBottom: verticalScale(10)
  },
  errorText: {
    color: 'red',
    width: Dimensions.get('window').width - scale(40),
    marginBottom: verticalScale(10)
  },
  bottomOpacity: {
    elevation: 5,
    shadowColor: `${colors.black}75`,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  link: {
    ...textStyles.body,
    color: colors.purple,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
})

const baseInput = {
  ...textStyles.body,
  paddingVertical: responsiveFontSize(1.5),
  width: Dimensions.get('window').width - scale(40),
  marginBottom: verticalScale(15),
  flexShrink: 0,
  borderBottomWidth: 1,
  ...Platform.select({
    android: {
      elevation: 0
    }
  })
}

export const inputStyles = StyleSheet.create({
  emptyInput: {
    ...baseInput,
    color: colors.greyDark,
    borderColor: colors.greyDark
  },
  focusedInput: {
    ...baseInput,
    color: colors.purple,
    borderColor: colors.purple
  },
  validInput: {
    ...baseInput,
    color: colors.black,
    borderColor: colors.black
  },
  invalidInput: {
    ...baseInput,
    color: colors.black,
    borderColor: colors.pinkDark
  },
  focusedUpperPlaceholder: {
    ...textStyles.caption,
    color: colors.purple
  },
  validUpperPlaceholder: {
    ...textStyles.caption,
    color: colors.greyDark
  },
  invalidUpperPlaceholder: {
    ...textStyles.caption,
    color: colors.pinkDark
  },
  warning: {
    ...textStyles.caption,
    color: colors.pinkDark,
    marginBottom: verticalScale(10)
  }
})

export const buttonStyles = StyleSheet.create({
  basic: {
    height: verticalScale(44),
    width: Dimensions.get('window').width - scale(40),
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    borderRadius: scale(44)
  },
  disabledBasic: {
    height: verticalScale(44),
    width: Dimensions.get('window').width - scale(40),
    backgroundColor: `${colors.purple}60`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    borderRadius: scale(44)
  },
  reversedBasic: {
    height: verticalScale(44),
    width: Dimensions.get('window').width - scale(40),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    borderRadius: scale(44),
    borderColor: colors.purple,
    borderWidth: 2
  },
  basicText: {
    ...textStyles.button,
    color: colors.white
  },
  disabledBasicText: {
    ...textStyles.button,
    color: colors.white
  },
  reversedBasicText: {
    ...textStyles.button,
    color: colors.purple
  }
})
