import { usePost } from "../../../contexts/PostContext"
import { useAsyncFn } from "../../../hooks"
import { CommentForm } from "../CommentForm"
import { createComment } from "../../../services/comments"
import { useCommentContext } from "../Comment.context"

export function ReplyCommentForm() {
  const {
    id: parentId,
    isReplying,
    toggleIsReplying,
    toggleAreChildrenHidden,
  } = useCommentContext()
  const { post, createLocalComment } = usePost()
  const { loading, error, execute } = useAsyncFn(createComment)

  function onCommentReply(message: string) {
    return execute({ postId: post.id, parentId, message }).then((comment) => {
      toggleIsReplying(false)
      toggleAreChildrenHidden(false)
      createLocalComment(comment)
    })
  }

  if (!isReplying) return null
  return (
    <div className="mt-1 ml-3">
      <CommentForm
        onSubmit={onCommentReply}
        loading={loading}
        error={error}
        autoFocus
      />
    </div>
  )
}
