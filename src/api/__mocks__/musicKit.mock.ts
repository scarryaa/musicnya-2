export const mockAuthorize = jest.fn()
export const mockPlay = jest.fn()
export const mockPause = jest.fn()
export const mockStop = jest.fn()
export const mockSetQueue = jest.fn()

export const mockConfigure = jest.fn().mockImplementation(() => {
  return {
    authorize: mockAuthorize,
    play: mockPlay,
    pause: mockPause,
    stop: mockStop,
    setQueue: mockSetQueue
  }
})

const MusicKit = {
  configure: mockConfigure,
  authorize: mockAuthorize
}

export default MusicKit
