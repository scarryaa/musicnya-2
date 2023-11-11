import styles from './LeftSidebar.module.scss'
import { LeftSidebarButton } from './LeftSidebarButton'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import {
  faGlobe,
  faHeadphones,
  faHouse,
  faMusic,
  faPodcast,
  faRecordVinyl,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons'
import { setStore, store } from '../../stores/store'
import { WindowButtons, WindowButtonsMac } from '../WindowButtons/WindowButtons'

export const LeftSidebar = () => {
  return (
    <div class={styles.leftSidebar} style={{ width: `${store.app.leftSidebarWidth}px` }}>
      {store.app.platform === 'darwin' && (
        <div class={styles.leftSidebar__windowButtons}>
          <WindowButtonsMac />
        </div>
      )}
      <div class={styles.leftSidebar__buttons}>
        <LeftSidebarButton text="Home" icon={faHouse} href={'/home'} />
        <LeftSidebarButton text="Browse" icon={faGlobe} href={'/browse'} />
        <LeftSidebarButton text="Radio" icon={faPodcast} href={'/radio'} />
        <LeftSidebarButton text="Recently Added" icon={faClock} href={'/recent'} />
        <LeftSidebarButton text="Songs" icon={faMusic} href={'/songs'} />
        <LeftSidebarButton text="Albums" icon={faRecordVinyl} href={'/albums'} />
        <LeftSidebarButton text="Artists" icon={faUserGroup} href={'/artists'} />
        <LeftSidebarButton text="Playlists" icon={faHeadphones} href={'/playlists'} />
      </div>
      <div
        class={styles.leftSidebar__handle}
        onMouseDown={() => {
          const onMouseMove = (e: MouseEvent) => {
            // If the mouse x-position is less than 120, snap to 60px, else calculate the new width with limits
            const newWidth = e.clientX < 120 ? 60 : Math.min(Math.max(e.clientX, 60), 200)

            setStore('app', 'leftSidebarWidth', newWidth)
            localStorage.setItem('leftSidebarWidth', String(newWidth))
          }

          const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
          }

          window.addEventListener('mousemove', onMouseMove)
          window.addEventListener('mouseup', onMouseUp)
        }}
      ></div>
    </div>
  )
}
