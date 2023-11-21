import Fa from 'solid-fa'
import styles from './Search.module.scss'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const Search = ({ onInput }) => {
  return (
    <div class={styles.search}>
      <div class={styles.search__icon}>
        <Fa icon={faSearch} size="sm" color="var(--app-text-color)" />
      </div>
      <input
        class={styles.search__input}
        type="text"
        placeholder="Search"
        onInput={onInput}
      />
    </div>
  )
}
