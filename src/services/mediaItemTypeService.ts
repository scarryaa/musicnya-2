import { MediaItemType } from '../types/types'

/**
 * Service for handling media item types.
 */
export class MediaItemTypeService {
  /**
   * Strips the type of a media item.
   * @param {string} type - The type of the media item.
   * @returns {string} - The stripped type of the media item.
   */
  static stripType(type) {
    switch (type) {
      case 'stations':
        return type.replace(/s$/, '')
      case 'uploaded-videos':
        return 'uploadedVideos'
      case 'music-videos':
        return 'musicVideos'
      default:
        const mediaItemTypes = Object.values(MediaItemType)

        if (type === MediaItemType.Stations) {
          return type.replace(/s$/, '')
        } else if (mediaItemTypes.includes(type)) {
          return type
        } else {
          throw new Error(`Unknown media item type: ${type}`)
        }
    }
  }
}
