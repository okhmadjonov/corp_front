import { api } from './client'
import type {
  ClothesCard, ClothesDetail, NamedItem, Page, PatternCard, PatternDetail, Sort, Tag,
} from '@/types/catalog'
export interface CatalogParams {
  gender_id?: number
  season_id?: number
  tag?: string
  q?: string
  sort: Sort
  limit: number
  offset: number
}

export const catalogApi = {
  genders: () => api.get<NamedItem[]>('/genders').then((r) => r.data),
  seasons: () => api.get<NamedItem[]>('/seasons').then((r) => r.data),
  tags: () => api.get<Tag[]>('/tags').then((r) => r.data),
    clothesDetail: (slug: string) =>
    api.get<ClothesDetail>(`/clothes/${encodeURIComponent(slug)}`).then((r) => r.data),
  patternDetail: (slug: string) =>
    api.get<PatternDetail>(`/patterns/${encodeURIComponent(slug)}`).then((r) => r.data),

  listClothes: (params: CatalogParams) =>
    api.get<Page<ClothesCard>>('/clothes', { params }).then((r) => r.data),
  listPatterns: (params: CatalogParams) =>
    api.get<Page<PatternCard>>('/patterns', { params }).then((r) => r.data),
}