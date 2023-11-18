import { For, createEffect, createSignal } from 'solid-js'
import styles from './Queue.module.scss'
import { store } from '../../stores/store'
import { QueueItem } from '../QueueItem/QueueItem'
import Fa from 'solid-fa'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { Utils } from '../../util/util'

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
    img.style.borderRadius = 'var(--app-border-radius)'
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

  const handleDrop = (e, index) => {
    e.preventDefault()
    e.stopPropagation()

    if (draggedItem === index) {
      setDropTarget(null)
      return
    }

    mkController.moveQueueItem(draggedItem, index)
    setDropTarget(null)
  }

  return (
    <div class={styles.queue}>
      <div class={styles.queue__header}>
        <button class={styles.queue__header__clear}>Clear</button>
        <button class={styles.queue__header__autoplayButton}>
          <Fa icon={faInfinity} />
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
                      'webp',
                      'sr'
                    )}
                  >
                    <QueueItem item={item} />
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
