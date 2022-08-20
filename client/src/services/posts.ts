import { PostData, PostListData } from "../types"
import { makeRequest } from "./makeRequest"

export function getPosts() {
  return makeRequest<PostListData[]>("/posts")
}

export function getPost(id: string) {
  return makeRequest<PostData>(`/posts/${id}`)
}
