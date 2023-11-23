import { GeneralSettings } from './Components/GeneralSettings/GeneralSettings'
import { VisualSettings } from './Components/VisualSettings/VisualSettings'
import { MediaSettings } from './Components/MediaSettings/MediaSettings'
import { ConnectivitySettings } from './Components/ConnectivitySettings/ConnectivitySettings'
import styles from './Settings.module.scss'
import { DatabaseSettings } from './Components/DatabaseSettings/DatabaseSettings'

export const Settings = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div class={styles.settings}>
      <h1 class={styles.settings__title}>Settings</h1>
      <GeneralSettings />
      <VisualSettings />
      <ConnectivitySettings />
      <MediaSettings />
      <DatabaseSettings />
      <button class={styles.settings__button} onClick={handleReload}>
        Reload App
      </button>
    </div>
  )
}
