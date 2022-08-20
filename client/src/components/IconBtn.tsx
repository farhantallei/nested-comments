import { forwardRef } from "react"
import { IconType } from "react-icons"

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.AriaAttributes {
  Icon: IconType
  isActive?: boolean
  color?: "danger"
}

export const IconBtn = forwardRef<HTMLButtonElement, Props>(
  ({ Icon, isActive = false, color, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
          color || ""
        }`}
        {...props}>
        <span className={`${children != null ? "mr-1" : ""}`}>
          <Icon />
        </span>
        {children}
      </button>
    )
  }
)
