import { useCachedResources } from "@app/hooks"

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) return null

  return <>{children}</>
}
