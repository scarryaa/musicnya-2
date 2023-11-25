import { ArtistsApi } from './ArtistsApi'
import { ApiClient } from './MkApiClient'
import * as config from '../../config.json'
import { MetadataApi } from './MetadataApi'
import { LibraryApi } from './LibraryApi'
import { PlaylistApi } from './PlaylistApi'
import { AlbumApi } from './AlbumApi'

class MusicKitApiManager {
  musicKitApiClient: ApiClient | null = null
  metadataApi: MetadataApi | null = null
  artistsApi: ArtistsApi | null = null
  libraryApi: LibraryApi | null = null
  playlistApi: PlaylistApi | null = null
  albumApi: AlbumApi | null = null
  musicKitInstance: MusicKit.MusicKitInstance | null = null

  /**
   * Initializes the APIs required for MusicKit.
   * @throws {Error} If the MusicKit instance is not initialized.
   */
  initializeApis(musicKitInstance: MusicKit.MusicKitInstance) {
    if (!musicKitInstance) {
      throw new Error('MusicKit instance not set')
    }

    this.musicKitInstance = musicKitInstance

    this.musicKitApiClient = new ApiClient(this.musicKitInstance, config)
    this.metadataApi = new MetadataApi(this.musicKitInstance, this.musicKitApiClient)
    this.artistsApi = new ArtistsApi(this.musicKitInstance, this.musicKitApiClient)
    this.libraryApi = new LibraryApi(this.musicKitInstance, this.musicKitApiClient)
    this.playlistApi = new PlaylistApi(this.musicKitInstance, this.musicKitApiClient)
    this.albumApi = new AlbumApi(this.musicKitInstance, this.musicKitApiClient)
  }

  /**
   * Retrieves an artist by their ID.
   * @param {number} id - The ID of the artist.
   * @returns {Promise<Artist>} - A promise that resolves to the artist object.
   */
  async getArtist(id: string) {
    return await this.artistsApi.getArtist(id)
  }

  /**
   * Checks if an artist is marked as favorite.
   * @param {number} id - The ID of the artist.
   * @returns {boolean} - Returns true if the artist is marked as favorite, otherwise false.
   */
  async isArtistFavorite(id: string) {
    return await this.artistsApi.isArtistFavorite(id)
  }

  /**
   * Favorites an artist.
   * @param {number} id - The ID of the artist.
   * @returns {Promise<void>} - A promise that resolves when the artist is favorited.
   */
  async favoriteArtist(id: string) {
    return await this.artistsApi.favoriteArtist(id)
  }

  /**
   * Unfavorites an artist.
   * @param {number} id - The ID of the artist.
   * @returns {Promise<void>} - A promise that resolves when the artist is unfavorited.
   */
  async unfavoriteArtist(id: string) {
    return await this.artistsApi.unfavoriteArtist(id)
  }

  /**
   * Retrieves the artist information from a media item.
   * @param {string} id - The ID of the media item.
   * @param {MusicKit.MediaItemType} type - The type of the media item.
   * @returns {Promise<any>} - A promise that resolves to the artist information.
   */
  async getArtistFromMediaItem(id: string, type: MusicKit.MediaItemType) {
    return await this.artistsApi.getArtistFromMediaItem(id, type)
  }

  async getCatalogArtistFromLibrary(id: string) {
    return await this.artistsApi.getCatalogArtistFromLibrary(id)
  }

  /**
   * Retrieves the credits for a song with the specified ID.
   *
   * @param id - The ID of the song.
   * @returns A Promise that resolves to the response containing the song credits.
   */
  async getSongCredits(id: string) {
    return await this.metadataApi.getSongCredits(id)
  }

  /**
   * Retrieves the lyrics for a song with the specified ID.
   *
   * @param id - The ID of the song.
   * @returns A Promise that resolves to the response containing the song lyrics.
   */
  async getSongLyrics(id: string) {
    return await this.metadataApi.getSongLyrics(id)
  }

  /**
   * Retrieves the recently played songs.
   *
   * @returns A Promise that resolves to the response containing the recently played songs.
   */
  async getRecentSongs() {
    return await this.metadataApi.getRecentSongs()
  }

  /**
   * Adds an item to the user's library.
   * @param id The ID of the item to be added.
   * @param type The type of the item to be added ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  async addToLibrary(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.addToLibrary(id, type)
  }

  /**
   * Removes an item from the user's library.
   * @param id The ID of the item to be removed.
   * @param type The type of the item to be removed ('songs', 'albums', or 'playlists').
   * @returns A Promise that resolves to the response from the server.
   */
  async removeFromLibrary(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.removeFromLibrary(id, type)
  }

