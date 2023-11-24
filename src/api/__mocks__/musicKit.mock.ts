export const mockAuthorize = jest.fn()
export const mockConfigure = jest.fn().mockImplementation(() => {
  return {
    authorize: mockAuthorize
  }
})

const MusicKit = {
  configure: mockConfigure,
  authorize: mockAuthorize
}

export default MusicKit
