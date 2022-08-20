import { Type } from "@sinclair/typebox"
import { CommentSchema, PostSchema, UserSchema } from "../../schemas"

export const GetPostsSchema = {
  response: {
    200: Type.Array(
      Type.Object({
        id: PostSchema.id,
        title: PostSchema.title,
      })
    ),
  },
}

export type GetPostsTSchema = typeof GetPostsSchema

export const GetPostSchema = {
  params: Type.Object({
    postId: PostSchema.id,
  }),
  response: {
    200: Type.Object({
      title: PostSchema.title,
      body: PostSchema.body,
      comments: Type.Array(
        Type.Object({
          ...CommentSchema,
          user: Type.Object(UserSchema),
          likeCount: Type.Number(),
          likedByMe: Type.Boolean(),
        })
      ),
    }),
  },
}

export type GetPostTSchema = typeof GetPostSchema
