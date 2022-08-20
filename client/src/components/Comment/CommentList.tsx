import { Comment } from "./Comment"
import { CommentData } from "../../types"

export function CommentList({ comments }: { comments: CommentData[] }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-stack">
          <Comment {...comment} />
        </div>
      ))}
    </>
  )
}
