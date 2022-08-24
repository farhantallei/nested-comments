import { useAsync } from "@app/hooks"
import { getPost } from "@app/services/posts"
import globalStyles from "@app/globalStyles"
import { CommentData, PostData } from "@app/types"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Text } from "react-native"

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

export function PostProvider({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
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

  return (
    <Context.Provider
      value={{
        post: { id, ...data! },
        rootComments: commentsByParentId["root"],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}>
      {loading ? (
        <Text>Loading</Text>
      ) : error ? (
        <Text style={globalStyles.errorMsg}>{error}</Text>
      ) : (
        children
      )}
    </Context.Provider>
  )
}
