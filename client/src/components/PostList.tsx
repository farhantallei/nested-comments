import { Link } from "react-router-dom"
import { useAsync } from "../hooks"
import { getPosts } from "../services/posts"

export function PostList() {
  const { loading, error, data } = useAsync(getPosts)

  if (loading) return <h1>Loading</h1>
  if (error || !data) return <h1 className="error-msg">{error}</h1>

  return (
    <>
      {data.map((post) => (
        <h1 key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h1>
      ))}
    </>
  )
}
