import { For, createEffect, createSignal } from 'solid-js'
import styles from './Queue.module.scss'
import { setStore, store } from '../../stores/store'
import { QueueItem } from '../QueueItem/QueueItem'
import Fa from 'solid-fa'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { Utils } from '../../util/util'
import Tooltip from '../Tooltip/Tooltip'
import { mkManager } from '../../api/MkManager'

export const Queue = () => {
  const [queueItems, setQueueItems] = createSignal(store.app.queue.items)
  const [dropTarget, setDropTarget] = createSignal(null)
  let draggedItem = null
  const isDropTargetTop = index =>
    dropTarget() && dropTarget().index === index && dropTarget().position === 'top'
  const isDropTargetBottom = index =>
    dropTarget() && dropTarget().index === index && dropTarget().position === 'bottom'

  createEffect(() => {
    setQueueItems(store.app.queue.items)
  }, [store.app.queue.items])

  const createDragImage = src => {
    const img = new Image()
    img.src = src
    img.style.width = '40px'
    img.style.height = '40px'
    img.style.borderRadius = '$app-border-radius'
    img.style.position = 'absolute'
    img.style.top = '-1000px'
    img.classList.add('ghostImg')
    document.body.appendChild(img)
    return img
  }

  const handleDragEnd = e => {
    const ghostImg = document.querySelector('.ghostImg')
    if (ghostImg) {
      ghostImg.remove()
    }
  }

  const handleDragStart = (e, index) => {
    draggedItem = index
    const img = e.target.getAttribute('data-img')

    const dragImage = createDragImage(img)
    e.dataTransfer.setDragImage(dragImage, 0, 0)

    e.dataTransfer.effectAllowed = 'copyMove'
    e.dataTransfer.dropEffect = 'copyMove'
  }

  const handleDragOver = (event, index: number) => {
    event.preventDefault()

    const targetRect = event.currentTarget.getBoundingClientRect()
    const relativeY = event.clientY - targetRect.top
    const dropPosition = relativeY < targetRect.height / 2 ? 'top' : 'bottom'

    setDropTarget({ index, position: dropPosition })
  }

  const handleDragLeave = () => {
    setDropTarget(null)
  }

  const handleDrop = async (e, index) => {
    e.preventDefault()
    e.stopPropagation()

    if (draggedItem === index) {
      setDropTarget(null)
      return
    }

    const newQueue = await mkManager.moveQueueItem(draggedItem, index)
    setStore('app', 'queue', {
      items: newQueue
    })
    setDropTarget(null)
  }

  const handleClearClick = () => {
    mkManager.clearQueue()
  }

  const handleAutoplayClick = () => {
    mkManager.toggleAutoplay(!store.app.queue.autoplay)
    localStorage.setItem('autoplay', JSON.stringify(!store.app.queue.autoplay))
  }

  return (
    <div
      class={styles.queue}
      style={{
        height: store.app.miniPlayer.open
          ? '370px'
          : 'calc(100vh - $app-footer-height - 3.3rem)',
        position: store.app.miniPlayer.open ? 'absolute' : 'relative',
        bottom: store.app.miniPlayer.open ? '0' : 'unset'
      }}
    >
      <div class={styles.queue__header}>
        <button class={styles.queue__header__clear} onClick={handleClearClick}>
          Clear
        </button>
        <button
          class={styles.queue__header__autoplayButton}
          onClick={handleAutoplayClick}
          use:Tooltip={['bottom', 'Toggle Autoplay']}
        >
          <Fa
            icon={faInfinity}
            color={
              store.app.queue.autoplay
                ? 'var(--queue-autoplay-enabled-color)'
                : 'var(--queue-item-text-color)'
            }
          />
        </button>
      </div>

      {queueItems().length > 0 && (
        <div class={styles.queue__content}>
          {queueItems().length > store.app.queue.remainingStartIndex && (
            <div>
              <h4 class={styles.queue__queue}>Queue</h4>
              <For each={queueItems().slice(store.app.queue.remainingStartIndex)}>
                {(item, index) => (
                  <div
                    classList={{
                      [styles.dropTargetTop]: isDropTargetTop(
                        index() + store.app.queue.remainingStartIndex
                      ),
                      [styles.dropTargetBottom]: isDropTargetBottom(
                        index() + store.app.queue.remainingStartIndex
                      ),
                      [styles.queue__item]: true
                    }}
                    draggable={true}
                    onDragStart={e =>
                      handleDragStart(e, index() + store.app.queue.remainingStartIndex)
                    }
                    onDragOver={e =>
                      handleDragOver(e, index() + store.app.queue.remainingStartIndex)
                    }
                    onDragLeave={handleDragLeave}
                    onDrop={e =>
                      handleDrop(e, index() + store.app.queue.remainingStartIndex)
                    }
                    onDragEnd={handleDragEnd}
                    data-img={Utils.formatArtworkUrl(
                      item.attributes.artwork.url,
                      40,
                      40,
                      'webp',
                      'sr'
                    )}
                  >
                    <QueueItem
                      item={item}
                      index={index() + store.app.queue.remainingStartIndex}
                    />
                  </div>
                )}
              </For>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
