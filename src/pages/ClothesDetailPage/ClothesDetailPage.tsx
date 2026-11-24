import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { catalogApi } from '@/api/catalog'
import { ImageGallery } from '@/components/ImageGallery/ImageGallery'
import { getErrorMessage } from '@/utils/errors'
import { formatPrice } from '@/utils/format'
import styles from '@/pages/DetailPage.module.scss'

export default function ClothesDetailPage() {
  const { slug = '' } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', 'clothes-detail', slug],
    queryFn: () => catalogApi.clothesDetail(slug),
    staleTime: 60_000, // har qaytganda ko'rishlar sonini oshirib yubormaslik uchun
  })

  const [pickedColor, setPickedColor] = useState<string | null>(null)
  const [pickedSize, setPickedSize] = useState<string | null>(null)

  const variants = useMemo(() => data?.variants ?? [], [data])
  const colors = useMemo(() => [...new Set(variants.map((v) => v.color))], [variants])

  if (isLoading) return <p className={styles.notFound}>Yuklanmoqda...</p>
  if (error || !data) {
    const notFound = isAxiosError(error) && error.response?.status === 404
    return <p className={styles.notFound}>{notFound ? 'Kiyim topilmadi' : getErrorMessage(error)}</p>
  }

  // tanlov: foydalanuvchi tanlamagan bo'lsa, birinchisi
  const color = pickedColor && colors.includes(pickedColor) ? pickedColor : colors[0]
  const colorVariants = variants.filter((v) => v.color === color)
  const size =
    pickedSize && colorVariants.some((v) => v.size === pickedSize) ? pickedSize : colorVariants[0]?.size
  const variant = colorVariants.find((v) => v.size === size)

  return (
    <div className={styles.page}>
      <Link to="/clothes" className={styles.back}>
        ← Kiyimlarga qaytish
      </Link>

      <div className={styles.layout}>
        <ImageGallery images={data.images} alt={data.name} />

        <div className={styles.info}>
          {data.brand && <div className={styles.brand}>{data.brand}</div>}
          <h1 className={styles.title}>{data.name}</h1>
          <div className={styles.meta}>
            {data.gender.name} · {data.season.name}
          </div>

          <div className={styles.price}>
            {variant ? formatPrice(variant.price) : "Narx ko'rsatilmagan"}
          </div>

          {colors.length > 0 && (
            <div>
              <div className={styles.label}>Rang: {color}</div>
              <div className={styles.options}>
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={c === color ? `${styles.option} ${styles.optionOn}` : styles.option}
                    onClick={() => setPickedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colorVariants.length > 0 && (
            <div>
              <div className={styles.label}>O'lcham: {size}</div>
              <div className={styles.options}>
                {colorVariants.map((v) => {
                  const classes = [styles.option]
                  if (v.size === size) classes.push(styles.optionOn)
                  if (v.stock_quantity === 0) classes.push(styles.optionOff)
                  return (
                    <button key={v.id} type="button" className={classes.join(' ')} onClick={() => setPickedSize(v.size)}>
                      {v.size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {variant && (
            <div className={styles.stock}>
              {variant.stock_quantity > 0 ? (
                <span className={styles.inStock}>Omborda bor ({variant.stock_quantity} dona)</span>
              ) : (
                <span className={styles.outOfStock}>Hozircha tugagan</span>
              )}
            </div>
          )}

          {data.description && <p className={styles.description}>{data.description}</p>}

          <dl className={styles.specs}>
            {data.material && (
              <>
                <dt>Material</dt>
                <dd>{data.material}</dd>
              </>
            )}
            {variant && (
              <>
                <dt>Artikul</dt>
                <dd>{variant.sku}</dd>
              </>
            )}
            <dt>Ko'rishlar</dt>
            <dd>{data.views_count}</dd>
          </dl>

          {data.tags.length > 0 && (
            <div className={styles.tags}>
              {data.tags.map((t) => (
                <Link key={t.id} to={`/clothes?tag=${t.slug}`} className={styles.tag}>
                  #{t.name}
                </Link>
              ))}
            </div>
          )}

          {data.patterns.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>Bu kiyim uchun patternlar</h2>
              <div className={styles.relatedList}>
                {data.patterns.map((p) => (
                  <Link key={p.id} to={`/patterns/${p.slug}`} className={styles.relatedLink}>
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}