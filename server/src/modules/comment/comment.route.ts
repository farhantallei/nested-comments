import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import {
  CreateCommentHandler,
  DeleteCommentHandler,
  LikeCommentHandler,
  UpdateCommentHandler,
} from "./comment.handler"
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  LikeCommentSchema,
  UpdateCommentSchema,
} from "./comment.schema"

const commentRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.post("/", {
    schema: CreateCommentSchema,
    handler: CreateCommentHandler,
  })
  route.post("/:commentId/toggleLike", {
    schema: LikeCommentSchema,
    handler: LikeCommentHandler,
  })
  route.put("/:commentId", {
    schema: UpdateCommentSchema,
    handler: UpdateCommentHandler,
  })
  route.delete("/:commentId", {
    schema: DeleteCommentSchema,
    handler: DeleteCommentHandler,
  })
}

export default commentRoutes
