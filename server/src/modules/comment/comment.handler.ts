import { RouteHandlerTypebox } from "../../types"
import {
  CreateCommentTSchema,
  DeleteCommentTSchema,
  LikeCommentTSchema,
  UpdateCommentTSchema,
} from "./comment.schema"
import {
  createComment,
  deleteComment,
  getCommentLike,
  getCommentUserId,
  likeComment,
  unlikeComment,
  updateComment,
} from "./comment.service"

export const CreateCommentHandler: RouteHandlerTypebox<
  CreateCommentTSchema
> = async (request, reply) => {
  const { message, parentId } = request.body
  const { postId } = request.params
  const { userId } = request.cookies

  if (userId == null)
    return reply.unauthorized("User authentication is required")

  const { createdAt, ...comment } = await createComment(reply, {
    message,
    userId,
    postId,
    parentId,
  })

  return reply.code(201).send({
    ...comment,
    createdAt: createdAt.toISOString(),
    likeCount: 0,
    likedByMe: false,
  })
}

export const LikeCommentHandler: RouteHandlerTypebox<
  LikeCommentTSchema
> = async (request, reply) => {
  const { commentId } = request.params
  const { userId } = request.cookies

  if (userId == null)
    return reply.unauthorized("User authentication is required")

  const like = await getCommentLike(reply, { userId, commentId })

  if (like) {
    await likeComment(reply, { userId, commentId })
    return { addLike: true }
  }

  await unlikeComment(reply, { userId, commentId })
  return { addLike: false }
}

export const UpdateCommentHandler: RouteHandlerTypebox<
  UpdateCommentTSchema
> = async (request, reply) => {
  const { message } = request.body
  const { commentId } = request.params
  const { userId } = request.cookies

  if (userId == null)
    return reply.unauthorized("User authentication is required")

  const comment = await getCommentUserId(reply, { id: commentId })

  if (comment == null) return reply.notFound("Comment is not found")

  if (userId !== comment.userId)
    return reply.forbidden("You do not have permission to edit this message")

  return await updateComment(reply, { id: commentId, message })
}

export const DeleteCommentHandler: RouteHandlerTypebox<
  DeleteCommentTSchema
> = async (request, reply) => {
  const { commentId } = request.params
  const { userId } = request.cookies

  if (userId == null)
    return reply.unauthorized("User authentication is required")

  const comment = await getCommentUserId(reply, { id: commentId })

  if (comment == null) return reply.notFound("Comment is not found")

  if (userId !== comment.userId)
    return reply.forbidden("You do not have permission to edit this message")

  return await deleteComment(reply, { id: commentId })
}
