import { DesignBadge } from './DesignBadge'
import { DesignTag } from './DesignTag'
import styles from './EditorialInfoCard.module.scss'

export const EditorialInfoCard = ({
  title,
  subtitle,
  designTag,
  designBadge
}: {
  title: string
  subtitle: string
  designTag?: string
  designBadge?: string
}) => {
  return (
    <>
      <DesignBadge designBadge={designBadge} />
      {designTag ? (
        <DesignTag designTag={designTag} />
      ) : (
        <>
          <div class={styles['editorial-info-card-title']}>{title}</div>
          <div class={styles['editorial-info-card-subtitle']}>{subtitle}</div>
        </>
      )}
    </>
  )
}
