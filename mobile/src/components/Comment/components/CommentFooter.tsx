import { IconBtn } from "@app/components/IconBtn"
import { usePost } from "@app/contexts/PostContext"
import globalStyles from "@app/globalStyles"
import { useAsyncFn } from "@app/hooks"
import { deleteComment, toggleCommentLike } from "@app/services/comments"
import { StyleSheet, Text, View } from "react-native"
import { useCommentContext } from "../Comment.context"

export function CommentFooter() {
  const {
    id,
    likeCount,
    likedByMe,
    isReplying,
    isEditing,
    toggleIsReplying,
    toggleIsEditing,
  } = useCommentContext()
  const { post, deleteLocalComment, toggleLocalCommentLike } = usePost()
  const {
    loading: deleteCommentLoading,
    error: deleteCommentError,
    execute: deleteCommentExecute,
  } = useAsyncFn(deleteComment)
  const {
    loading: toggleCommentLikeLoading,
    execute: toggleCommentLikeExecute,
  } = useAsyncFn(toggleCommentLike)

  function onCommentDelete() {
    return deleteCommentExecute({ postId: post.id, id }).then((comment) =>
      deleteLocalComment(comment.id)
    )
  }

  function onToggleCommentLike() {
    return toggleCommentLikeExecute({ postId: post.id, id }).then((comment) =>
      toggleLocalCommentLike(id, comment.addLike)
    )
  }

  return (
    <>
      <View style={styles.footer}>
        <IconBtn
          icon={likedByMe ? "heart" : "heart-o"}
          style={{ paddingLeft: 0 }}
          count={likeCount}
          onPress={onToggleCommentLike}
          disabled={toggleCommentLikeLoading}
        />
        <IconBtn
          icon="reply"
          onPress={() => toggleIsReplying()}
          isActive={isReplying}
        />
        <IconBtn
          icon="edit"
          onPress={() => toggleIsEditing()}
          isActive={isEditing}
        />
        <IconBtn
          icon="trash"
          color="danger"
          onPress={onCommentDelete}
          disabled={deleteCommentLoading}
        />
      </View>
      {deleteCommentError ? (
        <Text style={[globalStyles.errorMsg, globalStyles.mt1]}>
          {deleteCommentError}
        </Text>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    marginTop: 8,
  },
})
