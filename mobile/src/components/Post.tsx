import { usePost } from "@app/contexts/PostContext"
import globalStyles from "@app/globalStyles"
import { useAsyncFn } from "@app/hooks"
import { createComment } from "@app/services/comments"
import { useRef } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { CommentForm, CommentList } from "./Comment"

export function Post() {
  const { post, rootComments, createLocalComment } = usePost()
  const { loading, error, execute } = useAsyncFn(createComment)
  const scrollRef = useRef<ScrollView>(null)

  function onCommentCreate(message: string) {
    return execute({ postId: post.id, message }).then(createLocalComment)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={64}>
      <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
          <Text style={styles.commentsTitle}>Comments</Text>
          <CommentForm
            loading={loading}
            error={error}
            onSubmit={onCommentCreate}
            scrollRef={scrollRef}
          />
          {rootComments != null && rootComments.length > 0 && (
            <View style={globalStyles.mt4}>
              <CommentList comments={rootComments} />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 64,
  },
  postTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginVertical: 21,
  },
  postBody: {},
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },
})
