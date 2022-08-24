import { usePost } from "@app/contexts/PostContext"
import globalStyles from "@app/globalStyles"
import { useAsyncFn } from "@app/hooks"
import { createComment } from "@app/services/comments"
import { View } from "react-native"
import { useCommentContext } from "../Comment.context"
import { CommentForm } from "../CommentForm"

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
    <View style={[globalStyles.mt1, globalStyles.ml3]}>
      <CommentForm
        onSubmit={onCommentReply}
        loading={loading}
        error={error}
        autoFocus
      />
    </View>
  )
}
