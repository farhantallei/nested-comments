import { FastifyReply } from "fastify/types/reply"
import app from "../server"

export async function commitToDB<T>(prisma: Promise<T>, reply?: FastifyReply) {
  const [error, data] = await app.to(prisma)
  if (error) {
    if (reply) return reply.internalServerError(error.message) as never
    return app.httpErrors.internalServerError(error.message) as never
  }
  return data
}
