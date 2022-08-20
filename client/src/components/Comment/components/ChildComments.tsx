import { CommentList } from "../CommentList"
import { useCommentContext } from "../Comment.context"
import { usePost } from "../../../contexts/PostContext"

export function ChildComments() {
  const { id, areChildrenHidden, toggleAreChildrenHidden } = useCommentContext()
  const { getReplies } = usePost()
  const comments = getReplies?.(id)

  if (!comments || comments.length === 0) return null
  return (
    <>
      <div
        className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}>
        <button
          className="collapse-line"
          aria-label="Hide Replies"
          onClick={() => toggleAreChildrenHidden(true)}
        />
        <div className="nested-comments">
          <CommentList comments={comments} />
        </div>
      </div>
      <button
        className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
        onClick={() => toggleAreChildrenHidden(false)}>
        Show Replies
      </button>
    </>
  )
}
