import MusicKit, { mockConfigure, mockAuthorize } from '../__mocks__/musicKit.mock'
import { mkManager } from '../mkManager'

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

    it('throws error if volume is outside valid range', () => {
      expect(() => mkManager.setVolume(-1)).toThrow('Volume must be between 0 and 1')
      expect(() => mkManager.setVolume(2)).toThrow('Volume must be between 0 and 1')
    })

    it('throws error if MusicKit instance is not initialized', () => {
      mkManager.musicKitInstance = null

      expect(() => mkManager.setVolume(0.5)).toThrow('MusicKit instance not initialized')
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

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({ type: 'id' })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(mkManager.setQueue('id', 'type')).rejects.toThrow(
        'MusicKit instance not initialized'
      )
    })
  })

  describe('MusicKitManager - processItemAndPlay', () => {
    let mockMusicKitInstance

    beforeEach(() => {
      // Create a mock MusicKit instance with a setQueue method
      mockMusicKitInstance = { setQueue: jest.fn() }

      // Initialize MusicKitManager and replace the musicKitInstance with the mock
      mkManager.musicKitInstance = mockMusicKitInstance
    })

    it('calls setQueue on the MusicKit instance', async () => {
      await mkManager.processItemAndPlay({ id: 'id', type: 'songs', color: 'red' })

      expect(mockMusicKitInstance.setQueue).toHaveBeenCalledWith({ songs: 'id' })
    })

    it('throws error if MusicKit instance is not initialized', async () => {
      mkManager.musicKitInstance = null

      await expect(
        mkManager.processItemAndPlay({ id: 'id', type: 'albums', color: 'red' })
      ).rejects.toThrow('MusicKit instance not initialized')
    })
  })
})
