import * as React from 'react'
import { Image as RNImage, ViewStyle, StyleProp } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { images, ImageName } from '../../images'

interface IProps {
  name: ImageName
  size: { width: number, height: number }
  style?: StyleProp<ViewStyle>
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
}

export class Image extends React.Component<IProps> {
  private get size(): StyleProp<any> {
    const size = this.props.size
    return {
      width: moderateScale(size.width),
      height: moderateScale(size.height)
    }
  }

  public render(): React.ReactNode {
    const { name, style, resizeMode } = this.props
    if (!name) return null
    const source = images[name]
    return <RNImage source={source} style={[ this.size, style ]} resizeMode={ resizeMode || 'contain' } />
  }
}
