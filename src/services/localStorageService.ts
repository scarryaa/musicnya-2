export const localStorageService = {
  get(key) {
    const value = localStorage.getItem(key)

    return value
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  }
}
