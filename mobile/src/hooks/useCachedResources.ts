import { usePostListContext } from "@app/contexts/PostListContext"
import { getPosts } from "@app/services/posts"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const { setPosts, setErrorMessage } = usePostListContext()

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        const posts = await getPosts()
        setPosts(posts)
      } catch (e) {
        setLoadingComplete(true)
        console.warn(e)
        setErrorMessage("Error")
        SplashScreen.hideAsync()
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
