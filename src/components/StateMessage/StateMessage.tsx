import { Button } from '@/components/Button/Button'
import styles from './StateMessage.module.scss'

interface Props {
  title: string
  text?: string
  actionLabel?: string
  onAction?: () => void
}

export function StateMessage({ title, text, actionLabel, onAction }: Props) {
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>{title}</h3>
      {text && <p className={styles.text}>{text}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}