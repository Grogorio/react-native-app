import * as React from 'react'
import { TouchableHighlight } from 'react-native'

export class TouchableHighlightDisable extends TouchableHighlight {
  public render(): React.ReactNode {
    const { style, children, disabled } = this.props
    return (
      <TouchableHighlight {...this.props} style={[style, disabled ? { opacity: 0.5 } : null]}>
        {children}
      </TouchableHighlight>
    )
  }
}
