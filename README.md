# React Native Badge Input

Modular badge input for React Native

## Installation

```
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
