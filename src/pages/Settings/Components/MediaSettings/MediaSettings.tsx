import { Accordion } from '../../../../components/Accordion/Accordion'
import { setStore, store } from '../../../../stores/store'
import { SettingItem } from '../SettingItem/SettingItem'

export const MediaSettings = () => {
  const handleEditorialNotesClick = () => {
    setStore('app', 'media', 'hideEditorialNotes', !store.app.media.hideEditorialNotes)
    localStorage.setItem(
      'hideEditorialNotes',
      store.app.media.hideEditorialNotes.toString()
    )
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

  return (
    <Accordion title="Media Page">
      <SettingItem title="Always Hide Editorial Notes">
        <input
          type="checkbox"
          checked={store.app.media.hideEditorialNotes}
          onClick={handleEditorialNotesClick}
        />
      </SettingItem>
      <SettingItem title="Always Expand Editorial Notes">
        <input
          type="checkbox"
          checked={store.app.media.expandEditorialNotes}
          onClick={handleEditorialNotesExpandClick}
        />
      </SettingItem>
      <SettingItem title="Disable Animated Artwork">
        <input
          type="checkbox"
          checked={store.app.media.disableAnimatedArtwork}
          onClick={handleDisableAnimatedArtworkClick}
        />
      </SettingItem>
    </Accordion>
  )
}
