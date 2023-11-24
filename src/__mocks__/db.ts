// Mock database structure
const mockDB = {
  songs: []
}

// Mock implementation of LocalStoragePreset
const LocalStoragePreset = async () => ({
  data: mockDB,
  write: async () => {} // Mock write function does nothing
})

// Mock implementation of addSong
const addSong = async (song: {
  id: string
  title: string
  artist: string
  playCount: number
}) => {
  mockDB.songs.push(song)
}

// Mock implementation of getDB
const getDB = async () => ({
  data: mockDB
})

// Mock implementation of increasePlayCount
const increasePlayCount = async (song: {
  id: string
  title: string
  artist: string
  playCount: number
}) => {
  const index = mockDB.songs.findIndex(s => s.id === song.id)
  if (index === -1) {
    addSong(song)
    return
  }

  mockDB.songs[index].playCount++
}

// Export the mock functions
module.exports = {
  LocalStoragePreset,
  addSong,
  getDB,
  increasePlayCount
}
