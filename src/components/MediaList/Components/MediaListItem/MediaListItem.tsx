import styles from './MediaListItem.module.scss'
import { A } from '@solidjs/router'
import useNewContextMenu from '../../../../composables/useNewContextMenu'
import { ContextMenuType } from '../../../../types/types'
import Tooltip from '../../../Tooltip/Tooltip'
import { Utils } from '../../../../util/util'
import { Accessor } from 'solid-js'
import Fa from 'solid-fa'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

type MediaListItemProps = {
  id: string
  type: MusicKit.MediaItemType
  imageUrl: string
  primaryText: string
  secondaryText: string | null
  quaternaryText?: string
  additionalInfo: string[]
  url: string
  secondaryUrl: string
  quaternaryUrl?: string
  primaryClass?: string
  secondaryClass?: string
  quaternaryClass?: string
  quinaryClass?: string
  flex?: Accessor<boolean>
}

export const MediaListItem = ({
  id,
  type,
  imageUrl,
  primaryText,
  secondaryText,
  quaternaryText,
  additionalInfo,
  url,
  secondaryUrl,
  quaternaryUrl,
  primaryClass,
  secondaryClass,
  quaternaryClass,
  quinaryClass,
  flex = () => false
}: MediaListItemProps) => {
  const { openNewContextMenu } = useNewContextMenu()

  const getImageElement = () => (
    <img
      src={imageUrl}
      alt={`${primaryText} cover`}
      aria-label={`${primaryText} cover`}
    />
  )

  const getPrimaryTextElement = () => (
    <A href={url} class={styles['media-list-item-detail-title-text']}>
      <span use:Tooltip={['bottom', primaryText, true, 500]}>{primaryText}</span>
    </A>
  )

  const getSecondaryTextElement = () =>
    secondaryText && (
      <A
        href={secondaryUrl}
        class={`${styles['media-list-item-artist-name-text']} ${
          flex() ? styles['artist-small-text'] : ''
        }`}
        activeClass=""
      >
        <span use:Tooltip={['bottom', secondaryText, true, 500]}>{secondaryText}</span>
      </A>
    )

  const timeColumnStyle = Utils.isTimeFormat(additionalInfo[0])
    ? styles['time-style']
    : styles['date-style']

  return (
    <tr
      class={styles['media-list-item']}
      onContextMenu={e => openNewContextMenu(e, id, ContextMenuType.MediaItem, type)}
    >
      <td class={`${styles['media-list-item-detail']} ${primaryClass}`}>
        {getImageElement()}
        <div
          class={`${styles['media-list-item-detail-title']} ${flex() ? 'flex-col' : ''}`}
        >
          {getPrimaryTextElement()}
          {flex() && getSecondaryTextElement()}
        </div>
      </td>
      {secondaryText && (
        <td
          class={`${styles['media-list-item-info']} secondary-column ${secondaryClass}`}
        >
          <div class={styles['media-list-item-artist-name']}>
            <A
              href={secondaryUrl}
              class={styles['media-list-item-artist-name-text']}
              activeClass=""
            >
              <span use:Tooltip={['bottom', secondaryText, true, 500]}>
                {secondaryText}
              </span>
            </A>
          </div>
        </td>
      )}
      {quaternaryText && (
        <td
          class={`${styles['media-list-item-info']} quaternary-column ${quaternaryClass}`}
        >
          <div class={styles['media-list-item-title']}>
            <A
              href={quaternaryUrl}
              class={styles['media-list-item-title-text']}
              activeClass=""
            >
              <span use:Tooltip={['bottom', quaternaryText, true, 500]}>
                {quaternaryText}
              </span>
            </A>
          </div>
        </td>
      )}
      {additionalInfo.map(info => (
        <td
          class={`${styles['media-list-item-info']} ${timeColumnStyle} ${quinaryClass}`}
        >
          <div class={styles['media-list-item-title']}>{info}</div>
          <div
            class={`${styles['media-list-item-more']} ${
              flex() ? styles['position-override'] : ''
            }`}
            onClick={e => openNewContextMenu(e, id, ContextMenuType.MediaItem, type)}
          >
            <Fa
              icon={faEllipsisH}
              class={styles['media-list-item-more-icon']}
              color="var(--color-primary)"
            />
          </div>
        </td>
      ))}
    </tr>
  )
}
