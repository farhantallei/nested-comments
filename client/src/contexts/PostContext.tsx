import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAsync } from "../hooks"
import { getPost } from "../services/posts"
import { CommentData, PostData } from "../types"

interface PostContext {
  post: { id: string } & PostData
  rootComments?: CommentData[]
  getReplies?: (parentId: string) => CommentData[]
  createLocalComment: (comment: CommentData) => void
  updateLocalComment: (id: string, message: string) => void
  deleteLocalComment: (id: string) => void
  toggleLocalCommentLike: (id: string, addLike: boolean) => void
}

const Context = createContext({} as PostContext)

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams() as { id: string }
  const { loading, error, data } = useAsync(() => getPost(id), [id])
  const [comments, setComments] = useState<CommentData[]>([])
  const commentsByParentId = useMemo(() => {
    const group: {
      [parentId: string]: CommentData[]
    } = {}
    comments.forEach((comment) => {
      const parentId = comment.parentId || "root"
      group[parentId] ||= []
      group[parentId].push(comment)
    })
    return group
  }, [comments])

  useEffect(() => {
    if (data?.comments == null) return
    setComments(data.comments)
  }, [data?.comments])

  function getReplies(parentId: string) {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment: CommentData) {
    setComments((prevComments) => [comment, ...prevComments])
  }

  function updateLocalComment(id: string, message: string) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) return { ...comment, message }
        return comment
      })
    )
  }

  function deleteLocalComment(id: string) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    )
  }

  function toggleLocalCommentLike(id: string, addLike: boolean) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (id === comment.id) {
          if (addLike)
            return {
              ...comment,
              likeCount: comment.likeCount + 1,
              likedByMe: true,
            }
          return {
            ...comment,
            likeCount: comment.likeCount - 1,
            likedByMe: false,
          }
        }
        return comment
      })
    )
  }

  if (!data) return null
  return (
    <Context.Provider
      value={{
        post: { id, ...data },
        rootComments: commentsByParentId["root"],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}
