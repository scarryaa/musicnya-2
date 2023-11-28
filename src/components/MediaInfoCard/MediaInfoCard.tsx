import { A } from '@solidjs/router'
import styles from './MediaInfoCard.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import { store } from '../../stores/store'
import { Accessor } from 'solid-js'
import { Utils } from '../../util/util'

export const MediaInfoCard = ({
  title,
  subtitle,
  titleLink = '#',
  subtitleLink = '#'
}: {
  title: string
  subtitle: string
  titleLink?: string
  subtitleLink?: string | Accessor<string>
}) => {
  Tooltip

  return (
    <div class={styles['media-info-card']}>
      {titleLink ? (
        <A activeClass="" class={styles['media-info-card-title']} href={titleLink}>
          <span
            class={styles['media-info-card-title-link']}
            use:Tooltip={['bottom', title, true, store.app.general.tooltipDelay]}
          >
            {title}
          </span>
        </A>
      ) : (
        <div class={styles['media-info-card-title']}>{title}</div>
      )}
      {subtitleLink !== '' ? (
        <A
          activeClass=""
          class={styles['media-info-card-subtitle']}
          href={Utils.isAccessor(subtitleLink) ? subtitleLink() : subtitleLink}
        >
          <span
            class={styles['media-info-card-subtitle-link']}
            use:Tooltip={['bottom', subtitle, true, store.app.general.tooltipDelay]}
          >
            {subtitle}
          </span>
        </A>
      ) : (
        <div
          class={styles['media-info-card-subtitle']}
          use:Tooltip={['bottom', subtitle, true, store.app.general.tooltipDelay]}
        >
          {subtitle}
        </div>
      )}
    </div>
  )
}
