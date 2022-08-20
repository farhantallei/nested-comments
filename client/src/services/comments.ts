import { CommentData } from "../types"
import { makeRequest } from "./makeRequest"

export function createComment({
  postId,
  parentId,
  message,
}: {
  postId: string
  parentId: string
  message: string
}) {
  return makeRequest<CommentData>(`posts/${postId}/comments`, {
    method: "POST",
    data: { parentId, message },
  })
}

export function updateComment({
  postId,
  id,
  message,
}: {
  postId: string
  id: string
  message: string
}) {
  return makeRequest<{ message: string }>(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function deleteComment({ postId, id }: { postId: string; id: string }) {
  return makeRequest<{ id: string }>(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({
  postId,
  id,
}: {
  postId: string
  id: string
}) {
  return makeRequest<{ addLike: boolean }>(
    `posts/${postId}/comments/${id}/toggleLike`,
    {
      method: "POST",
    }
  )
}
