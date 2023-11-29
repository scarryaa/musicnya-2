import styles from './DesignBadge.module.scss'

export const DesignBadge = ({ designBadge }: { designBadge: string }) => {
  return <div class={styles['design-badge']}>{designBadge}</div>
}
