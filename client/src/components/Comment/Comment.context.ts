import { createContext, useContext } from "react"
import { CommentData } from "../../types"

export interface CommentContext extends CommentData {
  isReplying: boolean
  isEditing: boolean
  areChildrenHidden: boolean
  toggleIsReplying: (value?: boolean) => void
  toggleIsEditing: (value?: boolean) => void
  toggleAreChildrenHidden: (value?: boolean) => void
}

export const CommentContext = createContext<CommentContext>(null!)

export function useCommentContext(): CommentContext {
  return useContext(CommentContext) || {}
}
