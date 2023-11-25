import MusicKit, { mockConfigure, mockAuthorize } from '../__mocks__/musicKit.mock'
import { mkManager } from '../MkManager'

const originalMusicKit = global.MusicKit

beforeAll(() => {
  // @ts-ignore
  global.MusicKit = MusicKit
})

afterAll(() => {
  global.MusicKit = originalMusicKit
})

describe('MusicKitManager', () => {
  beforeEach(() => {
    mockConfigure.mockClear()
    mockAuthorize.mockClear()
    mkManager.musicKitInstance = null
  })

  it('initializes MusicKit only once', async () => {
    await mkManager.initializeMusicKit()
    await mkManager.initializeMusicKit() // Call it twice

    expect(mockConfigure).toHaveBeenCalledTimes(1) // It should only configure once
  })

  it('throws error if MusicKit initialization fails', async () => {
    // reject 3 times (the number of attempts)
    mockConfigure.mockRejectedValueOnce(new Error('Initialization error'))
    mockConfigure.mockRejectedValueOnce(new Error('Initialization error'))
    mockConfigure.mockRejectedValueOnce(new Error('Initialization error'))

    await expect(mkManager.initializeMusicKit()).rejects.toThrow('Initialization error')
  })

  it('authorizes the MusicKit instance', async () => {
    await mkManager.initializeMusicKit()
    await mkManager.authorize()

    expect(mockAuthorize).toHaveBeenCalled()
  })

  it('throws error if authorization fails', async () => {
    mockAuthorize.mockRejectedValueOnce(new Error('Authorization error'))

    await mkManager.initializeMusicKit()
    await expect(mkManager.authorize()).rejects.toThrow('Authorization error')
  })

  describe('MusicKitManager - setVolume', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a volume property
      mockMusicKitInstance = { volume: 0 }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('sets the volume correctly', () => {
      mkManager.setVolume(0.5)
      expect(mockMusicKitInstance.volume).toBe(0.5)

      mkManager.setVolume(0.7)
      expect(mockMusicKitInstance.volume).toBe(0.7)
    })

    it('throws error if MusicKit instance is not initialized', () => {
      mkManager.musicKitInstance = null

      expect(() => mkManager.setVolume(0.5)).toThrow('MusicKit instance not initialized')
    })

    it('throws error if volume is outside valid range', () => {
      expect(() => mkManager.setVolume(-1)).toThrow('Volume must be between 0 and 1')
      expect(() => mkManager.setVolume(2)).toThrow('Volume must be between 0 and 1')
    })

    it('throws error if MusicKit instance is not initialized', () => {
      mkManager.musicKitInstance = null

      expect(() => mkManager.setVolume(0.5)).toThrow('MusicKit instance not initialized')
    })
  })

  describe('MusicKitManager - setShuffle', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a shuffleMode property
      mockMusicKitInstance = { shuffleMode: 0 }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('sets the shuffleMode correctly', () => {
      mkManager.setShuffle(true)
      expect(mockMusicKitInstance.shuffleMode).toBe(1)

      mkManager.setShuffle(false)
      expect(mockMusicKitInstance.shuffleMode).toBe(0)
    })

    it('throws error if MusicKit instance is not initialized', () => {
      mkManager.musicKitInstance = null

      expect(() => mkManager.setShuffle(true)).toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - setRepeatMode', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a repeatMode property
      mockMusicKitInstance = { repeatMode: 'none' }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('sets the repeatMode correctly', () => {
      mkManager.setRepeatMode('all' as MusicKit.PlayerRepeatMode)
      expect(mockMusicKitInstance.repeatMode).toBe('all')

      mkManager.setRepeatMode('one' as MusicKit.PlayerRepeatMode)
      expect(mockMusicKitInstance.repeatMode).toBe('one')

      mkManager.setRepeatMode('none' as MusicKit.PlayerRepeatMode)
      expect(mockMusicKitInstance.repeatMode).toBe('none')
    })

    it('throws error if MusicKit instance is not initialized', () => {
      mkManager.musicKitInstance = null

      expect(() => mkManager.setRepeatMode('all' as MusicKit.PlayerRepeatMode)).toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - play', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a play method
      mockMusicKitInstance = { play: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls play on the MusicKit instance', async () => {
      await mkManager.play()

      expect(mockMusicKitInstance.play).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.play()).rejects.toThrow('MusicKit instance not initialized')
    })
  })

  describe('MusicKitManager - pause', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a pause method
      mockMusicKitInstance = { pause: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls pause on the MusicKit instance', async () => {
      await mkManager.pause()

      expect(mockMusicKitInstance.pause).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.pause()).rejects.toThrow('MusicKit instance not initialized')
    })
  })

  describe('MusicKitManager - stop', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a stop method
      mockMusicKitInstance = { stop: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls stop on the MusicKit instance', async () => {
      await mkManager.stop()

      expect(mockMusicKitInstance.stop).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.stop()).rejects.toThrow('MusicKit instance not initialized')
    })
  })

  describe('MusicKitManager - setQueue', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a setQueue method
      mockMusicKitInstance = { setQueue: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls setQueue on the MusicKit instance', async () => {
      await mkManager.setQueue('id', 'type')

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        type: ['id'],
        startWith: 0
      })
    })

    it('calls setQueue on the MusicKit instance without an array if type is musicVideos', async () => {
      await mkManager.setQueue('id', 'musicVideos')

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        musicVideos: 'id',
        startWith: 0
      })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.setQueue('id', 'type')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - clearQueue', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a clearQueue method
      mockMusicKitInstance = { clearQueue: jest.fn(), queue: { items: [] } }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls clearQueue on the MusicKit instance', async () => {
      await mkManager.clearQueue()

      expect(mockMusicKitInstance.clearQueue).toHaveBeenCalled()
    })

    it('clears the queue', async () => {
      await mkManager.clearQueue()

      expect(mockMusicKitInstance.queue.items).toEqual([])
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.clearQueue()).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - moveQueueItem', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a moveQueueItem method
      mockMusicKitInstance = {
        moveQueueItem: jest.fn(),
        queue: { _queueItems: [], items: [], _reindex: jest.fn() }
      }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.moveQueueItem(0, 1)).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - setStationQueue', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a setQueue method
      mockMusicKitInstance = { setStationQueue: jest.fn(), play: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls setStationQueue on the MusicKit instance', async () => {
      await mkManager.setStationQueue('id', 'artists')

      expect(mockMusicKitInstance.setStationQueue).toHaveBeenCalledWith({
        artists: ['id']
      })
    })

    it('calls play on the MusicKit instance', async () => {
      await mkManager.setStationQueue('id', 'artists')

      expect(mockMusicKitInstance.play).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.setStationQueue('id', 'artists')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - removeFromQueue', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a removeFromQueue method
      mockMusicKitInstance = {
        removeFromQueue: jest.fn(),
        queue: {
          items: [],
          _queueItems: [
            {
              item: {
                id: 'id'
              }
            }
          ],
          _reindex: jest.fn()
        }
      }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls removeFromQueue on the MusicKit instance and removes the item from the queue', async () => {
      await mkManager.removeFromQueue('id')

      expect(mockMusicKitInstance.queue._queueItems).toEqual([])
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.removeFromQueue('id')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - processItemAndPlay', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a setQueue method
      mockMusicKitInstance = { setQueue: jest.fn(), play: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls setQueue on the MusicKit instance', async () => {
      await mkManager.processItemAndPlay('id', 'songs')

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        songs: ['id'],
        startWith: 0
      })
    })

    it('correctly sets the startWith property if shuffle is true', async () => {
      await mkManager.processItemAndPlay('id', 'songs', true)

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        songs: ['id'],
        startWith: expect.any(Number)
      })
    })

    it('correctly sets the startWith property if shuffle is false', async () => {
      await mkManager.processItemAndPlay('id', 'songs', false)

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        songs: ['id'],
        startWith: 0
      })
    })

    it('correctly sets the startWith property if startWith is provided', async () => {
      await mkManager.processItemAndPlay('id', 'songs', false, 5)

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({
        songs: ['id'],
        startWith: 5
      })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.processItemAndPlay('id', 'songs', false, 5)).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - playNext', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a playNext method
      mockMusicKitInstance = { playNext: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls playNext on the MusicKit instance', async () => {
      await mkManager.playNext('id', 'songs')

      expect(mockMusicKitInstance.playNext).toHaveBeenCalledWith({
        songs: ['id']
      })
    })

    it('calls playNext on the MusicKit instance without an array if type is musicVideos', async () => {
      await mkManager.playNext('id', 'musicVideos')

      expect(mockMusicKitInstance.playNext).toHaveBeenCalledWith({
        musicVideos: 'id'
      })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.playNext('id', 'songs')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - playLater', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a playLater method
      mockMusicKitInstance = { playLater: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls playLater on the MusicKit instance', async () => {
      await mkManager.playLater('id', 'songs')

      expect(mockMusicKitInstance.playLater).toHaveBeenCalledWith({
        songs: ['id']
      })
    })

    it('calls playLater on the MusicKit instance without an array if type is musicVideos', async () => {
      await mkManager.playLater('id', 'musicVideos')

      expect(mockMusicKitInstance.playLater).toHaveBeenCalledWith({
        musicVideos: 'id'
      })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.playLater('id', 'songs')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - seekToTime', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a seekToTime method
      mockMusicKitInstance = { seekToTime: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls seekToTime on the MusicKit instance', async () => {
      await mkManager.seekToTime(5)

      expect(mockMusicKitInstance.seekToTime).toHaveBeenCalledWith(5)
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.seekToTime(5)).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })

    it('throws error if time is negative', async () => {
      mockMusicKitInstance.seekToTime.mockImplementationOnce(() => {
        throw new Error('Time must be greater than 0')
      })

      await expect(mkManager.seekToTime(-5)).rejects.toThrow(
        'Time must be greater than 0'
      )
    })
  })

  describe('MusicKitManager - skipToPreviousItem', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a skipToPreviousItem method
      mockMusicKitInstance = { skipToPreviousItem: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls skipToPreviousItem on the MusicKit instance', async () => {
      await mkManager.skipToPreviousItem()

      expect(mockMusicKitInstance.skipToPreviousItem).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.skipToPreviousItem()).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - skipToNextItem', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a skipToNextItem method
      mockMusicKitInstance = { skipToNextItem: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls skipToNextItem on the MusicKit instance', async () => {
      await mkManager.skipToNextItem()

      expect(mockMusicKitInstance.skipToNextItem).toHaveBeenCalled()
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.skipToNextItem()).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })
})
