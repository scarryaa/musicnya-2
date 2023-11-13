import { Accordion } from '../../components/Accordion/Accordion'
import { setStore, store } from '../../stores/store'
import styles from './Settings.module.scss'

export const Settings = () => {
  const handleDarkModeClick = () => {
    setStore('app', 'isDarkMode', !store.app.isDarkMode)

    if (store.app.isDarkMode) {
      document.documentElement.setAttribute('theme', 'dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.setAttribute('theme', 'light')
      localStorage.setItem('darkMode', 'false')
    }
  }

  const handleEditorialNotesClick = () => {
    setStore('app', 'media', 'hideEditorialNotes', !store.app.media.hideEditorialNotes)
    localStorage.setItem(
      'hideEditorialNotes',
      store.app.media.hideEditorialNotes.toString()
    )
  }

  return (
    <div class={styles.settings}>
      <h1 class={styles.settings__title}>Settings</h1>
      <Accordion title="Visual">
        <div class={styles.settings__setting}>
          <h3>Enable dark mode</h3>
          <input
            type="checkbox"
            checked={store.app.isDarkMode}
            onClick={handleDarkModeClick}
          />
        </div>
      </Accordion>
      <Accordion title="Media Page">
        <div class={styles.settings__setting}>
          <h3>Always hide editorial notes</h3>
          <input
            type="checkbox"
            checked={store.app.media.hideEditorialNotes}
            onClick={handleEditorialNotesClick}
          />
        </div>
      </Accordion>
    </div>
  )
}
