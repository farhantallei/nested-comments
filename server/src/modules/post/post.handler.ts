import { RouteHandlerTypebox } from "../../types"
import { GetPostsTSchema, GetPostTSchema } from "./post.schema"
import { getLikes, getPost, getPosts } from "./post.service"

export const GetPostsHandler: RouteHandlerTypebox<GetPostsTSchema> = async (
  request,
  reply
) => {
  return await getPosts(reply)
}

export const GetPostHandler: RouteHandlerTypebox<GetPostTSchema> = async (
  request,
  reply
) => {
  const { postId } = request.params
  const { userId } = request.cookies

  if (userId == null)
    return reply.unauthorized("User authentication is required")

  const post = await getPost(reply, { id: postId })

  if (post == null) return reply.notFound("Post is not found")

  const commentIds = post.comments.map((comment) => comment.id)

  const likes = await getLikes(reply, { userId, commentIds })

  const comments = post.comments.map(({ _count, createdAt, ...comment }) => ({
    ...comment,
    createdAt: createdAt.toISOString(),
    likeCount: _count.likes,
    likedByMe: likes.find((like) => like.commentId === comment.id) != null,
  }))

  return {
    title: post.title,
    body: post.body,
    comments,
  }
}
