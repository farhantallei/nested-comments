import globalStyles from "@app/globalStyles"
import { useState } from "react"
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

interface Props {
  loading: boolean
  error?: string
  onSubmit: (message: string) => Promise<void>
  autoFocus?: boolean
  initialValue?: string
  scrollRef?: React.RefObject<ScrollView>
}

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
  scrollRef,
}: Props) {
  const [message, setMessage] = useState(initialValue)
  const [messageInputPosY, setMessageInputPosY] = useState(0)

  function handleSubmit() {
    Keyboard.dismiss()
    onSubmit(message).then(() => setMessage(""))
  }

  function handleFocus() {
    if (!scrollRef) return
    scrollRef.current?.scrollTo({
      y: messageInputPosY,
      animated: true,
    })
  }

  return (
    <>
      <View
        style={styles.commentFormRow}
        onLayout={(e) => setMessageInputPosY(e.nativeEvent.layout.y - 250)}>
        <View style={styles.messageContainer}>
          <TextInput
            multiline
            autoFocus={autoFocus}
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.messageInput}
            onFocus={handleFocus}
          />
        </View>

        <TouchableOpacity
          style={[
            globalStyles.btn,
            {
              backgroundColor:
                loading || !message
                  ? "hsl(235, 20%, 74%)"
                  : "hsl(235, 100%, 67%)",
            },
          ]}
          onPress={handleSubmit}
          disabled={loading || !message}>
          <Text style={globalStyles.btnLabel}>
            {loading ? "Loading" : "Post"}
          </Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={globalStyles.errorMsg}>{error}</Text> : null}
    </>
  )
}

const styles = StyleSheet.create({
  commentFormRow: {
    flex: 1,
    flexDirection: "row",
  },
  messageContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  messageInput: {
    padding: 8,
    height: 70,
    borderWidth: 2,
    borderColor: "hsl(235,50%,74%)",
    borderRadius: 8,
    marginEnd: 8,
  },
})
