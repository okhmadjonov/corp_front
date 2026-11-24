import { isAxiosError } from 'axios'

export function getErrorMessage(err: unknown, fallback = 'Xatolik yuz berdi'): string {
  if (isAxiosError(err)) {
    const detail = err.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg)
    if (!err.response) return "Serverga ulanib bo'lmadi"
  }
  return fallback
}