import styles from './DesignTag.module.scss'

export const DesignTag = ({ designTag }: { designTag: string }) => {
  return <div class={styles['design-tag']}>{designTag}</div>
}
