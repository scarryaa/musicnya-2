import { useNavigate } from '@solidjs/router'
import styles from './Searchbar.module.scss'

export const Searchbar = () => {
  const navigate = useNavigate()

  return (
    <input
      class={styles.searchbar}
      onFocus={() => {
        navigate('/search')
      }}
    >
      searchbar
    </input>
  )
}
