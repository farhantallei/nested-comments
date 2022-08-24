declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string
      MOBILE_URL: string
      PORT: number
      HOST: string
      COOKIE_SECRET: string
    }
  }
}

export {}
