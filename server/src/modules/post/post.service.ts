import { FastifyReply } from "fastify/types/reply"
import prisma from "../../prisma"
import { commitToDB } from "../../utils/commitToDB"

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
}

export async function getPosts(reply: FastifyReply) {
  return await commitToDB(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    }),
    reply
  )
}

export async function getPost(reply: FastifyReply, { id }: { id: string }) {
  return await commitToDB(
    prisma.post.findUnique({
      where: { id },
      select: {
        body: true,
        title: true,
        comments: {
          orderBy: { createdAt: "desc" },
          select: {
            ...COMMENT_SELECT_FIELDS,
            _count: { select: { likes: true } },
          },
        },
      },
    }),
    reply
  )
}

export async function getLikes(
  reply: FastifyReply,
  { userId, commentIds }: { userId: string; commentIds: string[] }
) {
  return await commitToDB(
    prisma.like.findMany({
      where: { userId, commentId: { in: commentIds } },
      select: { commentId: true },
    }),
    reply
  )
}
