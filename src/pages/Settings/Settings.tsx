import { Show, createSignal } from 'solid-js'
import { Accordion } from '../../components/Accordion/Accordion'
import { Select } from '../../components/Select/Select'
import { setStore, store } from '../../stores/store'
import styles from './Settings.module.scss'

export const Settings = () => {
  const defaultPageOptions = ['Home', 'Listen Now', 'Browse', 'Radio', 'Search']
  const tooltipDelayOptions = ['0', '250', '500', '750', '1000']
  const [selectedOption, setSelectedOption] = createSignal(store.app.general.defaultPage)
  const [selectedTooltipDelayOption, setSelectedTooltipDelayOption] = createSignal(
    store.app.general.tooltipDelay.toString()
  )

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setStore('app', 'general', 'defaultPage', option)
    localStorage.setItem('defaultPage', option)
  }

  const handleTooltipDelaySelect = (option: string) => {
    setSelectedTooltipDelayOption(option)
    setStore('app', 'general', 'tooltipDelay', parseInt(option))
    localStorage.setItem('tooltipDelay', option)
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

  const handleDisableAnimatedArtworkClick = () => {
    setStore(
      'app',
      'media',
      'disableAnimatedArtwork',
      !store.app.media.disableAnimatedArtwork
    )
    localStorage.setItem(
      'disableAnimatedArtwork',
      store.app.media.disableAnimatedArtwork.toString()
    )
  }

  const handleSearchPageOnFocusClick = () => {
    setStore('app', 'general', 'searchPageOnFocus', !store.app.general.searchPageOnFocus)
    localStorage.setItem(
      'searchPageOnFocus',
      store.app.general.searchPageOnFocus.toString()
    )
  }

  const handleResetDatabaseClick = () => {
    store.library.reset()
    Promise.all([
      store.library.refreshPlaylists(),
      store.library.refreshAlbums(),
      store.library.refreshArtists()
    ])
  }

  return (
    <div class={styles.settings}>
      <h1 class={styles.settings__title}>Settings</h1>
      <Accordion title="General">
        <div class={styles.settings__setting}>
          <span>Default page</span>
          <Select
            options={defaultPageOptions}
            selected={selectedOption}
            onSelectedChange={handleSelect}
          />
        </div>
        <div class={styles.settings__setting}>
          <span>Hide link tiles</span>
          <input
            type="checkbox"
            checked={store.app.media.hideLinkTiles}
            onClick={handleHideLinkTilesClick}
          />
        </div>
        <div class={styles.settings__setting}>
          <span>Tooltip show delay (where applicable)</span>
          <Select
            options={tooltipDelayOptions}
            selected={selectedTooltipDelayOption}
            onSelectedChange={handleTooltipDelaySelect}
          />
        </div>
        <div class={styles.settings__setting}>
          <span>Go to search page when search is focused</span>
          <input
            type="checkbox"
            checked={store.app.general.searchPageOnFocus}
            onClick={handleSearchPageOnFocusClick}
          />
        </div>
      </Accordion>
      <Accordion title="Visual">
        <div class={styles.settings__setting}>
          <span>Enable dark mode</span>
          <input
            type="checkbox"
            checked={store.app.isDarkMode}
            onClick={handleDarkModeClick}
          />
        </div>
      </Accordion>
      <Accordion title="Media Page">
        <div class={styles.settings__setting}>
          <span>Always hide editorial notes</span>
          <input
            type="checkbox"
            checked={store.app.media.hideEditorialNotes}
            onClick={handleEditorialNotesClick}
          />
        </div>
        <div class={styles.settings__setting}>
          <span>Always expand editorial notes</span>
          <input
            type="checkbox"
            checked={store.app.media.expandEditorialNotes}
            onClick={handleEditorialNotesExpandClick}
          />
        </div>
        <div class={styles.settings__setting}>
          <span>Disable animated artwork</span>
          <input
            type="checkbox"
            checked={store.app.media.disableAnimatedArtwork}
            onClick={handleDisableAnimatedArtworkClick}
          />
        </div>
      </Accordion>
      <Accordion title="Database">
        <div class={styles.settings__setting}>
          <span>Reset database</span>
          <Show when={store.library.loading}>
            <span>...</span>
          </Show>
          <Show when={!store.library.loading}>
            <button class={styles.settings__button} onClick={handleResetDatabaseClick}>
              Reset Database
            </button>
          </Show>
        </div>
      </Accordion>
      {/* TODO implement */}
      <button class={styles.settings__button} onClick={() => window.location.reload()}>
        Reload App
      </button>
    </div>
  )
}
