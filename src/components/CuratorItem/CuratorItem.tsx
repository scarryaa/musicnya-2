import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import styles from './CuratorItem.module.scss'
import Fa from 'solid-fa'
import { Utils } from '../../util/util'
import { A } from '@solidjs/router'
import { contextMenu, handleContextMenu, handleMoreClick } from './CuratorItemContextMenu'
import { createSignal } from 'solid-js'

export const CuratorItem = ({ item }) => {
  const [contextMenuItems, setContextMenuItems] = createSignal(
    contextMenu(item.id, item.type)
  )

  console.log(item)
  return (
    <A
      class={styles.curatorItem}
      href="#"
      onContextMenu={e => handleContextMenu(e, item.id, item.type, contextMenuItems)}
    >
      <div class={styles.curatorItem__image}>
        <div class={styles.curatorItem__image__overlay}>
          <div
            class={styles.curatorItem__image__overlay__moreButton}
            onClick={e => handleMoreClick(e, item.id, item.type, contextMenuItems)}
          >
            <Fa icon={faEllipsisH} size="1x" color="white" />
          </div>
        </div>
        <img src={Utils.formatArtworkUrl(item.attributes.artwork.url, 300, 'webp')} />
      </div>
      <div class={styles.curatorItem__info}>
        <div class={styles.curatorItem__name}>{item.name}</div>
      </div>
    </A>
  )
}
