import { store } from '../../stores/store'
import { ArtistsApi } from '../ArtistsApi'
import { ApiClient } from '../MkApiClient'
import MusicKit, { mockConfigure, mockAuthorize } from '../__mocks__/musicKit.mock'

jest.mock('../MkApiClient')
jest.mock('../../stores/store')

const originalMusicKit = global.MusicKit

beforeAll(() => {
  // @ts-ignore
  global.MusicKit = MusicKit
})

afterAll(() => {
  global.MusicKit = originalMusicKit
})

describe('ArtistsApi', () => {
  let artistsApi
  let mockApiClient

  beforeEach(() => {
    mockApiClient = new ApiClient(MusicKit, {})
    artistsApi = new ArtistsApi(MusicKit, mockApiClient)

    // Mock store's countryCode
    store.countryCode = 'us'

    // Mock ApiClient's fetchFromMusicKit method
    mockApiClient.fetchFromMusicKit.mockResolvedValue({})
  })

  describe('ArtistsApi - getArtist', () => {
    it('should retrieve artist information', async () => {
      const artistId = '12345'
      await artistsApi.getArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        `catalog/${store.countryCode}/artists/${artistId}`,
        null,
        expect.any(Object)
      )
    })

    it('should retrieve artist information with the correct query parameters', async () => {
      const artistId = '12345'
      await artistsApi.getArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        null,
        expect.objectContaining({
          include: expect.any(String),
          l: expect.any(String),
          platform: expect.any(String),
          views: expect.any(String),
          extend: expect.any(String),
          'extend[playlists]': expect.any(String),
          'include[songs]': expect.any(String),
          'fields[albums]': expect.any(String),
          'limit[artists:top-songs]': expect.any(String),
          'art[url]': expect.any(String)
        })
      )
    })

    it('should retrieve artist information with the correct query parameters when the countryCode is not "us"', async () => {
      store.countryCode = 'ca'
      const artistId = '12345'
      await artistsApi.getArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        null,
        expect.objectContaining({
          include: expect.any(String),
          l: expect.any(String),
          platform: expect.any(String),
          views: expect.any(String),
          extend: expect.any(String),
          'extend[playlists]': expect.any(String),
          'include[songs]': expect.any(String),
          'fields[albums]': expect.any(String),
          'limit[artists:top-songs]': expect.any(String),
          'art[url]': expect.any(String)
        })
      )
    })
  })

  describe('ArtistsApi - isArtistFavorite', () => {
    it('should retrieve favorite artists', async () => {
      const artistId = '12345'
      await artistsApi.isArtistFavorite(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        'me/favorites',
        null,
        expect.any(Object)
      )
    })

    it('should retrieve favorite artists with the correct query parameters', async () => {
      const artistId = '12345'
      await artistsApi.isArtistFavorite(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        null,
        expect.objectContaining({
          l: expect.any(String),
          platform: expect.any(String),
          'ids[artists]': expect.any(String)
        })
      )
    })
  })

  describe('ArtistsApi - favoriteArtist', () => {
    it('should favorite an artist', async () => {
      const artistId = '12345'
      await artistsApi.favoriteArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        'me/favorites',
        { method: 'POST' },
        expect.any(Object)
      )
    })

    it('should favorite an artist with the correct query parameters', async () => {
      const artistId = '12345'
      await artistsApi.favoriteArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        { method: 'POST' },
        expect.objectContaining({
          l: expect.any(String),
          platform: expect.any(String),
          'art[url]': expect.any(String),
          'ids[artists]': expect.any(String)
        })
      )
    })
  })

  describe('ArtistsApi - unfavoriteArtist', () => {
    it('should unfavorite an artist', async () => {
      const artistId = '12345'
      await artistsApi.unfavoriteArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        'me/favorites',
        { method: 'DELETE' },
        expect.any(Object)
      )
    })

    it('should unfavorite an artist with the correct query parameters', async () => {
      const artistId = '12345'
      await artistsApi.unfavoriteArtist(artistId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        { method: 'DELETE' },
        expect.objectContaining({
          'ids[artists]': expect.any(String)
        })
      )
    })
  })

  describe('ArtistsApi - getArtistFromMediaItem', () => {
    it('should retrieve artist information from a media item', async () => {
      const mediaItemId = '12345'
      const mediaItemType = 'songs'
      await artistsApi.getArtistFromMediaItem(mediaItemId, mediaItemType)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        `catalog/${store.countryCode}/${mediaItemType}/${mediaItemId}/artists`,
        null,
        expect.any(Object)
      )
    })

    it('should retrieve artist information from a media item with the correct query parameters', async () => {
      const mediaItemId = '12345'
      const mediaItemType = 'songs'
      await artistsApi.getArtistFromMediaItem(mediaItemId, mediaItemType)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        expect.any(String),
        null,
        expect.objectContaining({
          'fields[artists]': expect.any(String)
        })
      )
    })

    it('should handle API errors gracefully', async () => {
      const mediaItemId = '12345'
      const mediaItemType = 'songs'

      // Mock an API error
      mockApiClient.fetchFromMusicKit.mockRejectedValue(new Error('API Error'))

      await expect(
        artistsApi.getArtistFromMediaItem(mediaItemId, mediaItemType)
      ).rejects.toThrow('Error fetching artist from media item')
    })

    it('should throw an error for invalid media item ID', async () => {
      const invalidMediaItemId = ''
      const mediaItemType = 'songs'

      await expect(
        artistsApi.getArtistFromMediaItem(invalidMediaItemId, mediaItemType)
      ).rejects.toThrow('Invalid media item ID')
    })
  })
})
