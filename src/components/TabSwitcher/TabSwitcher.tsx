import { For, createSignal } from 'solid-js'
import styles from './TabSwitcher.module.scss'
import { TabSwitcherContent } from './TabSwitcherContent'

export const TabSwitcher = ({ tabs }) => {
  const [activeTab, setActiveTab] = createSignal(0)

  return (
    <div class={styles.tabSwitcher}>
      <div class={styles.tabSwitcher__tabs}>
        <For each={tabs}>
          {(tab, index) => (
            <div
              class={`${styles.tabSwitcher__tab} ${
                activeTab() === index() ? styles['tabSwitcher__tab--active'] : ''
              }`}
              onClick={() => {
                setActiveTab(index())
              }}
            >
              <span>{tab.name}</span>
            </div>
          )}
        </For>
      </div>
      <div class={styles.tabSwitcher__content}>
        <TabSwitcherContent tabs={tabs} activeTab={activeTab} />
      </div>
    </div>
  )
}
