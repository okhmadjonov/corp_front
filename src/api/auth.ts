import { api } from './client'
import type { Tokens, User } from '@/types/auth'

export const authApi = {
  login: (login: string, password: string) =>
    api.post<Tokens>('/auth/login', { login, password }).then((r) => r.data),

  register: (login: string, password: string, full_name: string) =>
    api.post<Tokens>('/auth/register', { login, password, full_name }).then((r) => r.data),

  me: () => api.get<User>('/auth/me').then((r) => r.data),

  logout: (refresh_token: string) => api.post('/auth/logout', { refresh_token }),
}