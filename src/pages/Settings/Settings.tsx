import { createSignal } from 'solid-js'
import { Accordion } from '../../components/Accordion/Accordion'
import { Select } from '../../components/Select/Select'
import { setStore, store } from '../../stores/store'
import styles from './Settings.module.scss'

export const Settings = () => {
  const defaultPageOptions = ['Home', 'Listen Now', 'Browse', 'Radio', 'Search']
  const [selectedOption, setSelectedOption] = createSignal(store.app.general.defaultPage)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setStore('app', 'general', 'defaultPage', option)
    localStorage.setItem('defaultPage', option)
  }

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

  const handleHideLinkTilesClick = () => {
    setStore('app', 'media', 'hideLinkTiles', !store.app.media.hideLinkTiles)
    localStorage.setItem('hideLinkTiles', store.app.media.hideLinkTiles.toString())
  }

  const handleEditorialNotesExpandClick = () => {
    setStore(
      'app',
      'media',
      'expandEditorialNotes',
      !store.app.media.expandEditorialNotes
    )
    localStorage.setItem(
      'expandEditorialNotes',
      store.app.media.expandEditorialNotes.toString()
    )
  }

  return (
    <div class={styles.settings}>
      <h1 class={styles.settings__title}>Settings</h1>
      <Accordion title="General">
        <div class={styles.settings__setting}>
          <h3>Default page</h3>
          <Select
            options={defaultPageOptions}
            selected={selectedOption}
            onSelectedChange={handleSelect}
          />
        </div>
        <div class={styles.settings__setting}>
          <h3>Hide link tiles</h3>
          <input
            type="checkbox"
            checked={store.app.media.hideLinkTiles}
            onClick={handleHideLinkTilesClick}
          />
        </div>
      </Accordion>
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
        <div class={styles.settings__setting}>
          <h3>Always expand editorial notes</h3>
          <input
            type="checkbox"
            checked={store.app.media.expandEditorialNotes}
            onClick={handleEditorialNotesExpandClick}
          />
        </div>
      </Accordion>
    </div>
  )
}
