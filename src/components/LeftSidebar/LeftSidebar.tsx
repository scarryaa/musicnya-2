import styles from './LeftSidebar.module.scss'
import { LeftSidebarButton } from './LeftSidebarButton'
import { faClock, faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faGlobe,
  faHeadphones,
  faHouse,
  faList,
  faMusic,
  faPlus,
  faPodcast,
  faRecordVinyl,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons'
import { setStore, store } from '../../stores/store'
import { WindowButtonsMac } from '../WindowButtons/WindowButtons'
import Tooltip from '../Tooltip/Tooltip'
import { For, Match, Switch } from 'solid-js'
import { LeftSidebarGroup } from './LeftSidebarGroup'
import { LeftSidebarButtonSkeleton } from '../Skeletons/LeftSidebarButtonSkeleton'

Tooltip

export const LeftSidebar = () => {
  const smallSidebarButtons = (
    <>
      <LeftSidebarButton tooltip="Home" text="Home" icon={faHouse} href={'/home'} />
      <LeftSidebarButton
        tooltip="Listen Now"
        text="Listen Now"
        icon={faPlayCircle}
        href={'/listen'}
      />
      <LeftSidebarButton tooltip="Browse" text="Browse" icon={faGlobe} href={'/browse'} />
      <LeftSidebarButton tooltip="Radio" text="Radio" icon={faPodcast} href={'/radio'} />
      <LeftSidebarButton
        tooltip="Recently Added"
        text="Recently Added"
        icon={faClock}
        href={'/recent'}
      />
      <LeftSidebarButton tooltip="Songs" text="Songs" icon={faMusic} href={'/songs'} />
      <LeftSidebarButton
        tooltip="Albums"
        text="Albums"
        icon={faRecordVinyl}
        href={'/albums'}
      />
      <LeftSidebarButton
        tooltip="Artists"
        text="Artists"
        icon={faUserGroup}
        href={'/artists'}
      />
      <LeftSidebarButton
        tooltip="Playlists"
        text="Playlists"
        icon={faHeadphones}
        href={'/playlists'}
      />
    </>
  )

  const extendedSidebarButtons = (
    <>
      <LeftSidebarGroup title="Apple Music">
        <LeftSidebarButton tooltip="Home" text="Home" icon={faHouse} href={'/home'} />
        <LeftSidebarButton
          tooltip="Listen Now"
          text="Listen Now"
          icon={faPlayCircle}
          href={'/listen'}
        />
        <LeftSidebarButton
          tooltip="Browse"
          text="Browse"
          icon={faGlobe}
          href={'/browse'}
        />
        <LeftSidebarButton
          tooltip="Radio"
          text="Radio"
          icon={faPodcast}
          href={'/radio'}
        />
      </LeftSidebarGroup>
      <LeftSidebarGroup title="Library">
        <LeftSidebarButton
          tooltip="Recently Added"
          text="Recently Added"
          icon={faClock}
          href={'/recent'}
        />
        <LeftSidebarButton tooltip="Songs" text="Songs" icon={faMusic} href={'/songs'} />
        <LeftSidebarButton
          tooltip="Albums"
          text="Albums"
          icon={faRecordVinyl}
          href={'/albums'}
        />
        <LeftSidebarButton
          tooltip="Artists"
          text="Artists"
          icon={faUserGroup}
          href={'/artists'}
        />
      </LeftSidebarGroup>
      <LeftSidebarGroup title="Apple Music Playlists">
        <Switch>
          <Match when={store.library.playlists.length === 0}>
            <LeftSidebarButtonSkeleton />
            <LeftSidebarButtonSkeleton />
            <LeftSidebarButtonSkeleton />
          </Match>
          <Match when={store.library.playlists.length > 0}>
            <For
              each={store.library.playlists.filter(
                playlist => !playlist.attributes.canEdit
              )}
            >
              {playlist => (
                <LeftSidebarButton
                  tooltip={playlist.attributes.name}
                  text={playlist.attributes.name}
                  icon={faHeadphones}
                  href={`media/playlists/${playlist.id}`}
                  showTooltip={true}
                />
              )}
            </For>
          </Match>
        </Switch>
      </LeftSidebarGroup>
      <LeftSidebarGroup title="Playlists">
        <LeftSidebarButton
          isLink={false}
          tooltip="New"
          text="New"
          icon={faPlus}
          href={'/new'}
        />
        <LeftSidebarButton
          tooltip="All Playlists"
          text="All Playlists"
          icon={faList}
          href="/playlists"
        />
        <Switch>
          <Match when={store.library.playlists.length === 0}>
            <LeftSidebarButtonSkeleton />
            <LeftSidebarButtonSkeleton />
            <LeftSidebarButtonSkeleton />
          </Match>
          <Match when={store.library.playlists.length > 0}>
            <For
              each={store.library.playlists.filter(
                playlist => playlist.attributes.canEdit
              )}
            >
              {playlist => (
                <LeftSidebarButton
                  tooltip={playlist.attributes.name}
                  text={playlist.attributes.name}
                  icon={faHeadphones}
                  href={`media/playlists/${playlist.id}`}
                  showTooltip={true}
                />
              )}
            </For>
          </Match>
        </Switch>
      </LeftSidebarGroup>
    </>
  )

  return (
    <div
      class={styles['left-sidebar']}
      style={{ width: `${store.app.leftSidebarWidth}px` }}
    >
      {store.app.platform === 'darwin' && (
        <div class={styles['left-sidebar__windowButtons']}>
          <WindowButtonsMac />
        </div>
      )}
      <div class={styles['left-sidebar__buttons']}>
        <div class={styles['left-sidebar__buttons__inner']}>
          {store.app.leftSidebarWidth > 119
            ? extendedSidebarButtons
            : smallSidebarButtons}
        </div>
      </div>
      <div
        class={styles['left-sidebar__handle']}
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
