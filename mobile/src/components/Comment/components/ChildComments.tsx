import { usePost } from "@app/contexts/PostContext"
import globalStyles from "@app/globalStyles"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCommentContext } from "../Comment.context"
import { CommentList } from "../CommentList"

export function ChildComments() {
  const { id, areChildrenHidden, toggleAreChildrenHidden } = useCommentContext()
  const { getReplies } = usePost()
  const comments = getReplies?.(id)

  if (!comments || comments.length === 0) return null

  if (areChildrenHidden)
    return (
      <TouchableOpacity
        style={[globalStyles.mt1, { alignItems: "flex-start" }]}
        onPress={() => toggleAreChildrenHidden(false)}>
        <View style={globalStyles.btn}>
          <Text style={globalStyles.btnLabel}>Show Replies</Text>
        </View>
      </TouchableOpacity>
    )

  return (
    <View style={styles.nestedCommentsStack}>
      <TouchableOpacity
        style={styles.collapseLine}
        onPress={() => toggleAreChildrenHidden(true)}>
        <View style={styles.line} />
      </TouchableOpacity>
      <View style={styles.nestedComments}>
        <CommentList comments={comments} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nestedCommentsStack: {
    flexDirection: "row",
  },
  nestedComments: {
    flexGrow: 1,
    marginLeft: 8,
  },
  collapseLine: {
    paddingHorizontal: 7.5,
    transform: [{ translateX: -7.5 }],
    marginTop: 8,
  },
  line: {
    flex: 1,
    backgroundColor: "hsl(235, 50%, 74%)",
    width: 2,
    borderRadius: 1,
  },
})
