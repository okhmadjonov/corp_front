import { api } from './client'
import type { ClothesCard, PatternCard } from '@/types/catalog'

export type FavoriteKind = 'clothes' | 'patterns'

export interface FavoriteIds {
  clothes_ids: number[]
  pattern_ids: number[]
}

export const favoritesApi = {
  ids: () => api.get<FavoriteIds>('/favorites').then((r) => r.data),
  clothes: () => api.get<ClothesCard[]>('/favorites/clothes').then((r) => r.data),
  patterns: () => api.get<PatternCard[]>('/favorites/patterns').then((r) => r.data),
  add: (kind: FavoriteKind, id: number) => api.put(`/favorites/${kind}/${id}`),
  remove: (kind: FavoriteKind, id: number) => api.delete(`/favorites/${kind}/${id}`),
}