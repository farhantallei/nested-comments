export interface PostListData {
  id: string
  title: string
}

export interface CommentData {
  id: string
  message: string
  parentId: string | null
  createdAt: string
  user: {
    id: string
    name: string
  }
  likeCount: number
  likedByMe: boolean
}

export interface PostData {
  body: string
  title: string
  comments: CommentData[]
}

export interface FastifyError {
  statusCode: number
  error: string
  message: string
}
