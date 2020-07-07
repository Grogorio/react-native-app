import * as React from 'react'
import { Platform, StyleSheet, View, ScrollView } from 'react-native'
import { ValidatedTextInput } from './validated-text-input'
import { autobind } from 'core-decorators'
import { isTextValid, isIOS } from '../../../utils'
import { IAutocompleteInputProps, AutocompleteOption } from '.'
import { IBaseAutocompleteState } from './base-input'
import { colors } from '../../../styles'
import { verticalScale, scale } from 'react-native-size-matters'

// tslint:disable-next-line:max-line-length
export abstract class AutocompleteInput<P extends IAutocompleteInputProps> extends ValidatedTextInput<P, IBaseAutocompleteState> {
  constructor(props: P) {
    super(props)
    this.state = {
      searchValue: '',
      isSearchValueValid: false,
      isFocused: false
    } as any
  }

  public abstract onOptionChange(option: string): void

  private get options(): React.ReactNode[] {
    const { isFocused } = this.state
    if (!isFocused) return

    return this.suggestionsInSearch.map(s => (
      <AutocompleteOption key={s} suggestion={s} onPress={this.handleOptionChange} />
    ))
  }

  private get suggestionsInSearch(): string[] {
    const { searchValue } = this.state
    const suggestions = this.props.suggestions
    if (!suggestions) return []
    return suggestions.filter(
      s =>
        s.toLowerCase().includes(searchValue.toLowerCase()) && s.toLocaleLowerCase() !== searchValue.toLocaleLowerCase()
    )
  }

  public render(): React.ReactNode {
    return (
      <View style={isIOS() ? styles.host : null}>
        <View style={styles.optionsContainer}>
          {super.render()}
          <View style={styles.options}>
            <ScrollView
              style={styles.optionsScroll}
              contentContainerStyle={styles.optionsContentScroll}
              keyboardShouldPersistTaps="always"
            >
              {this.options}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

  @autobind
  public handleChange(searchValue: string) {
    this.handleOptionChange(searchValue)
  }

  @autobind
  private handleOptionChange(value: string): void {
    this.setState({
      searchValue: value,
      isSearchValueValid: isTextValid(value)
    })
    this.onOptionChange(value)
  }
}

const styles = StyleSheet.create({
  host: {
    overflow: 'visible',
    zIndex: 1000
  },
  optionsContainer: {
    position: 'relative'
  },
  optionsScroll: {
    maxHeight: verticalScale(235),
    backgroundColor: colors.white
  },
  optionsContentScroll: {
    flexDirection: 'column'
  },
  options: {
    position: 'absolute',
    top: verticalScale(63),
    shadowColor: '#00000075',
    shadowOffset: { width: 0, height: verticalScale(5) },
    shadowOpacity: 0.9,
    shadowRadius: scale(5),
    ...Platform.select({
      android: {
        elevation: 5,
        backgroundColor: 'white'
      }
    }),
    zIndex: 1000
  }
})
