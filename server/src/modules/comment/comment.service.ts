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

export async function getCommentUserId(
  reply: FastifyReply,
  { id }: { id: string }
) {
  return await commitToDB(
    prisma.comment.findUnique({ where: { id }, select: { userId: true } }),
    reply
  )
}

export async function getCommentLike(
  reply: FastifyReply,
  userId_commentId: { userId: string; commentId: string }
) {
  return await commitToDB(
    prisma.like.findUnique({ where: { userId_commentId } }),
    reply
  )
}

export async function createComment(
  reply: FastifyReply,
  {
    message,
    userId,
    postId,
    parentId,
  }: { message: string; userId: string; postId: string; parentId?: string }
) {
  return await commitToDB(
    prisma.comment.create({
      data: { message, userId, postId, parentId },
      select: COMMENT_SELECT_FIELDS,
    }),
    reply
  )
}

export async function likeComment(
  reply: FastifyReply,
  data: { userId: string; commentId: string }
) {
  return (await commitToDB(
    prisma.like.create({ data, select: null }),
    reply
  )) as never
}

export async function unlikeComment(
  reply: FastifyReply,
  userId_commentId: { userId: string; commentId: string }
) {
  return (await commitToDB(
    prisma.like.delete({ where: { userId_commentId }, select: null }),
    reply
  )) as never
}

export async function updateComment(
  reply: FastifyReply,
  { id, message }: { id: string; message: string }
) {
  return await commitToDB(
    prisma.comment.update({
      where: { id },
      data: { message },
      select: { message: true },
    }),
    reply
  )
}

export async function deleteComment(
  reply: FastifyReply,
  { id }: { id: string }
) {
  return await commitToDB(
    prisma.comment.delete({ where: { id }, select: { id: true } }),
    reply
  )
}
