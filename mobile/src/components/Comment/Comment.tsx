import { useToggle } from "@app/hooks"
import { CommentData } from "@app/types"
import { dateFormatter } from "@app/utils"
import { StyleSheet, Text, View } from "react-native"
import { CommentContext } from "./Comment.context"
import {
  ChildComments,
  CommentFooter,
  CommentMessage,
  ReplyCommentForm,
} from "./components"

export function Comment({ createdAt, user, ...comment }: CommentData) {
  const [isReplying, toggleIsReplying] = useToggle(false)
  const [isEditing, toggleIsEditing] = useToggle(false)
  const [areChildrenHidden, toggleAreChildrenHidden] = useToggle(true)

  const value: CommentContext = {
    createdAt,
    user,
    isReplying,
    isEditing,
    areChildrenHidden,
    toggleIsReplying,
    toggleIsEditing,
    toggleAreChildrenHidden,
    ...comment,
  }

  return (
    <CommentContext.Provider value={value}>
      <View style={styles.comment}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.date}>
            {dateFormatter(Date.parse(createdAt))}
          </Text>
        </View>
        <CommentMessage />
        <CommentFooter />
      </View>
      <ReplyCommentForm />
      <ChildComments />
    </CommentContext.Provider>
  )
}

const styles = StyleSheet.create({
  comment: {
    padding: 8,
    borderWidth: 1,
    borderColor: "hsl(235, 100%, 90%)",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    color: "hsl(235, 50%, 67%)",
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    color: "hsl(235, 50%, 67%)",
    fontSize: 12,
    fontWeight: "400",
  },
})
