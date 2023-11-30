import { ContextMenuType } from '../../../types/types'
import { appContextMenuConfig } from './appContextMenuConfig'
import { artistContextMenuConfig } from './artistContextMenuConfig'
import { curatorContextMenuConfig } from './curatorContextMenuConfig'
import { editorialContextMenuConfig } from './editorialContextMenuConfig'
import { historyItemContextMenuConfig } from './historyItemContextMenuConfig'
import { mediaItemContextMenuConfig } from './mediaItemContextMenuConfig'
import { queueItemContextMenuConfig } from './queueItemContextMenuConfig'
import { songContextMenuConfig } from './songContextMenuConfig'

export const contextMenuConfig: Record<ContextMenuType, any> = {
  [ContextMenuType.App]: appContextMenuConfig,
  [ContextMenuType.HistoryItem]: historyItemContextMenuConfig,
  [ContextMenuType.Artist]: artistContextMenuConfig,
  [ContextMenuType.Song]: songContextMenuConfig,
  [ContextMenuType.MediaItem]: mediaItemContextMenuConfig,
  [ContextMenuType.QueueItem]: queueItemContextMenuConfig,
  [ContextMenuType.Editorial]: editorialContextMenuConfig,
  [ContextMenuType.Curator]: curatorContextMenuConfig
}
