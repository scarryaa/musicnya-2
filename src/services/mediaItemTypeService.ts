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
      case 'uploaded-videos':
        return 'uploadedVideos'
      case 'music-videos':
        return 'musicVideos'
      default:
        const mediaItemTypes = Object.values(MediaItemType)

        if (mediaItemTypes.includes(type)) {
          return type.replace('library-', '')
        } else {
          throw new Error(`Unknown media item type: ${type}`)
        }
    }
  }

  /**
   * Checks if the given type is a library type.
   * @param {string} type - The type to check.
   * @returns {boolean} - True if the type is a library type, false otherwise.
   */
  static isLibraryType(type) {
    return type.includes('library-')
  }
}