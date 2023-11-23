import { createSignal } from 'solid-js'
import { setStore, store } from '../../../../stores/store'
import { Accordion } from '../../../../components/Accordion/Accordion'
import { Select } from '../../../../components/Select/Select'
import { SettingItem } from '../SettingItem/SettingItem'

export const GeneralSettings = () => {
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

  const handleHideLinkTilesClick = () => {
    setStore('app', 'media', 'hideLinkTiles', !store.app.media.hideLinkTiles)
    localStorage.setItem('hideLinkTiles', store.app.media.hideLinkTiles.toString())
  }

  const handleSearchPageOnFocusClick = () => {
    // @ts-ignore
    setStore('app', 'general', 'searchPageOnFocus', !store.app.general.searchPageOnFocus)
    localStorage.setItem(
      'searchPageOnFocus',
      store.app.general.searchPageOnFocus.toString()
    )
  }

  return (
    <Accordion title="General">
      <SettingItem
        title="Default Page"
        subtitle="Choose the page that shows when you start Musicnya."
      >
        <Select
          options={defaultPageOptions}
          selected={selectedOption}
          onSelectedChange={handleSelect}
        />
      </SettingItem>
      <SettingItem
        title="Tooltip Delay"
        subtitle="Configure the tooltip delay (where applicable)."
      >
        <Select
          options={tooltipDelayOptions}
          selected={selectedTooltipDelayOption}
          onSelectedChange={handleTooltipDelaySelect}
        />
      </SettingItem>
      <SettingItem
        title="Hide Link Tiles"
        subtitle="Hide the link tiles found on the browse and radio pages."
      >
        <input
          type="checkbox"
          checked={store.app.media.hideLinkTiles}
          onClick={handleHideLinkTilesClick}
        />
      </SettingItem>
      <SettingItem
        title="Search Focus"
        subtitle="Choose whether to navigate to the search page when search is focused."
      >
        <input
          type="checkbox"
          checked={store.app.general.searchPageOnFocus}
          onClick={handleSearchPageOnFocusClick}
        />
      </SettingItem>
    </Accordion>
  )
}
