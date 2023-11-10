import { createEffect, createSignal } from 'solid-js'
import styles from './LeftSidebar.module.scss'
import { LeftSidebarButton } from './LeftSidebarButton'
import { faClock, faNoteSticky, faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faGlobe,
  faHeadphones,
  faHouse,
  faMusic,
  faPodcast,
  faRecordVinyl,
  faTowerBroadcast,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons'

type LeftSidebarProps = {
  onWidthChange: (newWidth: number) => void
  showSidebar: boolean
}

export const LeftSidebar = ({ onWidthChange, showSidebar }: LeftSidebarProps) => {
  const [width, setWidth] = createSignal(100)

  createEffect(() => {
    localStorage.getItem('leftSidebarWidth') &&
      setWidth(Number(localStorage.getItem('leftSidebarWidth')))
    onWidthChange(Number(localStorage.getItem('leftSidebarWidth')))
  }, [onWidthChange])

  return (
    <div class={styles.leftSidebar} style={{ width: `${width()}px` }}>
      <div class={styles.leftSidebar__buttons}>
        <LeftSidebarButton
          text="Home"
          sidebarWidth={width}
          icon={faHouse}
          href={'/home'}
        />
        <LeftSidebarButton
          text="Browse"
          sidebarWidth={width}
          icon={faGlobe}
          href={'/browse'}
        />
        <LeftSidebarButton
          text="Radio"
          sidebarWidth={width}
          icon={faPodcast}
          href={'/radio'}
        />
        <LeftSidebarButton
          text="Recently Added"
          sidebarWidth={width}
          icon={faClock}
          href={'/recent'}
        />
        <LeftSidebarButton
          text="Songs"
          sidebarWidth={width}
          icon={faMusic}
          href={'/songs'}
        />
        <LeftSidebarButton
          text="Albums"
          sidebarWidth={width}
          icon={faRecordVinyl}
          href={'/albums'}
        />
        <LeftSidebarButton
          text="Artists"
          sidebarWidth={width}
          icon={faUserGroup}
          href={'/artists'}
        />
        <LeftSidebarButton
          text="Playlists"
          sidebarWidth={width}
          icon={faHeadphones}
          href={'/playlists'}
        />
      </div>
      <div
        class={styles.leftSidebar__handle}
        onMouseDown={() => {
          const onMouseMove = (e: MouseEvent) => {
            // If the mouse x-position is less than 120, snap to 60px, else calculate the new width with limits
            const newWidth = e.clientX < 120 ? 60 : Math.min(Math.max(e.clientX, 60), 200)

            setWidth(newWidth)
            onWidthChange(newWidth)
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
