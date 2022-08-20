import { Type } from "@sinclair/typebox"

export const UserSchema = {
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
}

export const PostSchema = {
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  body: Type.String(),
}

export const CommentSchema = {
  id: Type.String({ format: "uuid" }),
  message: Type.String(),
  parentId: Type.Union([Type.String({ format: "uuid" }), Type.Null()]),
  createdAt: Type.String({ format: "date-time" }),
}
