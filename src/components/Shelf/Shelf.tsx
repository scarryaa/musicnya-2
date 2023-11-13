import { JSX, createEffect, createSignal, onMount } from 'solid-js'
import styles from './Shelf.module.scss'
import Fa from 'solid-fa'
import {
  faCircleChevronLeft,
  faCircleChevronRight
} from '@fortawesome/free-solid-svg-icons'

interface ShelfProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[]
  header: string
}

export const Shelf = (props: ShelfProps) => {
  const className = [styles.shelf, props.class].filter(Boolean).join(' ')
  let mediaShelf

  const [showLeftArrow, setShowLeftArrow] = createSignal(false)
  const [showRightArrow, setShowRightArrow] = createSignal(true)

  onMount(() => {
    const updateArrows = () => {
      setShowLeftArrow(mediaShelf.scrollLeft > 0)
      setShowRightArrow(
        mediaShelf.scrollLeft + mediaShelf.clientWidth < mediaShelf.scrollWidth
      )
    }

    // Initial call and event listener setup
    updateArrows()
    mediaShelf.addEventListener('scroll', updateArrows)
    window.addEventListener('resize', () => {
      if (mediaShelf.scrollWidth <= mediaShelf.clientWidth) {
        hideArrows()
      } else {
        showArrows()
      }
    })
    updateArrows()
  })

  const hideArrows = () => {
    setShowLeftArrow(false)
    setShowRightArrow(false)
  }

  const showArrows = () => {
    setShowLeftArrow(mediaShelf.scrollLeft > 0)
    setShowRightArrow(
      mediaShelf.scrollLeft + mediaShelf.clientWidth < mediaShelf.scrollWidth
    )
  }

  const handleLeftClick = () => {
    for (let i = mediaShelf.children.length - 1; i >= 0; i--) {
      const child = mediaShelf.children[i]
      const rect = child.getBoundingClientRect()
      const shelfRect = mediaShelf.getBoundingClientRect()

      if (rect.left < shelfRect.left) {
        const scrollDistance = rect.right - shelfRect.right

        mediaShelf.scrollBy({
          left: scrollDistance,
          behavior: 'smooth'
        })
        break
      }
    }
  }

  const handleRightClick = () => {
    for (let i = 0; i < mediaShelf.children.length; i++) {
      const child = mediaShelf.children[i]
      const rect = child.getBoundingClientRect()
      const shelfRect = mediaShelf.getBoundingClientRect()

      if (rect.right > shelfRect.right) {
        const scrollDistance = rect.left - shelfRect.left

        mediaShelf.scrollBy({
          left: scrollDistance,
          behavior: 'smooth'
        })
        break
      }
    }
  }

  return (
    <div {...props} class={className}>
      <span class={styles.shelf__header}>{props.header}</span>
      <span class={styles.shelf__arrows}>
        <div
          class={
            styles.shelf__arrows__left +
            ' ' +
            'shelf__arrows__left' +
            ' ' +
            (showLeftArrow() ? '' : 'hidden')
          }
          onClick={handleLeftClick}
        >
          <Fa icon={faCircleChevronLeft} size="lg" color="var(--color-white)" />
        </div>
        <div
          class={
            styles.shelf__arrows__right +
            ' ' +
            'shelf__arrows__right' +
            ' ' +
            (showRightArrow() ? '' : 'hidden')
          }
          onClick={handleRightClick}
        >
          <Fa icon={faCircleChevronRight} size="lg" color="var(--color-white)" />
        </div>
        <div class={styles.shelf__arrow}></div>
      </span>
      <div>
        <div>
          <div class={styles.shelf__inner} ref={mediaShelf}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
