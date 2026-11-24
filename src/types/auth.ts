export type RoleName = 'super_admin' | 'operator' | 'user'

export interface Role {
  id: number
  name: RoleName
}

export interface User {
  id: number
  login: string
  full_name: string
  role: Role
}

export interface Tokens {
  access_token: string
  refresh_token: string
  token_type: string
}