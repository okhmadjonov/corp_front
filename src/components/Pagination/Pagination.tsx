import { Button } from '@/components/Button/Button'
import styles from './Pagination.module.scss'

interface Props {
  page: number // 0 dan boshlanadi
  hasNext: boolean
  onChange: (page: number) => void
}

export function Pagination({ page, hasNext, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <Button size="sm" variant="secondary" disabled={page === 0} onClick={() => onChange(page - 1)}>
        ← Oldingi
      </Button>
      <span className={styles.page}>{page + 1}-sahifa</span>
      <Button size="sm" variant="secondary" disabled={!hasNext} onClick={() => onChange(page + 1)}>
        Keyingi →
      </Button>
    </div>
  )
}