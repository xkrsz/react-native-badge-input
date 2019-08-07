import { useState } from 'react'

export let useInputFocus = (initialState: boolean) => {
  const [isFocused, setIsFocused] = useState(initialState)

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)

  return [
    isFocused,
    {
      onFocus,
      onBlur,
    },
  ]
}
