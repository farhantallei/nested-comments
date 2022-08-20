import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from "../../../contexts/PostContext"
import { useAsyncFn, useUser } from "../../../hooks"
import { IconBtn } from "../../IconBtn"
import { deleteComment, toggleCommentLike } from "../../../services/comments"
import { useCommentContext } from "../Comment.context"

export function CommentFooter() {
  const {
    id,
    user,
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
  const currentUser = useUser()

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
      <div className="footer">
        <IconBtn
          disabled={toggleCommentLikeLoading}
          onClick={onToggleCommentLike}
          Icon={likedByMe ? FaHeart : FaRegHeart}
          aria-label={likedByMe ? "Unlike" : "Like"}>
          {likeCount}
        </IconBtn>
        <IconBtn
          onClick={() => toggleIsReplying()}
          isActive={isReplying}
          Icon={FaReply}
          aria-label={isReplying ? "Cancel Reply" : "Reply"}
        />
        {user.id === currentUser.id ? (
          <>
            <IconBtn
              onClick={() => toggleIsEditing()}
              isActive={isEditing}
              Icon={FaEdit}
              aria-label={isEditing ? "Cancel Edit" : "Edit"}
            />
            <IconBtn
              disabled={deleteCommentLoading}
              onClick={onCommentDelete}
              Icon={FaTrash}
              aria-label="Delete"
              color="danger"
            />
          </>
        ) : null}
      </div>
      <div className="error-msg mt-1">{deleteCommentError}</div>
    </>
  )
}
