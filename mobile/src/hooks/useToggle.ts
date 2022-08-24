import { useState } from "react"

export function useToggle(
  defaultValue: boolean | (() => boolean)
): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(value?: boolean) {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    )
  }

  return [value, toggleValue]
}
