import { PostListContext } from "@app/contexts/PostListContext"
import Navigation from "@app/navigation"
import { SplashScreen } from "@app/screens/SplashScreen"
import { PostListData } from "@app/types"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"

function App() {
  const [posts, setPosts] = useState<PostListData[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <PostListContext.Provider
      value={{ posts, setPosts, errorMessage, setErrorMessage }}>
      <SplashScreen>
        <Navigation />
        <StatusBar style="dark" />
      </SplashScreen>
    </PostListContext.Provider>
  )
}

export default App
