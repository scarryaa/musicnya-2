import { store } from '../stores/store'

export class Utils {
  static formatTime = (time: number) => {
    // format time to mm:ss from ms
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  static formatTimeHours = (time: number) => {
    // format time to from ms to x hours, xx minutes
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    return `${hours ? hours + ' hours, ' : ''}${minutes} minutes`
  }

  static formatDate = (date: string) => {
    // format date from yyyy-mm-dd to  mm dd, yyyy
    const [year, month, day] = date.split('-')
    return `${this.getMonth(month)} ${day}, ${year}`
  }

  static getMonth = (month: string) => {
    switch (month) {
      case '01':
        return 'Jan'
      case '02':
        return 'Feb'
      case '03':
        return 'Mar'
      case '04':
        return 'Apr'
      case '05':
        return 'May'
      case '06':
        return 'Jun'
      case '07':
        return 'Jul'
      case '08':
        return 'Aug'
      case '09':
        return 'Sep'
      case '10':
        return 'Oct'
      case '11':
        return 'Nov'
      case '12':
        return 'Dec'
      default:
        return ''
    }
  }

  static formatArtworkUrl = (
    url: string,
    size: number,
    format: 'png' | 'jpg' | 'webp' = 'webp',
    crop: 'sr' | 'cc' | 'none' = 'sr'
  ) => {
    return url
      .replace('{w}x{h}', `${size}x${size}`)
      .replace('{f}', format)
      .replace('{c}', crop === 'none' ? '' : crop)
  }

  static setDarkMode = (darkMode: boolean) => {
    document.documentElement.setAttribute('theme', darkMode ? 'dark' : 'light')
  }

  static disableContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault())
  }

  static parseSelectedDefaultPage = (selection: string) => {
    return selection.replace('Listen Now', 'listen').toLowerCase()
  }

  static stripWrittenBy = (lyrics: string) => {
    const writtenByRegex = /<songwriter>.*?<\/songwriter>/gs
    let writtenBy = lyrics.match(writtenByRegex).map(written => written.trim())

    // remove <songwriter> tags from all lyrics
    writtenBy = writtenBy?.map(written => written.replace(/<\/?songwriter>/g, ''))

    return writtenBy
  }

  static parseTTMLtoJS(ttmlString: string) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(ttmlString, 'text/xml')

    const divElements = xmlDoc.getElementsByTagName('div')
    const scriptArray = []

    Array.from(divElements).forEach(div => {
      const begin = div.getAttribute('begin')
      const end = div.getAttribute('end')

      const pElements = div.getElementsByTagName('p')
      const lines = []

      Array.from(pElements).forEach(p => {
        const lineBegin = p.getAttribute('begin')
        const lineEnd = p.getAttribute('end')
        const text = p.textContent

        lines.push({
          begin: lineBegin,
          end: lineEnd,
          text: text.trim()
        })
      })

      scriptArray.push({
        begin: begin,
        end: end,
        lines: lines
      })
    })

    return scriptArray
  }

  static getLyricsBeginning = (lyrics: string) => {
    // get content of first <div begin=""> tag
    const beginRegex = /<div begin=".*?">/gs
    const begin = lyrics.match(beginRegex)?.[0].split('"')[1]
    console.log(begin)
    return begin
  }

  static timecodeToMs = timecode => {
    if (!timecode) return 0
    const parts = timecode.toString().split(':')
    const seconds = parts.pop()
    const minutes = parts.length > 0 ? parseInt(parts.pop(), 10) : 0
    const hours = parts.length > 0 ? parseInt(parts.pop(), 10) : 0

    // Split seconds and milliseconds
    const [secs, millis] = seconds.split('.')
    const totalSeconds = parseInt(secs, 10) + minutes * 60 + hours * 3600
    const totalMillis = millis ? parseInt(millis, 10) : 0

    return totalSeconds * 1000 + totalMillis
  }
}
