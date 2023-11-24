import * as config from '../../config.json'
import { mkController } from '../../src/api/mkController'

// Mocking the MusicKit global object
// @ts-ignore
global.MusicKit = {
  configure: jest.fn().mockImplementation(() =>
    Promise.resolve({
      authorize: jest.fn().mockResolvedValue('authorized'),
      musicUserToken: 'mockToken'
    })
  ),
  getInstance: jest.fn().mockReturnValue({
    addEventListener() {},
    authorize: jest.fn().mockResolvedValue('authorized'),
    volume: 0,
    setQueue: jest.fn(),
    play: jest.fn()
  })
}

global.fetch = jest.fn()

describe('mkController', () => {
  beforeEach(async () => {
    // Reset mocks before each test
    await (MusicKit.configure as jest.Mock).mockReset()
    await (fetch as jest.Mock).mockClear()
    await (MusicKit.configure as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        authorize: jest.fn().mockResolvedValue('authorized'),
        musicUserToken: 'mockToken'
      })
    )
    mkController.isInitialized = false
    mkController.isErrored = false
  })

  it('should initialize MusicKit successfully', async () => {
    await mkController.getInstance()
    expect(MusicKit.configure).toHaveBeenCalledWith({
      developerToken: config.MusicKit.token,
      app: {
        name: 'Music',
        build: '1.0.0'
      },
      sourceType: 24,
      suppressErrorDialog: true
    })
    expect(mkController.isInitialized).toBe(true)
  })

  it('should handle initialization errors', async () => {
    await (MusicKit.configure as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Initialization failed'))
    )
    await mkController.getInstance()
    expect(mkController.isErrored).toBe(true)
  })

  describe('authorize', () => {
    it('should authorize MusicKit successfully', async () => {
      await mkController.authorize()
      expect(MusicKit.getInstance().authorize).toHaveBeenCalled()
      expect(mkController.isAuthorized).toBe(true)
    })

    it('should handle authorization errors', async () => {
      const authorizeMock = MusicKit.getInstance().authorize as jest.Mock
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      authorizeMock.mockImplementationOnce(() =>
        Promise.reject(new Error('Authorization failed'))
      )
      await mkController.authorize()
      expect(mkController.isErrored).toBe(true)
      expect(mkController.isAuthorized).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith('Failed to authorize: ', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('setVolume', () => {
    it('should set volume', async () => {
      const volume = 50
      const instance = MusicKit.getInstance()

      await mkController.setVolume(volume)

      expect(instance.volume).toBe(volume)
    })

    it('should handle errors', async () => {
      const volume = 101
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      await mkController.setVolume(volume)
      expect(consoleSpy).toHaveBeenCalledWith('Error setting volume: ', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('playMediaItem', () => {
    it('should play a media item', async () => {
      const instance = MusicKit.getInstance()
      const mediaItem = {
        id: '123',
        type: 'album'
      }

      await mkController.playMediaItem(mediaItem.id, mediaItem.type)

      expect(instance.setQueue).toHaveBeenCalledWith({
        [mediaItem.type]: [mediaItem.id],
        startPlaying: true,
        startWith: 0
      })
    })

    it('should handle errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      await mkController.playMediaItem(null, null)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error playing media item: ',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })
  })

  describe('getShareLink', () => {
    it('successfully gets a share link', async () => {
      const mockResponse = { url: 'mockedUrl' }
      await (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const id = '123'
      const type = 'album'

      const result = await mkController.getShareLink(id, type)

      expect(fetch).toHaveBeenCalledWith(
        `https://amp-api.music.apple.com/v1/catalog/us/${type}/${id}?l=en-US&platform=web&fields=url`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('handles failure to get a share link', async () => {
      await (fetch as jest.Mock).mockRejectedValue(new Error('Network error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const id = '123'
      const type = 'album'

      await mkController.getShareLink(id, type)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching share link: ',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })
  })
})
