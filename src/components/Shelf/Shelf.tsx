import { JSX, createEffect, createSignal, onMount } from 'solid-js'
import styles from './Shelf.module.scss'
import Fa from 'solid-fa'
import {
  faChevronLeft,
  faChevronRight,
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
    // scroll the shelf by the window width
    mediaShelf.scrollBy({
      left: -window.innerWidth + 176,
      behavior: 'smooth'
    })
  }

  const handleRightClick = () => {
    // scroll the shelf by the window width
    mediaShelf.scrollBy({
      left: window.innerWidth - 176,
      behavior: 'smooth'
    })

    // hide the right arrow if we're at the end
    if (mediaShelf.scrollLeft + mediaShelf.clientWidth === mediaShelf.scrollWidth) {
      document
        .querySelector(`.${styles.shelf__arrows__right}`)
        ?.classList.add(styles.hidden)
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
          <Fa icon={faCircleChevronLeft} size="lg" color="var(--app-text-color)" />
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
          <Fa icon={faCircleChevronRight} size="lg" color="var(--app-text-color)" />
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
