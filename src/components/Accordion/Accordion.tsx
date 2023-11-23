import styles from './Accordion.module.scss'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = createSignal(false)

  const contentClass = () =>
    `${styles.accordion__content} ${isOpen() ? styles['accordion__content--open'] : ''}`
  const [contentStyle, setContentStyle] = createSignal({})

  createEffect(() => {
    if (isOpen()) {
      setContentStyle({ visibility: 'visible' })
    } else {
      const timeoutId = setTimeout(() => {
        setContentStyle({ visibility: 'hidden' })
      }, 300)

      onCleanup(() => clearTimeout(timeoutId))
    }
  })

  return (
    <div class={styles.accordion}>
      <button
        class={styles.accordion__title}
        onClick={() => setIsOpen(!isOpen())}
        aria-expanded={isOpen()}
      >
        <div class={styles.accordion__title__text}>{title}</div>
        <div class={styles.accordion__title__icon}>
          <Fa
            icon={isOpen() ? faChevronUp : faChevronDown}
            size="1x"
            color="var(--app-text-color)"
          />
        </div>
      </button>
      <div style={contentStyle()} class={contentClass()}>
        {children}
      </div>
    </div>
  )
}
