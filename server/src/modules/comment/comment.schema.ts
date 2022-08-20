import { Type } from "@sinclair/typebox"
import { CommentSchema, PostSchema, UserSchema } from "../../schemas"

export const CreateCommentSchema = {
  body: Type.Object({
    message: CommentSchema.message,
    parentId: Type.Optional(Type.Unsafe<string>(CommentSchema.parentId)),
  }),
  params: Type.Object({
    postId: PostSchema.id,
  }),
  response: {
    201: Type.Object({
      ...CommentSchema,
      user: Type.Object(UserSchema),
      likeCount: Type.Number(),
      likedByMe: Type.Boolean(),
    }),
  },
}

export type CreateCommentTSchema = typeof CreateCommentSchema

export const LikeCommentSchema = {
  params: Type.Object({
    commentId: PostSchema.id,
  }),
  response: {
    200: Type.Object({
      addLike: Type.Boolean(),
    }),
  },
}

export type LikeCommentTSchema = typeof LikeCommentSchema

export const UpdateCommentSchema = {
  body: Type.Object({
    message: CommentSchema.message,
  }),
  params: Type.Object({
    commentId: PostSchema.id,
  }),
  response: {
    200: Type.Object({
      message: CommentSchema.message,
    }),
  },
}

export type UpdateCommentTSchema = typeof UpdateCommentSchema

export const DeleteCommentSchema = {
  params: Type.Object({
    commentId: PostSchema.id,
  }),
  response: {
    200: Type.Object({
      id: CommentSchema.id,
    }),
  },
}

export type DeleteCommentTSchema = typeof DeleteCommentSchema
