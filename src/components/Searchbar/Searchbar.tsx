import { useNavigate } from '@solidjs/router'
import styles from './Searchbar.module.scss'
import { store } from '../../stores/store'

export const Searchbar = () => {
  const navigate = useNavigate()

  return (
    <input
      class={styles.searchbar}
      onFocus={() => {
        if (store.app.general.searchPageOnFocus === true) navigate('/search')
      }}
    >
      searchbar
    </input>
  )
}
