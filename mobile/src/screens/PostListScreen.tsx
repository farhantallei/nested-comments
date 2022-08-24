import { usePostListContext } from "@app/contexts/PostListContext"
import { RootStackScreenProp } from "@app/navigation"
import { Button, ScrollView, StyleSheet, Text, View } from "react-native"

export function PostListScreen({
  navigation,
}: RootStackScreenProp<"PostList">) {
  const { posts, errorMessage } = usePostListContext()

  if (errorMessage)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    )

  return (
    <ScrollView style={{ flex: 1 }}>
      {posts.map((post) => (
        <Button
          key={post.id}
          title={post.title}
          onPress={() =>
            navigation.navigate("PostDetails", { postId: post.id })
          }
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 36,
  },
})
