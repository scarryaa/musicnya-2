import { For, onMount, type JSX, createEffect } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { setStore, store } from '../../stores/store'
import Fa from 'solid-fa'
import Tooltip from '../Tooltip/Tooltip'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export function ContextMenu(): JSX.Element {
  // click event handler for context menu
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setStore('app', 'contextMenu', {
      x: -10000,
      y: -10000,
      items: [],
      open: false,
      id: '',
      type: '',
      display: 'none'
    })

    setStore('app', 'subContextMenu', {
      x: -10000,
      y: -10000,
      items: [],
      open: false,
      id: '',
      type: ''
    })

    // remove event listener
    window.removeEventListener('click', handleClick)
  }

  // handle click outside of context menu
  window.addEventListener('click', e => {
    if (store.app.contextMenu.open) {
      handleClick(e)
    }
  })

  createEffect(() => {
    setStore('app', 'subContextMenu', {
      x: 0,
      y: 0,
      items: [],
      open: false,
      id: '',
      type: ''
    })
  })

  return (
    <div
      onClick={handleClick}
      class={styles.contextMenu}
      style={`top: ${store.app.contextMenu.y}px; left: ${store.app.contextMenu.x}px; position: absolute; display: ${store.app.contextMenu.display}`}
    >
      <div>
        <div style="display: flex; flex-direction: row">
          <For
            each={store.app.contextMenu.items
              .filter(item => item !== null)
              .filter(item => item.isQuickAction)}
          >
            {item => (
              <div
                class={`${styles.contextMenu__quick__item} ${
                  item.disabled ? 'disabled' : ''
                }`}
                onclick={!item.disabled ? item.action : undefined}
                use:Tooltip={['bottom', item.tooltip]}
                aria-disabled={item.disabled}
              >
                <Fa icon={item.icon} size="1x" color="var(--app-text-color)" />
              </div>
            )}
          </For>
        </div>

        <For
          each={store.app.contextMenu.items
            .filter(item => item !== null)
            .filter(item => !item.isQuickAction)}
        >
          {item => (
            <div
              class={styles.contextMenu__item}
              onclick={item.action}
              onMouseOver={item.onMouseOver}
              onMouseLeave={item.onMouseLeave}
            >
              <span class={styles.contextMenu__item__icon}>
                <Fa size="1x" color="var(--app-text-color)" icon={item.icon} />
              </span>
              <span
                style={`vertical-align: top; margin-left: 0.5rem; margin-top: 6px; display: inline-block;`}
              >
                {item.label}
              </span>
              {item.hasSubMenu && (
                <span
                  class={`${styles.contextMenu__item__icon} ${styles.contextMenu__item__subMenuIcon}`}
                >
                  <Fa size="xs" color="var(--app-text-color)" icon={faChevronRight} />
                </span>
              )}
            </div>
          )}
        </For>
      </div>
      <div
        class={styles.contextMenu__subContextMenu}
        style={`display: ${
          store.app.subContextMenu.open ? 'block' : 'none'
        }; top: calc(0px + ${
          store.app.subContextMenu.y
        }px); left: 100%; position: absolute; width: 100%; max-height: 200%; overflow-y: auto;`}
      >
        <For each={store.app.subContextMenu.items}>
          {item => (
            <div
              class={styles.contextMenu__item}
              onclick={item.hasSubMenu ? null : item.action}
              onMouseOver={item.onMouseOver}
              onMouseLeave={item.onMouseLeave}
            >
              <span class={styles.contextMenu__item__icon}>
                <Fa icon={item.icon} size="1x" color="white" />
              </span>
              <span
                style={`vertical-align: top; margin-left: 0.5rem; margin-top: 6px; text-overflow: ellipsis; overflow: hidden;`}
              >
                {item.label}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
