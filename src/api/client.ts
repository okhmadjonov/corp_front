import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { session } from './session'
import type { Tokens } from '@/types/auth'

const baseURL = import.meta.env.VITE_API_URL as string

// Backend shu sarlavhaga qarab o'z cookie'sini beradi (admin va sayt sessiyalari alohida)
const APP_HEADERS = { 'X-App': 'site' }

// withCredentials: brauzer refresh cookie'ni o'zi yuboradi va saqlaydi
export const api = axios.create({ baseURL, withCredentials: true, headers: APP_HEADERS })

api.interceptors.request.use((config) => {
  const token = session.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing: Promise<string> | null = null

/** Cookie orqali yangi access token oladi. Bir vaqtda ko'p chaqirilsa ham so'rov bitta. */
export function refreshAccessToken(): Promise<string> {
  refreshing ??= axios
    .post<Tokens>(`${baseURL}/auth/refresh`, null, {
      withCredentials: true,
      headers: APP_HEADERS,
    })
    .then(({ data }) => {
      session.set(data.access_token)
      return data.access_token
    })
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined
    // faqat token beruvchi so'rovlarda refresh qilinmaydi; /auth/me esa oddiy so'rov
    const isAuthCall = /^\/auth\/(login|register|refresh|logout)$/.test(original?.url ?? '')

    if (error.response?.status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true
      try {
        const token = await refreshAccessToken()
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        session.set(null)
        window.dispatchEvent(new Event('auth:expired'))
      }
    }
    return Promise.reject(error)
  },
)
