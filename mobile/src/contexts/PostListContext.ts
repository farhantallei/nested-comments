import { PostListData } from "@app/types"
import { createContext, useContext } from "react"

interface PostListContextValue {
  posts: PostListData[]
  setPosts: React.Dispatch<PostListData[]>
  errorMessage: string | null
  setErrorMessage: React.Dispatch<string | null>
}

export const PostListContext = createContext<PostListContextValue>(null!)

export function usePostListContext(): PostListContextValue {
  return useContext(PostListContext) || {}
}
