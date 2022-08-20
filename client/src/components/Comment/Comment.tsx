import { useToggle } from "../../hooks"
import { CommentData } from "../../types"
import { CommentContext } from "./Comment.context"
import {
  ChildComments,
  CommentFooter,
  CommentMessage,
  ReplyCommentForm,
} from "./components"

export function Comment({ createdAt, user, ...comment }: CommentData) {
  const [isReplying, toggleIsReplying] = useToggle(false)
  const [isEditing, toggleIsEditing] = useToggle(false)
  const [areChildrenHidden, toggleAreChildrenHidden] = useToggle(true)

  const value: CommentContext = {
    createdAt,
    user,
    isReplying,
    isEditing,
    areChildrenHidden,
    toggleIsReplying,
    toggleIsEditing,
    toggleAreChildrenHidden,
    ...comment,
  }

  return (
    <CommentContext.Provider value={value}>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <CommentMessage />
        <CommentFooter />
      </div>
      <ReplyCommentForm />
      <ChildComments />
    </CommentContext.Provider>
  )
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})
