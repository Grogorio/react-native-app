import * as React from 'react'
import { TouchableOpacity } from 'react-native'

export class TouchableOpacityDisable extends TouchableOpacity {
  public render(): React.ReactNode {
    const { style, children, disabled } = this.props
    return (
      <TouchableOpacity {...this.props} style={[style, disabled ? { opacity: 0.5 } : null]}>
        {children}
      </TouchableOpacity>
    )
  }
}
