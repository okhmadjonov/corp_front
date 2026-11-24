import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { favoritesApi, type FavoriteIds, type FavoriteKind } from '@/api/favorites'
import { useAuth } from '@/features/auth/useAuth'

const IDS_KEY = ['favorites', 'ids']

const field = (kind: FavoriteKind) => (kind === 'clothes' ? 'clothes_ids' : 'pattern_ids')

export function useFavorites() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: ids } = useQuery({
    queryKey: IDS_KEY,
    queryFn: favoritesApi.ids,
    enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
  })

  const mutation = useMutation({
    mutationFn: ({ kind, id, add }: { kind: FavoriteKind; id: number; add: boolean }) =>
      add ? favoritesApi.add(kind, id) : favoritesApi.remove(kind, id),

    // darrov yangilaymiz, server javobini kutmaymiz
    onMutate: async ({ kind, id, add }) => {
      await qc.cancelQueries({ queryKey: IDS_KEY })
      const previous = qc.getQueryData<FavoriteIds>(IDS_KEY)
      if (previous) {
        const rest = previous[field(kind)].filter((x) => x !== id)
        qc.setQueryData<FavoriteIds>(IDS_KEY, {
          ...previous,
          [field(kind)]: add ? [...rest, id] : rest,
        })
      }
      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(IDS_KEY, ctx.previous)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  })

  const has = (kind: FavoriteKind, id: number) => ids?.[field(kind)].includes(id) ?? false

  const toggle = (kind: FavoriteKind, id: number) => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }
    mutation.mutate({ kind, id, add: !has(kind, id) })
  }

  return { ids, has, toggle }
}