// @flow
// $FlowFixMe
import React, { useRef, useCallback, createContext, ReactElement } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  TextInputProps,
  TouchableOpacityProps,
} from 'react-native'
import InputBadge from './input-badge'
import { useInputFocus } from './hooks'
import { Badge } from './types'
import { colors } from './constants'

interface Props extends TextInputProps {
  badges: Badge[]
  value: string
  onChangeText: (_: string) => void
  onBadgePress: () => void
  inputSuffix?: () => ReactElement
  badgeStyle?: TouchableOpacityProps['style']
  inputProps?: TextInputProps
  keyExtractor?: (_: any) => string
  textExtractor?: (_: any) => string
}

let defaultBadgeExtractor = (badge: any) => badge

interface IBadgeInputContext {
  onBadgePress: (_: any) => void
  textExtractor: (_: any) => string
  keyExtractor: (_: any) => string
  badgeStyle?: TouchableOpacityProps['style']
}

export let BadgeInputContext = createContext<IBadgeInputContext>({
  onBadgePress: (_: any) => {},
  badgeStyle: undefined,
  textExtractor: defaultBadgeExtractor,
  keyExtractor: defaultBadgeExtractor,
})

export let BadgeInput = ({
  badges = [],
  value = '',
  onChangeText = () => {},
  onBadgePress = () => {},
  inputSuffix = undefined,
  badgeStyle = undefined,
  inputProps = {},
  style = undefined,
  textExtractor = (badge: string) => badge,
  keyExtractor = textExtractor,
}: Props) => {
  const [isFocused, focusProps] = useInputFocus(false)
  const inputRef = useRef<TextInput>(null)

  // Handle press of an entire component and focus on the input
  const onPress = useCallback(() => {
    if (!inputRef.current) return

    inputRef.current.focus()
  }, [])

  // Show Text with the placeholder instead of using TextInputs placeholder,
  // as it would be shown when internal TextInput is empty.
  const showPlaceholder = value.length + badges.length === 0 && !isFocused

  const renderPlaceholder = useCallback(
    () => <Text style={styles.placeholder}>Search</Text>,
    []
  )

  const renderBadges = useCallback(
    () =>
      badges.map(badge => (
        <InputBadge key={keyExtractor(badge)} badge={badge} />
      )),
    [badges]
  )

  return (
    <BadgeInputContext.Provider
      value={{
        onBadgePress,
        badgeStyle,
        textExtractor,
        keyExtractor,
      }}
    >
      <TouchableWithoutFeedback onPress={onPress} style={style}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {showPlaceholder && renderPlaceholder()}
            {renderBadges()}
            <TextInput
              ref={inputRef}
              value={value}
              onChangeText={onChangeText}
              style={[styles.input, inputProps && inputProps.style]}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              {...focusProps}
              {...inputProps}
            />
          </View>
          {inputSuffix && (
            <View style={styles.suffixContainer}>{inputSuffix()}</View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </BadgeInputContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 3,
    paddingLeft: 5,
    paddingRight: 10,

    backgroundColor: colors.input.background,
    borderRadius: 3,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  suffixContainer: {
    marginTop: 7.5,
    marginRight: 5,
  },

  placeholder: {
    marginLeft: 5,

    fontSize: 14,

    color: colors.input.placeholder,
  },

  input: {
    flex: 1,

    marginVertical: 3,
    marginLeft: 5,

    fontSize: 14,
    color: colors.input.text,
  },
})
