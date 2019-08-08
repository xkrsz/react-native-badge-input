// @flow
// $FlowFixMe
import React, { useContext, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BadgeInputContext } from './badge-input'
import { colors } from './constants'
import { Badge } from './types'

interface Props {
  badge: Badge
}

export default function InputBadge({ badge }: Props) {
  let { badgeStyle, onBadgePress, textExtractor, keyExtractor } = useContext(
    BadgeInputContext
  )

  let onPress = useCallback(() => onBadgePress(keyExtractor(badge)), [badge])

  return (
    <TouchableOpacity style={[styles.container, badgeStyle]} onPress={onPress}>
      <Text style={styles.text}>{textExtractor(badge)}</Text>
      <Text style={styles.x}>x</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    marginLeft: 5,

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 4,
    paddingHorizontal: 10,

    backgroundColor: colors.badgeBg,
    borderRadius: 2,
  },

  text: {
    fontSize: 14,

    color: colors.badgeText,
  },

  x: {
    marginLeft: 7,

    fontWeight: '300',
    fontSize: 14,
    color: colors.badgeX,
  },
})
