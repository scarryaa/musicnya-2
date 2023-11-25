import { store } from '../../stores/store'
import { ArtistsApi } from '../ArtistsApi'
import { MetadataApi } from '../MetadataApi'
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

describe('MetadataApi', () => {
  let metadataApi
  let mockApiClient

  beforeEach(() => {
    mockApiClient = new ApiClient(MusicKit, {})
    metadataApi = new MetadataApi(MusicKit, mockApiClient)

    // Mock store's countryCode
    store.countryCode = 'us'

    // Mock ApiClient's fetchFromMusicKit method
    mockApiClient.fetchFromMusicKit.mockResolvedValue({})
  })

  describe('MetadataApi - getSongCredits', () => {
    it('should retrieve song credits', async () => {
      const songId = '12345'
      await metadataApi.getSongCredits(songId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        `catalog/${store.countryCode}/songs/${songId}/credits`
      )
    })

    it('should retrieve song credits with the correct query parameters', async () => {
      const songId = '12345'
      await metadataApi.getSongCredits(songId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(expect.any(String))
    })
  })

  describe('MetadataApi - getSongLyrics', () => {
    it('should retrieve song lyrics', async () => {
      const songId = '12345'
      await metadataApi.getSongLyrics(songId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        `catalog/${store.countryCode}/songs/${songId}/lyrics`
      )
    })

    it('should retrieve song lyrics with the correct query parameters', async () => {
      const songId = '12345'
      await metadataApi.getSongLyrics(songId)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(expect.any(String))
    })
  })

  describe('MetadataApi - getRecentSongs', () => {
    it('should retrieve recent songs', async () => {
      await metadataApi.getRecentSongs()

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(
        `me/recent/played/tracks`
      )
    })

    it('should retrieve recent songs with the correct query parameters', async () => {
      await metadataApi.getRecentSongs()

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(expect.any(String))
    })
  })
})
