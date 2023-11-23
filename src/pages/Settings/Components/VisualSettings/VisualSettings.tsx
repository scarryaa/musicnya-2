import { Accordion } from '../../../../components/Accordion/Accordion'
import { setStore, store } from '../../../../stores/store'
import { SettingItem } from '../SettingItem/SettingItem'

export const VisualSettings = () => {
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

  return (
    <Accordion title="Visual">
      <SettingItem title="Enable dark mode">
        <input
          type="checkbox"
          checked={store.app.isDarkMode}
          onClick={handleDarkModeClick}
        />
      </SettingItem>
    </Accordion>
  )
}
