import styles from './TabSwitcher.module.scss'

export const TabSwitcherContent = ({ tabs, activeTab }) => {
  return <div class={styles.tabSwitcherContent}>{tabs[activeTab()].content}</div>
}
