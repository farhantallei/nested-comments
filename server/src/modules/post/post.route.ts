import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import commentRoutes from "../comment/comment.route"
import { GetPostHandler, GetPostsHandler } from "./post.handler"
import { GetPostSchema, GetPostsSchema } from "./post.schema"

const postRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get("/", {
    schema: GetPostsSchema,
    handler: GetPostsHandler,
  })
  route.get("/:postId", {
    schema: GetPostSchema,
    handler: GetPostHandler,
  })
  route.register(commentRoutes, { prefix: ":postId/comments" })
}

export default postRoutes
