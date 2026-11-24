import { useState } from 'react'
import styles from './SmartImage.module.scss'

interface Props {
  src?: string | null
  alt: string
  /** CSS aspect-ratio, masalan "3 / 4" yoki "1 / 1" */
  ratio?: string
  contain?: boolean
  priority?: boolean
}

function Inner({ src, alt, ratio = '3 / 4', contain, priority }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const show = Boolean(src) && !failed

  return (
    <div className={styles.box} style={{ aspectRatio: ratio }}>
      {show ? (
        <>
          {!loaded && <div className={styles.shimmer} />}
          <img
            className={`${styles.img} ${contain ? styles.contain : ''} ${loaded ? styles.loaded : ''}`}
            src={src as string}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <div className={styles.fallback} aria-label="Rasm yo'q">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="M3 17l5-5 4 4 3-3 6 6" />
          </svg>
        </div>
      )}
    </div>
  )
}

// src o'zgarganda (galereyada) holat nolga qaytishi uchun key
export function SmartImage(props: Props) {
  return <Inner key={props.src ?? 'none'} {...props} />
}