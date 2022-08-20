import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import sensible from "@fastify/sensible"
import swagger from "@fastify/swagger"
import dotenv from "dotenv"
import fastify from "fastify"
import postRoutes from "./modules/post/post.route"
import prisma from "./prisma"
import { commitToDB } from "./utils/commitToDB"
dotenv.config()

const app = fastify()
app.register(sensible)
app.register(cookie, { secret: process.env.COOKIE_SECRET })
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
})
app.register(swagger, {
  routePrefix: "/docs",
  exposeRoute: true,
  staticCSP: true,
  openapi: { info: { title: "Nested Comments", version: "1.0.0" } },
})

app.addHook("onRequest", async (request, reply) => {
  const { userId } = request.cookies
  const user = await commitToDB(
    prisma.user.findFirst({ where: { name: "Kyle" }, select: { id: true } })
  )

  if (user == null) return reply.notFound("User is not found")

  if (userId !== user.id) {
    request.cookies.userId = user.id
    reply.clearCookie("userId")
    reply.setCookie("userId", user.id)
  }
})

app.register(postRoutes, { prefix: "/posts" })

app.listen({ port: process.env.PORT })

export default app
