import FontAwesome from "@expo/vector-icons/FontAwesome"
import { forwardRef } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { FontAwesomeIconNames } from "@app/types"

type IconColor = "normal" | "danger"

interface Props extends TouchableOpacityProps {
  icon: FontAwesomeIconNames
  isActive?: boolean
  color?: IconColor
  count?: number
}

export const IconBtn = forwardRef<TouchableOpacity, Props>(
  (
    { icon, isActive = false, color = "normal", count, style, ...props },
    ref
  ) => {
    const faColor: Record<IconColor, string> = {
      normal: "hsl(235, 100%, 67%)",
      danger: "rgb(255,87,87)",
    }

    return (
      <TouchableOpacity ref={ref} style={[style, styles.btn]} {...props}>
        <FontAwesome
          name={icon}
          style={{
            ...styles.icon,
            color: isActive ? "rgb(255,87,87)" : faColor[color],
          }}
        />
        {count != null ? <Text style={styles.count}>{count}</Text> : null}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  icon: {
    fontSize: 12,
  },
  count: {
    color: "hsl(235, 100%, 67%)",
    marginLeft: 4,
  },
})
