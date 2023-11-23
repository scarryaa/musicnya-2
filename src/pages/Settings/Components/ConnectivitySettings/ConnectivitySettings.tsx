import { Accordion } from '../../../../components/Accordion/Accordion'
import { discordService } from '../../../../services/discordService'
import { setStore, store } from '../../../../stores/store'
import { SettingItem } from '../SettingItem/SettingItem'

export const ConnectivitySettings = () => {
  const handleDiscordIntegrationClick = () => {
    setStore(
      'app',
      'connectivity',
      'discord',
      'enabled',
      !store.app.connectivity.discord.enabled
    )
    localStorage.setItem(
      'discordIntegration',
      store.app.connectivity.discord.enabled.toString()
    )

    if (!store.app.connectivity.discord.enabled) {
      discordService.clearActivity()
    } else {
      discordService.setActivity(store.app.connectivity.discord.activity)
    }
  }

  return (
    <Accordion title="Connectivity">
      <SettingItem
        title="Discord Integration"
        subtitle="Choose whether to show the current song on Discord."
      >
        <input
          type="checkbox"
          checked={store.app.connectivity.discord.enabled}
          onClick={handleDiscordIntegrationClick}
        />
      </SettingItem>
    </Accordion>
  )
}
