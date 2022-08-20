import { useCallback, useEffect, useState } from "react"

export function useAsync<T>(
  promise: (...params: any) => Promise<T>,
  dependencies: Array<any> = []
) {
  const { execute, ...state } = useAsyncInternal<T>(promise, dependencies, true)

  useEffect(() => {
    execute()
  }, [execute])

  return state
}

export function useAsyncFn<T>(
  promise: (...params: any) => Promise<T>,
  dependencies: Array<any> = []
) {
  return useAsyncInternal<T>(promise, dependencies, false)
}

function useAsyncInternal<T>(
  promise: (...params: any) => Promise<T>,
  dependencies: Array<any>,
  initialLoading: boolean = false
) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState<string>()
  const [data, setData] = useState<T>()

  const execute = useCallback((...params: any) => {
    setLoading(true)
    return promise(...params)
      .then((data: T) => {
        setData(data)
        setError(undefined)
        return data
      })
      .catch((error: string) => {
        setError(error)
        setData(undefined)
        return Promise.reject(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, dependencies)

  return {
    loading,
    error,
    data,
    execute,
  }
}
