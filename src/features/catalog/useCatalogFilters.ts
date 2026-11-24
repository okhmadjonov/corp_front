import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Sort } from '@/types/catalog'

export interface CatalogFilters {
  gender: number | null
  season: number | null
  tag: string | null
  q: string
  sort: Sort
  page: number // 0 dan boshlanadi
}

const toPositiveInt = (value: string | null): number | null => {
  const n = Number(value)
  return value && Number.isInteger(n) && n > 0 ? n : null
}

export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()

  const filters: CatalogFilters = useMemo(
    () => ({
      gender: toPositiveInt(params.get('gender')),
      season: toPositiveInt(params.get('season')),
      tag: params.get('tag'),
      q: params.get('q') ?? '',
      sort: params.get('sort') === 'popular' ? 'popular' : 'new',
      page: (toPositiveInt(params.get('page')) ?? 1) - 1,
    }),
    [params],
  )

  const update = useCallback(
    (patch: Partial<CatalogFilters>) => {
      const next = new URLSearchParams(params)
      const put = (key: string, value: string | number | null, skip = false) => {
        if (value === null || value === '' || skip) next.delete(key)
        else next.set(key, String(value))
      }

      if ('gender' in patch) put('gender', patch.gender ?? null)
      if ('season' in patch) put('season', patch.season ?? null)
      if ('tag' in patch) put('tag', patch.tag ?? null)
      if ('q' in patch) put('q', patch.q ?? '')
      if ('sort' in patch) put('sort', patch.sort ?? 'new', patch.sort === 'new')

      if ('page' in patch) put('page', (patch.page ?? 0) + 1, (patch.page ?? 0) === 0)
      else next.delete('page') // filtr o'zgarsa, 1-sahifaga qaytadi

      setParams(next)
    },
    [params, setParams],
  )

  return { filters, update }
}