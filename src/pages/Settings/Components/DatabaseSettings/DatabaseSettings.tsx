import { Show } from 'solid-js'
import { Accordion } from '../../../../components/Accordion/Accordion'
import { store } from '../../../../stores/store'
import { SettingItem } from '../SettingItem/SettingItem'
import styles from './DatabaseSettings.module.scss'

export const DatabaseSettings = () => {
  const handleResetDatabaseClick = () => {
    store.library.reset()
    Promise.all([
      store.library.refreshPlaylists(),
      store.library.refreshAlbums(),
      store.library.refreshArtists()
    ])
  }

  return (
    <Accordion title="Database">
      <SettingItem title="Reset Database">
        <button class={styles.button} onClick={handleResetDatabaseClick}>
          Reset Database
        </button>
      </SettingItem>
    </Accordion>
  )
}
