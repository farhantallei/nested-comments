import { usePost } from "@app/contexts/PostContext"
import { useAsyncFn } from "@app/hooks"
import { updateComment } from "@app/services/comments"
import { StyleSheet, Text } from "react-native"
import { useCommentContext } from "../Comment.context"
import { CommentForm } from "../CommentForm"

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
  return <Text style={styles.message}>{message}</Text>
}

const styles = StyleSheet.create({
  message: {
    marginHorizontal: 8,
  },
})
