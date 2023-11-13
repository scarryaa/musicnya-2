import styles from './Accordion.module.scss'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'
import { createSignal } from 'solid-js'

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = createSignal(false)

  const contentClass = () =>
    `${styles.accordion__content} ${isOpen() ? 'accordion__content--open' : ''}`

  return (
    <div class={styles.accordion}>
      <div class={styles.accordion__title} onClick={() => setIsOpen(!isOpen())}>
        <div class={styles.accordion__title__text}>{title}</div>
        <div class={styles.accordion__title__icon}>
          <Fa
            icon={isOpen() ? faChevronUp : faChevronDown}
            size="1x"
            color="var(--app-text-color)"
          />
        </div>
      </div>
      <div class={contentClass()}>{children}</div>
    </div>
  )
}
