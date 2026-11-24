import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { tokenStorage } from '@/utils/tokenStorage'
import type { Tokens } from '@/types/auth'

const baseURL = import.meta.env.VITE_API_URL as string

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const refresh = tokenStorage.getRefresh()
  if (!refresh) throw new Error('No refresh token')
  try {
    const { data } = await axios.post<Tokens>(`${baseURL}/auth/refresh`, {
      refresh_token: refresh,
    })
    tokenStorage.set(data.access_token, data.refresh_token)
    return data.access_token
  } catch (err) {
    // Boshqa tab shu orada tokenni yangilagan bo'lsa (rotation), bizniki bekor
    // bo'lgan — lekin localStorage'da yangisi bor, chiqib ketmasdan o'shani olamiz.
    const access = tokenStorage.getAccess()
    if (access && tokenStorage.getRefresh() !== refresh) return access
    throw err
  }
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
        // bir vaqtda ko'p so'rov 401 olsa, refresh faqat bir marta bajariladi
        refreshing ??= refreshAccessToken().finally(() => {
          refreshing = null
        })
        const token = await refreshing
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        tokenStorage.clear()
        window.dispatchEvent(new Event('auth:expired'))
      }
    }
    return Promise.reject(error)
  },
)