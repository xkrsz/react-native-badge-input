# React Native Badge Input

Modular badge input for React Native

## Installation

```bash
yarn add react-native-badge-input
```

## Usage

```jsx harmony
import React, { useState } from 'react'
import BadgeInput from 'react-native-badge-input'

let Example = () => {
  let [value, setValue] = useState('')
  let [badges, setBadges] = useState([])
  
  let addBadge = badge =>
    setBadges([...badges, badge])

  let removeBadge = removedBadge =>
    setBadges(
      badges.filter(badge => badge !== removedBadge)
    )

  return (
    <BadgeInput
      value={value}
      onChangeText={setValue}
      badges={badges}
      onBadgePress={removeBadge}
      onSubmitEditing={addBadge}
    />
  )
}
```

## Props

[TextInput props...](https://facebook.github.io/react-native/docs/textinput)

| name                   | required | default   | description |
| ---------------------- | -------- | --------- | ----------- |
| value                  | yes      |           | Current input value |
| onChangeText           | yes      |           | [TextInput onchangeText](https://facebook.github.io/react-native/docs/textinput#onchangetext) |
| badges                 | yes      |           | An array of badges |
| onBadgePress           | yes      |           | Badge on press action |
| placeholder            | no       |           | Input placeholder. |
| inputSuffix            | no       |           | Content rendered at the end of the input, for example an icon. |
| badgeStyle             | no       |           | Badge component style |
| inputProps             | no       |           | Props additionally passed to input. This is useful if you want to pass any styles that are overriden by the props object. |
| keyExtractor           | no       | `() => string` | Badge key extractor. |
| textExtractor          | no       | `() => string` | Badge text extractor, required when your badge is not a string. |
