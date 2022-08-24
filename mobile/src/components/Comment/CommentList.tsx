import { CommentData } from "@app/types"
import { StyleSheet, View } from "react-native"
import { Comment } from "./Comment"

export function CommentList({ comments }: { comments: CommentData[] }) {
  return (
    <>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentStack}>
          <Comment {...comment} />
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  commentStack: {
    marginTop: 8,
  },
})
