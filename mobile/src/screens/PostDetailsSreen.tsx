import { Post } from "@app/components/Post"
import { PostProvider } from "@app/contexts/PostContext"
import { RootStackScreenProp } from "@app/navigation"

export function PostDetailsScreen({
  route,
}: RootStackScreenProp<"PostDetails">) {
  return (
    <PostProvider id={route.params.postId}>
      <Post />
    </PostProvider>
  )
}
