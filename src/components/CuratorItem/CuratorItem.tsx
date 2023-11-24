import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import styles from './CuratorItem.module.scss'
import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'

export const CuratorItem = ({ item }) => {
  const { openContextMenu } = useContextMenu()

  //TODO add page for this
  return (
    <A
      activeClass=""
      class={styles.curatorItem}
      href="#"
      onContextMenu={e => openContextMenu(e, item.id, null, ContextMenuType.Curator)}
    >
      <div class={styles.curatorItem__image}>
        <div class={styles.curatorItem__image__overlay}>
          <div
            class={styles.curatorItem__image__overlay__moreButton}
            onClick={e => openContextMenu(e, item.id, null, item.type)}
          >
            <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
          </div>
        </div>
        <img
          src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 300, 'webp')}
        />
      </div>
      <div class={styles.curatorItem__info}>
        <div class={styles.curatorItem__info__name}>{item.attributes.name}</div>
        <div class={styles.curatorItem__info__curator}>
          {item.attributes.showHostName}
        </div>
      </div>
    </A>
  )
}
