declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string
      PORT: number
      COOKIE_SECRET: string
    }
  }
}

export {}
