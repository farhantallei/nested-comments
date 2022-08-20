import { useState } from "react"

interface Props {
  loading: boolean
  error?: string
  onSubmit: (message: string) => Promise<void>
  autoFocus?: boolean
  initialValue?: string
}

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}: Props) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(message).then(() => setMessage(""))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          placeholder="Comment here..."
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  )
}
