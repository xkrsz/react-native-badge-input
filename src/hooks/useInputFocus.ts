import { useState } from 'react'

export let useInputFocus = (initialState: boolean) => {
  let [isFocused, setIsFocused] = useState(initialState)

  let onFocus = () => setIsFocused(true)
  let onBlur = () => setIsFocused(false)

  return [
    isFocused,
    {
      onFocus,
      onBlur,
    },
  ]
}