  /**
   * Checks if an item is marked as a favorite by the user.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async isItemFavorite(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.isItemFavorite(id, type)
  }

  /**
   * Favorites an item.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async favoriteItem(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.favoriteItem(id, type)
  }

  /**
   * Unfavorites an item.
   * @param {string} id - The ID of the item.
   * @param {string} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async unfavoriteItem(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.unfavoriteItem(id, type)
  }

  /**
   * Dislikes an item.
   * @param {string} id - The ID of the item.
   * @param {MusicKit.MediaItemType} type - The type of the item.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */
  async dislikeItem(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.dislikeItem(id, type)
  }

  /**
   * Checks if an item is in the library.
   * @param {string} id - The ID of the item.
   * @param {MusicKit.MediaItemType} type - The type of the item.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item is in the library, false otherwise.
   */
  async isItemInLibrary(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.isItemInLibrary(id, type)
  }

  /**
   * Retrieves a catalog item from the library id.
   * @param {string} id - The ID of the catalog item.
   * @param {MusicKit.MediaItemType} type - The type of the catalog item.
   * @returns {Promise<any>} - A promise that resolves to the catalog item.
   */
  async getCatalogItemFromLibrary(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.getCatalogItemFromLibrary(id, type)
  }

  /**
   * Retrieves the library ID from the catalog based on the provided ID and type.
   * @param {string} id - The ID of the item in the catalog.
   * @param {MusicKit.MediaItemType} type - The type of the item in the catalog.
   * @returns {Promise<string>} - A promise that resolves with the library ID.
   */
  async getLibraryIdFromCatalog(id: string, type: MusicKit.MediaItemType) {
    return await this.libraryApi.getLibraryIdFromCatalog(id, type)
  }

  /**
   * Adds an item to a playlist.
   * @param {string} id - The ID of the item to be added.
   * @param {MusicKit.MediaItemType} type - The type of the item to be added ('songs', 'albums', or 'playlists').
   * @param {string} playlistId - The ID of the playlist.
   */
  async addItemToPlaylist(id: string, type: MusicKit.MediaItemType, playlistId: string) {
    return await this.playlistApi.addItemToPlaylist(id, type, playlistId)
  }

  /**
   * Removes an item from a playlist.
   * @param {string} id - The ID of the item to be removed.
   * @param {MusicKit.MediaItemType} type - The type of the item to be removed ('songs', 'albums', or 'playlists').
   * @param {string} playlistId - The ID of the playlist.
   */
  async removeItemFromPlaylist(
    id: string,
    type: MusicKit.MediaItemType,
    playlistId: string
  ) {
    return await this.playlistApi.removeItemFromPlaylist(id, type, playlistId)
  }

  /**
   * Creates a playlist.
   * @param {string} name - The name of the playlist.
   * @param {string} description - The description of the playlist.
   */
  async createPlaylist(name: string, description: string) {
    return await this.playlistApi.createPlaylist(name, description)
  }

  /**
   * Removes a playlist.
   * @param {string} id - The ID of the playlist.
   * @returns {Promise<any>} - A promise that resolves with the response from the server.
   */

  async removePlaylist(id: string) {
    return await this.playlistApi.removePlaylist(id)
  }

  /**
   * Retrieves recently added items from the API.
   * @param offset The offset for pagination.
   * @returns A promise that resolves to the recently added items.
   */
  async getRecentlyAdded(offset: number) {
    return await this.metadataApi.getRecentlyAdded(offset)
  }

  /**
   * Retrieves the share link for an item.
   * @param id The ID of the item.
   * @param type The type of the item.
   * @returns A promise that resolves to the share link.
   */
  async getShareLink(id: string, type: MusicKit.MediaItemType) {
    return await this.metadataApi.getShareLink(id, type)
  }

  /**
   * Retrieves an album from a media item.
   * @param id The ID of the media item.
   * @param type The type of the media item.
   * @returns A promise that resolves to the album.
   */
  async getAlbumFromMediaItem(id: string, type: MusicKit.MediaItemType) {
    return await this.albumApi.getAlbumFromMediaItem(id, type)
  }
}

export const mkApiManager = new MusicKitApiManager()
