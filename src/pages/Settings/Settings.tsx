import { setStore, store } from '../../stores/store'
import styles from './Settings.module.scss'

export const Settings = () => {
  const handleClick = () => {
    setStore('app', 'isDarkMode', !store.app.isDarkMode)

    if (store.app.isDarkMode) {
      document.documentElement.setAttribute('theme', 'dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.setAttribute('theme', 'light')
      localStorage.setItem('darkMode', 'false')
    }
  }

  return (
    <div class={styles.settings}>
      <div>dark mode</div>
      <input type="checkbox" checked={store.app.isDarkMode} onClick={handleClick} />
    </div>
  )
}
