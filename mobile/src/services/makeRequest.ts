import { REACT_APP_SERVER_URL } from "@env"
import axios, { AxiosRequestConfig } from "axios"
import { FastifyError } from "../types"

const api = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  withCredentials: true,
})

export async function makeRequest<T = undefined>(
  url: string,
  options?: AxiosRequestConfig<any>
) {
  try {
    const res = await api(url, options)
    return res.data as T
  } catch (err) {
    console.warn(err)
    if (
      !axios.isAxiosError(err) ||
      !err.response ||
      !(err.response.data as FastifyError).message
    )
      return Promise.reject("Error")
    return Promise.reject((err.response.data as FastifyError).message)
  }
}
