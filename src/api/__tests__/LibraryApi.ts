import { store } from '../../stores/store'
import { LibraryApi } from '../LibraryApi'
import { ApiClient } from '../MkApiClient'

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

describe('LibraryApi', () => {
  let libraryApi
  let mockApiClient

  beforeEach(() => {
    mockApiClient = new ApiClient(MusicKit, {})
    libraryApi = new LibraryApi(MusicKit, mockApiClient)

    // Mock store's countryCode
    store.countryCode = 'us'

    // Mock ApiClient's fetchFromMusicKit method
    mockApiClient.fetchFromMusicKit.mockResolvedValue({})
  })

  describe('LibraryApi - addToLibrary', () => {
    it("should add an item to the user's library", async () => {
      const id = '12345'
      const type = 'songs'
      await libraryApi.addToLibrary(id, type)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(`me/library/${type}`, {
        method: 'POST',
        body: JSON.stringify({
          data: [
            {
              id,
              type
            }
          ]
        })
      })
    })
  })

  describe('LibraryApi - removeFromLibrary', () => {
    it("should remove an item from the user's library", async () => {
      const id = '12345'
      const type = 'songs'
      await libraryApi.removeFromLibrary(id, type)

      expect(mockApiClient.fetchFromMusicKit).toHaveBeenCalledWith(`me/library/${type}`, {
        method: 'DELETE',
        body: JSON.stringify({
          data: [
            {
              id,
              type
            }
          ]
        })
      })
    })
  })
})
