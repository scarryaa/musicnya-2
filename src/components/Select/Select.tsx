import { createSignal, Show, createEffect, onMount } from 'solid-js'
import styles from './Select.module.scss'
import Fa from 'solid-fa'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const Select = props => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [focusedIndex, setFocusedIndex] = createSignal(0)
  let optionsRef = []

  const selectOption = option => {
    props.onSelectedChange(option)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen())
    setFocusedIndex(props.options.indexOf(props.selected())) // Reset focused index
  }

  const handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(i => (i < props.options.length - 1 ? i + 1 : i))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(i => (i > 0 ? i - 1 : i))
        break
      case 'Enter':
        e.preventDefault()
        selectOption(props.options[focusedIndex()])
        break
      case 'Escape':
        setIsOpen(false)
        break
      default:
        break
    }
  }

  createEffect(() => {
    if (isOpen() && optionsRef[focusedIndex()]) {
      optionsRef[focusedIndex()].focus()
    }
  })

  return (
    <div class={styles.select} tabIndex="0" onKeyDown={handleKeyDown}>
      <div class={styles.select__selected} onClick={toggleDropdown}>
        <span>{props.selected()}</span>
        <span class={styles.select__selected__arrow}>
          <Fa icon={isOpen() ? faChevronUp : faChevronDown} />
        </span>
      </div>
      <Show when={isOpen()}>
        <div class={styles.select__options}>
          {props.options.map((option, index) => (
            <div
              ref={el => (optionsRef[index] = el)}
              class={
                `${styles.select__options__option} ${
                  index === focusedIndex() ? styles.focused : ''
                }` +
                ' ' +
                (option === props.selected() ? styles.selected : '')
              }
              onClick={() => selectOption(option)}
              tabIndex="-1"
            >
              {option}
            </div>
          ))}
        </div>
      </Show>
    </div>
  )
}
