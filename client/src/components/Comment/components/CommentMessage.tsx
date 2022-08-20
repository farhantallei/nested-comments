import { usePost } from "../../../contexts/PostContext"
import { useAsyncFn } from "../../../hooks"
import { CommentForm } from "../CommentForm"
import { updateComment } from "../../../services/comments"
import { useCommentContext } from "../Comment.context"

export function CommentMessage() {
  const { id, message, isEditing, toggleIsEditing } = useCommentContext()
  const { post, updateLocalComment } = usePost()
  const { loading, error, execute } = useAsyncFn(updateComment)

  function onCommentUpdate(message: string) {
    return execute({ postId: post.id, id, message }).then((comment) => {
      toggleIsEditing(false)
      updateLocalComment(id, comment.message)
    })
  }

  if (isEditing)
    return (
      <CommentForm
        onSubmit={onCommentUpdate}
        loading={loading}
        error={error}
        autoFocus
        initialValue={message}
      />
    )
  return <div className="message">{message}</div>
}
